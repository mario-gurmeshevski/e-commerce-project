import React, { useState, useEffect } from 'react'
import {
	MinusIcon,
	PlusIcon,
	TruckIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid'
import { useCart } from '../cart/useCart.tsx'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ErrorMessage from '../common/ErrorMessage.tsx'
import { fetchWithFallback } from '../../utils/apiClient.ts'
import { API_CONFIG } from '../../utils/apiConfig'

export default function Checkout() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		municipality: '',
		postalCode: '',
		phoneNumber: '',
		email: '',
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [formErrors, setFormErrors] = useState<Record<string, string>>({})
	const [isApiAccessible, setIsApiAccessible] = useState<boolean | null>(null)
	const { cartItems, addToCart, removeFromCart, decreaseQuantity, clearCart } =
		useCart()
	const navigate = useNavigate()
	const preciseRound = (num: number) => Math.round(num)
	const isMobile = window.innerWidth <= 768

	// Check API accessibility on component mount
	useEffect(() => {
		const checkApiAccess = async () => {
			// If API is disabled by configuration, set to fallback mode
			if (!API_CONFIG.useApi) {
				setIsApiAccessible(false)
				return
			}

			try {
				// Try a simple API endpoint to check if API is accessible
				await fetchWithFallback(API_CONFIG.endpoints.honey, 'honey.json')
				setIsApiAccessible(true)
			} catch (err) {
				// If API is not accessible, assume we're using fallback data
				setIsApiAccessible(false)
			}
		}

		checkApiAccess()
	}, [])

	const subtotal = cartItems.reduce((sum, item) => {
		const discountFactor = 1 - (item.discount || 0) / 100
		const discountedItem = preciseRound(item.price * discountFactor)
		return sum + discountedItem * item.quantity
	}, 0)

	const shipping = subtotal >= 2000 ? 0 : 150
	const total = subtotal + shipping

	// Validates the checkout form data
	// Checks phone number format and postal code format
	// Sets form errors state with validation messages
	const validateForm = () => {
		const errors: Record<string, string> = {}
		const phoneRegex = /^07\d{7}$/
		const postalRegex = /^\d{4,5}$/

		if (!phoneRegex.test(formData.phoneNumber)) {
			errors.phoneNumber =
				'Телефонскиот број мора да започне со 07 и да има точно 9 цифри'
		}

		if (!postalRegex.test(formData.postalCode)) {
			errors.postalCode = 'Поштенскиот број мора да содржи 4 или 5 цифри'
		}

		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	// Handles input changes in the checkout form
	// Updates form data state and clears associated validation errors
	// Applies numeric formatting for phone numbers and postal codes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		if (formErrors[name]) {
			setFormErrors((prev) => ({ ...prev, [name]: '' }))
		}

		if (name === 'postalCode' || name === 'phoneNumber') {
			const numericValue = value.replace(/[^0-9]/g, '')

			if (name === 'phoneNumber') {
				if (value.includes('+')) {
					setFormErrors((prev) => ({
						...prev,
						phoneNumber: 'Ве молиме внесете го бројот без меѓународен код (+389)',
					}))
					return
				}

				if (numericValue.length > 9) return
			}

			setFormData((prev) => ({
				...prev,
				[name]: numericValue,
			}))
			return
		}
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	// Handles form submission for placing an order
	// Validates the form, checks API availability, and submits the order data
	// Shows appropriate feedback messages using toast notifications
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!validateForm()) return

		// If using fallback data, show a message instead of submitting
		if (isApiAccessible === false) {
			toast.error(
				'Checkout функцијата е оневозможена кога се користи локален JSON податок. Ве молиме користете ја контакт формата за да ја испратите вашата нарачка.',
				{
					style: isMobile
						? {
								position: 'sticky',
								bottom: 0,
								left: 0,
								right: 0,
								margin: 'auto',
								width: 'fit-content',
						  }
						: {},
				}
			)
			return
		}

		setLoading(true)
		setError(null)

		const _toastId = toast.loading('Вашата нарачка се процесира...', {})

		try {
			const orderData = {
				...formData,
				cart: {
					items: cartItems.map((item) => ({
						id: item.id,
						name: item.name,
						quantity: item.quantity,
						image: item.image,
						price: preciseRound(item.price * (1 - (item.discount || 0) / 100)),
						discount: item.discount || 0,
					})),
					priceSummary: {
						subtotal,
						shipping,
						total,
					},
				},
			}

			// Create order - this is a POST request, so we'll use fetch directly
			const _response = await fetch(API_CONFIG.endpoints.createOrder, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			})

			if (!_response.ok) {
				throw new Error('Network response was not ok')
			}

			// Important: Checkout directly calls fetch instead of fetchWithFallback
			// This creates potential issue when API is disabled since direct fetch
			// won't be intercepted by fallback mechanism
			toast.success('Нарачката е успешно пратена!', {
				id: _toastId,
				duration: 1000,
				style: isMobile
					? {
							position: 'sticky',
							bottom: 0,
							left: 0,
							right: 0,
							margin: 'auto',
							width: 'fit-content',
					  }
					: {},
			})
			navigate('/')
			clearCart()

			await _response.json()
		} catch (err) {
			toast.error(
				'Настана грешка при праќањето на нарачката. Обидете се повторно или контактирајте нè директно.',
				{
					id: _toastId,
					style: isMobile
						? {
								position: 'sticky',
								bottom: 0,
								left: 0,
								right: 0,
								margin: 'auto',
								width: 'fit-content',
						  }
						: {},
				}
			)
		} finally {
			setLoading(false)
		}
	}

	if (error) return <ErrorMessage message={error} />

	return (
		<div className="min-h-screen py-8 px-4 sm:px-6">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div className="bg-white p-6 rounded-2xl shadow-xl">
					<h2 className="text-2xl font-bold text-black mb-6">Детали за наплата</h2>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-5">
							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-black">Лични информации</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-black mb-2">
											Име
										</label>
										<input
											type="text"
											name="firstName"
											value={formData.firstName}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-black mb-2">
											Презиме
										</label>
										<input
											type="text"
											name="lastName"
											value={formData.lastName}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-black mb-2">
										Email адреса
									</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										required
									/>
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-black">Адреса за достава</h3>
								<div>
									<label className="block text-sm font-medium text-black mb-2">
										Адреса
									</label>
									<input
										type="text"
										name="address"
										value={formData.address}
										onChange={handleChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										required
									/>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-black mb-2">
											Град
										</label>
										<input
											type="text"
											name="city"
											value={formData.city}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-black mb-2">
											Општина
										</label>
										<input
											type="text"
											name="municipality"
											value={formData.municipality}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-black mb-2">
											Поштенски број
										</label>
										<input
											type="text"
											name="postalCode"
											value={formData.postalCode}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											required
										/>
										{formErrors.postalCode && (
											<p className="text-red-500 text-sm mt-1">{formErrors.postalCode}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-black mb-2">
											Телефон
										</label>
										<input
											type="tel"
											name="phoneNumber"
											value={formData.phoneNumber}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											maxLength={9}
											required
										/>
										{formErrors.phoneNumber && (
											<p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-4 pt-6 border-t border-gray-200">
							<h3 className="text-lg font-semibold text-black">Начин на наплата</h3>
							<div className="space-y-3">
								<div className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all">
									<TruckIcon className="h-6 w-6 text-blue-600 mr-3" />
									<div>
										<p className="font-medium">Плати при подигнување</p>
										<p className="text-sm text-gray-500">Достава до вашата адреса</p>
									</div>
								</div>
							</div>
						</div>

						{isApiAccessible === false && (
							<div className="bg-gray-200 border border-gray-300 rounded-lg p-4 mb-4">
								<p className="text-red-600 text-center font-medium">
									Checkout функцијата е оневозможена кога се користи локален JSON
									податок. Ве молиме користете ја контакт формата за да ја испратите
									вашата нарачка.
								</p>
							</div>
						)}

						<button
							type="submit"
							disabled={loading || isApiAccessible === false}
							className={`w-full py-4 px-6 rounded-lg font-medium transition-colors ${
								loading || isApiAccessible === false
									? 'bg-blue-400 text-white cursor-not-allowed'
									: 'bg-blue-600 text-white hover:bg-blue-700'
							}`}
						>
							{loading ? (
								<div className="flex items-center justify-center">Процесира...</div>
							) : isApiAccessible === false ? (
								'Checkout оневозможен'
							) : (
								'Потврди нарачка'
							)}
						</button>
					</form>
				</div>

				<div className={`bg-white p-6 rounded-2xl shadow-xl h-fit`}>
					<h2 className="text-2xl font-bold text-black mb-6">Вашата нарачка</h2>
					<div className="space-y-6">
						{cartItems.map((item) => (
							<div
								key={item.id}
								className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4"
							>
								<div className="flex items-center space-x-4">
									<div className="w-16 h-16 rounded-lg overflow-hidden">
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-full object-cover"
											onError={(e) => {
												;(e.target as HTMLImageElement).src = '/fallback-image.jpg'
											}}
										/>
									</div>
									<div>
										<h3 className="font-medium text-black truncate">{item.name}</h3>
										<p className="text-sm text-gray-500">
											{item.quantity} ×{' '}
											{preciseRound(item.price * (1 - (item.discount || 0) / 100))} ден.
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-3 flex-shrink-0">
									<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
										<button
											className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
											onClick={() => decreaseQuantity(item.id)}
											aria-label="Decrease quantity"
										>
											<MinusIcon className="w-4 h-4" />
										</button>
										<span className="w-8 text-center font-medium">{item.quantity}</span>
										<button
											className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
											onClick={() => addToCart(item, 1)}
											aria-label="Increase quantity"
										>
											<PlusIcon className="w-4 h-4" />
										</button>
									</div>
									<button
										className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
										onClick={() => removeFromCart(item.id)}
										aria-label="Remove item"
									>
										<XMarkIcon className="h-5 w-5" />
									</button>
									<span className="font-medium ml-2 min-w-[80px] flex-shrink-0 text-right">
										{preciseRound(
											item.price * (1 - (item.discount || 0) / 100) * item.quantity
										)}{' '}
										ден.
									</span>
								</div>
							</div>
						))}

						<div className="space-y-4 pt-6 border-t border-gray-200">
							<div className="flex justify-between">
								<span className="text-black">Цена</span>
								<span className="font-medium">{subtotal} ден.</span>
							</div>
							<div className="flex justify-between">
								<span className="text-black">Достава</span>
								<span className="font-medium">{shipping} ден.</span>
							</div>
							<div className="flex justify-between pt-4 border-t border-gray-200">
								<span className="text-lg font-bold text-black">Вкупно</span>
								<span className="text-lg font-bold text-black">{total} ден.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
