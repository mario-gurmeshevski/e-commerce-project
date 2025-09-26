import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IOrder } from '../../interfaces/order'
import toast from 'react-hot-toast'
import ErrorMessage from '../common/ErrorMessage'
import Loader from '../common/Loader'
import { fetchWithFallback } from '../../utils/apiClient.ts'
import { API_CONFIG } from '../../utils/apiConfig'

export default function Order() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [order, setOrder] = useState<IOrder | null>(null)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const isMobile = window.innerWidth <= 768

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const response = await fetchWithFallback<IOrder>(
					`${API_CONFIG.endpoints.order}/${id}`,
					'order.json'
				)
				// Handle both direct object and response wrapper
				if (response.data) {
					setOrder(response.data)
				} else {
					setError('Нарачката не е пронајдена или не постои')
				}
			} catch (_err) {
				setError('Нарачката не е пронајдена или не постои')
			} finally {
				setIsLoading(false)
			}
		}

		void fetchOrder()
	}, [id])

	const handleCancel = async () => {
		if (!order) return

		// Create cancel function that handles both API and fallback scenarios
		const cancelOrder = async () => {
			try {
				const response = await fetch(`${API_CONFIG.endpoints.order}/${order.id}`, {
					method: 'DELETE',
				})

				if (!response.ok) {
					throw new Error('Failed to cancel order')
				}

				return response
			} catch (error) {
				// If API call fails, we could implement local storage fallback here
				// For now, we'll just throw an error to trigger the error state
				throw error
			}
		}

		const promise = cancelOrder()
		toast.promise(
			promise,
			{
				loading: 'Се откажува нарачката...',
				success: 'Се откажа нарачката!',
				error: 'Не успеа да се откажи нарачката.',
			},
			{
				position: 'top-center',
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
		try {
			await promise
			setTimeout(() => {
				navigate('/')
			}, 100)
		} catch (error) {}
	}

	useEffect(() => {
		if (order && order.orderId) {
			document.title = `Order #${order.orderId} - E Commerce`
		} else if (error || (order && !order.orderId)) {
			document.title = 'Order not Found - E Commerce'
		}
	}, [order, error])

	if (isLoading)
		return (
			<div className="text-center p-6 min-h-[200px] flex items-center justify-center">
				<Loader />
			</div>
		)
	if (error) return <ErrorMessage message={error} />

	if (!order || !order.cart || !order.cart.items) {
		return <ErrorMessage message="Нарачката не е пронајдена или не постои" />
	}

	return (
		<div className="max-w-2xl mx-auto p-2 sm:p-4 md:p-6">
			<div className="border rounded-lg p-3 sm:p-6 shadow-md bg-white">
				<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
					<div className="text-center sm:text-left">
						<h1 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
							Нарачка #{order.orderId}
						</h1>
						<p
							className={`text-sm ${
								order.status ? 'text-green-600' : 'text-yellow-500'
							} font-semibold`}
						>
							Статус: {order.status ? 'Доставено' : 'Во процес'}
						</p>
					</div>
					{!order.status && (
						<button
							onClick={handleCancel}
							className="px-4 py-2 bg-red-500 text-white text-base rounded-lg hover:bg-red-600 transition-all shadow-md w-full sm:w-auto"
						>
							Откажете ја нарачката
						</button>
					)}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6">
					<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<h2 className="font-semibold text-base mb-2">Доставни Информации</h2>
						<div className="space-y-1 text-sm">
							<p>
								<strong>Име:</strong> {order.firstName} {order.lastName}
							</p>
							<p>
								<strong>Адреса:</strong> {order.address}
							</p>
							<p>
								<strong>Град:</strong> {order.city}, {order.municipality}
							</p>
							<p>
								<strong>Поштенски Број:</strong> {order.postalCode}
							</p>
						</div>
					</div>
					<div className="bg-gray-50 p-4 rounded-lg shadow-sm">
						<h2 className="font-semibold text-base mb-2">Контактни Информации</h2>
						<div className="space-y-1 text-sm">
							<p>
								<strong>Телефонски Број:</strong> {order.phoneNumber}
							</p>
							<p>
								<strong>Email:</strong> {order.email}
							</p>
						</div>
					</div>
				</div>

				<div>
					<h2 className="font-semibold text-base mb-4">Производи</h2>
					<div className="space-y-4">
						{order?.cart?.items?.map((item) => (
							<div
								key={item.id}
								className="flex flex-col sm:flex-row sm:justify-between sm:items-center last:border-b-0 border-b pb-2 gap-2"
							>
								<div>
									<p className="font-medium text-base">{item.name}</p>
									<p className="text-xs text-gray-500">Количина: {item.quantity}</p>
								</div>
								<p className="text-base font-semibold">
									{(item.price * item.quantity).toFixed(0)} ден.
								</p>
							</div>
						))}
					</div>

					<div className="mt-6 pt-4 border-t text-base space-y-2">
						<div className="flex justify-between">
							<span>Цена:</span>
							<span>{order.cart.priceSummary.subtotal.toFixed(0)} ден.</span>
						</div>
						<div className="flex justify-between">
							<span>Достава:</span>
							<span>{order.cart.priceSummary.shipping.toFixed(0)} ден.</span>
						</div>
						<div className="flex justify-between font-bold text-lg">
							<span>Вкупно:</span>
							<span>{order.cart.priceSummary.total.toFixed(2)} ден.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
