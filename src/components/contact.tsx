import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Image1 from '../images/contact/1-IMG_1365-copy.jpg'

const Contact = () => {
	const initialFormState = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		message: '',
	}

	const [form, setForm] = useState(initialFormState)

	const [formErrors, setFormErrors] = useState<Record<string, string>>({})

	const isMobile = window.innerWidth <= 768

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!validateForm()) return

		const promise = axios.post('/api/mail', form, {
			headers: { 'Content-Type': 'application/json' },
		})

		toast.promise(
			promise,
			{
				loading: 'Се испраќа пораката...',
				success: 'Се испрати поракта!',
				error: 'Не успеа да се испрати е пораката.',
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
		} catch (error) {}
	}

	return (
		<div className="pt-10 pb-10 px-4 sm:px-6 lg:px-8">
			{/* Heading */}
			<div className="text-center mb-10">
				<h1 className="text-3xl font-semibold sm:text-4xl underline underline-offset-[12px] sm:underline-offset-[16px] text-center mb-10">
					Контакт
				</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10 min-h-[500px] items-stretch">
				{/* Form */}
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
							<button
								type="submit"
								className="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
							>
								Испрати
							</button>
						</div>
					</form>
				</div>
				{/* Image */}
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
				{/* Адреса */}
				<div className="order-3 lg:order-3 space-y-3 text-center px-4 py-6 min-w-[250px] w-full max-w-md mx-auto">
					<hr className="w-12 border-t-2 border-black mx-auto " />
					<p className="text-3xl md:text-4xl font-bold">Адреса</p>
					<a
						href="mailto:info@makmela.com"
						className="text-xl block hover:underline"
					>
						info@makmela.com
					</a>
					<a href="tel:+38970400344" className="text-xl block hover:underline">
						T: +389 70 400 344
					</a>
				</div>
				{/* Фарма */}
				<div className="order-4 lg:order-4 space-y-3 text-center px-4 py-6 min-w-[250px] w-full max-w-md mx-auto">
					<hr className="w-12 border-t-2 border-black mx-auto " />
					<p className="text-3xl md:text-4xl font-bold">Фарма</p>
					<p className="text-xl">R1107, Старо Лагово, Прилеп,</p>
					<p className="text-xl">Северна Македонија, 7500</p>
				</div>
			</div>

			{/* Map */}
			<div className="mt-10">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d638.0665860848835!2d21.54006063538792!3d41.29453589138185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smk!4v1746008810763!5m2!1sen!2smk"
					width="100%"
					height="350"
					className="h-[350px] sm:h-[400px] lg:h-[450px]"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					title="Makmela Location Map"
				></iframe>
			</div>
		</div>
	)
}

export default Contact
