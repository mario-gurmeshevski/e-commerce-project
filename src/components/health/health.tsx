import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-medium-image-zoom/dist/styles.css'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Loader from '../common/Loader.tsx'
import type { Health } from '../../interfaces/health.ts'
import ErrorMessage from '../common/ErrorMessage.tsx'
import { fetchWithFallback } from '../../utils/apiClient.ts'
import { API_CONFIG } from '../../utils/apiConfig'

const Health = () => {
	const [health, setHealth] = useState<Health[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setLoading(true)
			setError(null)
			fetchWithFallback<{ health: Health[] }>(API_CONFIG.endpoints.health, 'health.json')
				.then((res) => {
				if (Array.isArray(res.data.health)) {
					setHealth(res.data.health)
				} else if (Array.isArray(res.data)) {
					setHealth(res.data)
				} else {
					setHealth([])
				}
			})
			.catch(() => setError('Не успеавме да ги вчитаме придобивките.'))
			.finally(() => setLoading(false))
	}, [])

	const getExcerpt = (item: Health) => item.header || ''

	const getDateParts = (dateString: string) => {
		const date = new Date(dateString)
		const day = date.getDate().toString().padStart(2, '0')
		const month = date
			.toLocaleString('mk-MK', { month: 'short' })
			.replace('.', '')
		const year = date.getFullYear()
		return { day, month, year }
	}

	if (loading) return <Loader />
	if (error) return <ErrorMessage message={error} />

	return (
		<main className="container mx-auto px-4 py-8 md:pb-12 md:pt-10">
			<section className="mb-12 text-center">
				<h1 className="text-3xl font-semibold sm:text-4xl underline underline-offset-[8px] sm:underline-offset-[16px] text-center mb-10">
					Придобивки за Здравјето
				</h1>
			</section>

			{health.length === 0 ? (
				<div className="text-center text-gray-500">
					Нема придобивки за здравјето.
				</div>
			) : (
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
					{health.map((item) => {
						const { day, month, year } = getDateParts(item.createdAt)
						return (
							<article
								key={item.id}
								className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
							>
								{item.mainImage && (
									<img
										src={item.mainImage}
										alt={item.title}
										className="w-full h-56 object-cover"
										loading="lazy"
									/>
								)}

								<div className="flex-1 flex flex-col px-6 py-5">
									<div className="flex items-center gap-3 mb-2">
										<span className="inline-flex items-center py-1 rounded-full text-xs font-semibold">
											{day} {month} {year}
										</span>
									</div>

									<h2 className="text-xl font-bold mb-2 line-clamp-2">{item.title}</h2>
									<p className="text-gray-600 mb-4 line-clamp-3">{getExcerpt(item)}</p>
									<div className="mt-auto flex justify-end">
										<Link
											to={`/health/${item.slug}`}
											state={{ item }}
											className="inline-flex items-center gap-1 rounded-2xl font-medium text-black bg-gray-50 px-3 py-1.5 hover:bg-gray-100 hover:gap-2 transition-all"
											onClick={() =>
												sessionStorage.setItem(
													`currentHealth:${item.slug}`,
													JSON.stringify(item)
												)
											}
										>
											Прочитај повеќе
											<ArrowRightIcon className="w-4 h-4" />
										</Link>
									</div>
								</div>
							</article>
						)
					})}
				</div>
			)}
		</main>
	)
}

export default Health
