/**
 * Contact Component
 *
 * This component provides a contact form for users to get in touch with the E Commerce team.
 * It includes form validation, API availability checking, and integrates with toast notifications
 * for user feedback. The form handles various contact inquiries with validation for
 * required fields and proper formatting.
 *
 * Features:
 * - Contact form with validation
 * - API accessibility detection
 * - Toast notifications for user feedback
 * - Responsive design
 * - Image display for visual appeal
 */

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Image1 from '../../images/contact/1-IMG_1365-copy.jpg'
import { fetchWithFallback } from '../../utils/apiClient.ts'
import { API_CONFIG } from '../../utils/apiConfig'

/**
 * Contact component that renders a contact form and handles submission
 */
const Contact = () => {
	const initialFormState = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		message: '',
	}

	const [form, setForm] = useState(initialFormState)

	/**
	 * Form validation errors state
	 */
	const [formErrors, setFormErrors] = useState<Record<string, string>>({})

	/**
	 * API accessibility state to determine if backend is available
	 * null = checking status, true = API accessible, false = using fallback
	 */
	const [isApiAccessible, setIsApiAccessible] = useState<boolean | null>(null)

	const isMobile = window.innerWidth <= 768

	/**
	 * Check API accessibility on component mount
	 * Determines if backend is available and updates the isApiAccessible state accordingly
	 * Uses the API_CONFIG to respect the user's API preference setting
	 */
	useEffect(() => {
		const checkApiAccess = async () => {
			// If API is disabled by configuration, set to fallback mode
			if (!API_CONFIG.useApi) {
				setIsApiAccessible(false)
				return
			}

			try {
				// Try a simple API endpoint to check if API is accessible
				const response = await fetchWithFallback(
					API_CONFIG.endpoints.honey,
					'honey.json'
				)
				setIsApiAccessible(true)
			} catch (err) {
				// If API is not accessible, assume we're using fallback data
				setIsApiAccessible(false)
			}
		}

		checkApiAccess()
	}, [])

	const validateForm = () => {
		const errors: Record<string, string> = {}
		const phoneRegex = /^07\d{7}$/
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!form.firstName.trim()) {
			errors.firstName = 'Името е задолжително'
		}
		if (!form.lastName.trim()) {
			errors.lastName = 'Презимето е задолжително'
		}
		if (!form.email.trim()) {
			errors.email = 'Е-поштата е задолжителна'
		} else if (!emailRegex.test(form.email)) {
			errors.email = 'Внесете валидна е-пошта'
		}
		if (!phoneRegex.test(form.phoneNumber)) {
			errors.phoneNumber =
				'Телефонскиот број мора да започне со 07 и да има точно 9 цифри'
		}
		if (!form.message.trim()) {
			errors.message = 'Пораката е задолжителна'
		}

		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setForm((prev) => ({
			...prev,
			[name]: value,
		}))

		if (formErrors[name]) {
			let error = ''
			if (name === 'phoneNumber') {
				if (!/^\d*$/.test(value)) {
					error = 'Внесете само броеви'
				} else if (value && !/^07\d{0,7}$/.test(value)) {
					error = 'Телефонскиот број мора да започне со 07'
				} else if (value.length === 9 && !/^07\d{7}$/.test(value)) {
					error = 'Телефонскиот број мора да започне со 07 и да има точно 9 цифри'
				} else if (value.length > 9) {
					error = 'Телефонскиот број мора да има точно 9 цифри'
				}
			}
			if (name === 'email') {
				if (!value) {
					error = 'Е-поштата е задолжителна'
				} else if (!value.includes('@')) {
					error = 'Е-поштата мора да содржи @'
				} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
					error = 'Внесете валидна е-пошта'
				}
			}
			setFormErrors((prev) => ({
				...prev,
				[name]: error,
			}))
		}
	}

	const handleBlur = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		let error = ''
		if (name === 'phoneNumber') {
			if (!/^\d*$/.test(value)) {
				error = 'Внесете само броеви'
			} else if (value && !/^07\d{0,7}$/.test(value)) {
				error = 'Телефонскиот број мора да започне со 07'
			} else if (value.length === 9 && !/^07\d{7}$/.test(value)) {
				error = 'Телефонскиот број мора да започне со 07 и да има точно 9 цифри'
			} else if (value.length > 9) {
				error = 'Телефонскиот број мора да има точно 9 цифри'
			}
		}
		if (name === 'email') {
			if (!value) {
				error = 'Е-поштата е задолжителна'
			} else if (!value.includes('@')) {
				error = 'Е-поштата мора да содржи @'
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
				error = 'Внесете валидна е-пошта'
			}
		}
		setForm((prev) => ({
			...prev,
			[name]: value,
		}))
		setFormErrors((prev) => ({
			...prev,
			[name]: error,
		}))
	}

	/**
	 * Handles form submission for the contact form
	 * Validates the form data and either submits to API or shows appropriate error message
	 *
	 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!validateForm()) return

		// If using fallback data, show a message instead of submitting
		if (isApiAccessible === false) {
			toast.error(
				'Email функцијата е оневозможена кога се користи локален JSON податок. Ве молиме користете ги контакт информации подолу.',
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
			return
		}

		// For contact form, we'll try to send to the API, but if it fails,
		// we'll show a message asking the user to contact via email/phone
		const sendForm = async () => {
			try {
				// Try to send via API
				const response = await fetch(API_CONFIG.endpoints.mail, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(form),
				})

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				return response
			} catch (error) {
				// If API fails, provide alternative contact option
				throw new Error(
					'Contact server unavailable. Please contact us directly at gurmesevskimario@gmail.com.'
				)
			}
		}

		const promise = sendForm()

		toast.promise(
			promise,
			{
				loading: 'Се испраќа пораката...',
				success: 'Се испрати поракта!',
				error:
					'Contact server unavailable. Please contact us directly at gurmesevskimario@gmail.com.',
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
			setForm(initialFormState)
			setFormErrors({})
		} catch (error) {
			console.error('Form submission error:', error)
		}
	}

	return (
		<div className="pt-10 pb-10 px-4 sm:px-6 lg:px-8 animate-fade-in">
			<div className="text-center mb-10">
				<h1 className="text-3xl font-semibold sm:text-4xl underline underline-offset-[12px] sm:underline-offset-[16px] text-center mb-10">
					Контакт
				</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10 min-h-[500px] items-stretch">
				<div className="order-1 lg:order-1 flex flex-col items-center justify-center h-full">
					<form
						onSubmit={handleSubmit}
						className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col justify-center h-full"
					>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="firstName" className="block text-lg font-semibold">
									Име
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									required
									value={form.firstName}
									onChange={handleChange}
									onBlur={handleBlur}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
								/>
								{formErrors.firstName && (
									<p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
								)}
							</div>
							<div>
								<label htmlFor="lastName" className="block text-lg font-semibold">
									Презиме
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									required
									value={form.lastName}
									onChange={handleChange}
									onBlur={handleBlur}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
								/>
								{formErrors.lastName && (
									<p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
								)}
							</div>
						</div>
						<div>
							<label htmlFor="email" className="block text-lg font-semibold">
								Е-пошта
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								value={form.email}
								onChange={handleChange}
								onBlur={handleBlur}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
							/>
							{formErrors.email && (
								<span className="text-red-500 text-sm mt-0.5">{formErrors.email}</span>
							)}
						</div>
						<div>
							<label htmlFor="phoneNumber" className="block text-lg font-semibold">
								Телефон
							</label>
							<input
								type="tel"
								id="phoneNumber"
								name="phoneNumber"
								required
								value={form.phoneNumber}
								maxLength={9}
								onChange={handleChange}
								onBlur={handleBlur}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
							/>
							{formErrors.phoneNumber && (
								<p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>
							)}
						</div>
						<div>
							<label htmlFor="message" className="block text-lg font-semibold">
								Порака
							</label>
							<textarea
								id="message"
								name="message"
								rows={4}
								required
								value={form.message}
								onChange={handleChange}
								onBlur={handleBlur}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-lg py-2"
							></textarea>
							{formErrors.message && (
								<p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
							)}
						</div>
						<div>
							{isApiAccessible === false && (
								<div className="bg-gray-200 border border-gray-300 rounded-lg p-4 mb-4">
									<p className="text-red-600 text-center font-medium">
										Email функцијата е оневозможена кога се користи локален JSON податок.
										Ве молиме користете ги контакт информации подолу.
									</p>
								</div>
							)}
							<button
								type="submit"
								disabled={isApiAccessible === false}
								className={`inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-bold rounded-md text-white ${
									isApiAccessible === false
										? 'bg-gray-400 cursor-not-allowed'
										: 'bg-black hover:bg-gray-900'
								} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
							>
								{isApiAccessible === false ? 'Email оневозможен' : 'Испрати'}
							</button>
						</div>
					</form>
				</div>
				<div className="order-2 lg:order-2 flex flex-col items-center h-full">
					<div className="max-w-md w-full relative overflow-hidden rounded-lg group flex-1 flex h-full">
						<img
							src={Image1}
							alt="Contact"
							className="w-full h-full object-cover transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl"
						/>
						<div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
					</div>
				</div>
				<div className="order-3 lg:order-3 space-y-3 text-center px-4 py-6 min-w-[250px] w-full max-w-md mx-auto">
					<hr className="w-12 border-t-2 border-black mx-auto " />
					<p className="text-3xl md:text-4xl font-bold">Адреса</p>
					<a
						href="mailto:gurmesevskimario@gmail.com"
						className="text-xl block hover:underline"
					>
						gurmesevskimario@gmail.com
					</a>
					<a href="tel:+38979999999" className="text-xl block hover:underline">
						T: +389 79 999 999
					</a>
				</div>
				<div className="order-4 lg:order-4 space-y-3 text-center px-4 py-6 min-w-[250px] w-full max-w-md mx-auto">
					<hr className="w-12 border-t-2 border-black mx-auto " />
					<p className="text-3xl md:text-4xl font-bold">Фарма</p>
					<p className="text-xl">Skopje,</p>
					<p className="text-xl">Северна Македонија</p>
				</div>
			</div>

			<div className="mt-10">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94881.62104111325!2d21.34248997551354!3d41.99918836153279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135415a58c9aa2a5%3A0xb2ed88c260872020!2sSkopje!5e0!3m2!1sen!2smk!4v1758730270468!5m2!1sen!2smk"
					width="100%"
					height="350"
					className="h-[350px] sm:h-[400px] lg:h-[450px]"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					title="E Commerce Location Map"
				></iframe>
			</div>
		</div>
	)
}

export default Contact
