import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Blog } from '../../interfaces/blog.ts'
import Loader from '../common/Loader.tsx'
import ErrorMessage from '../common/ErrorMessage.tsx'
import { fetchWithFallback } from '../../utils/apiClient.ts'
import { API_CONFIG } from '../../utils/apiConfig'

const Blog = () => {
	const [blog, setBlog] = useState<Blog[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setLoading(true)
			setError(null)
			fetchWithFallback<{ blog: Blog[] }>(API_CONFIG.endpoints.blog, 'blog.json')
				.then((res) => {
				if (Array.isArray(res.data.blog)) {
					setBlog(res.data.blog)
				} else if (Array.isArray(res.data)) {
					setBlog(res.data)
				} else {
					setBlog([])
				}
			})
			.catch(() => setError('Не успеавме да ги вчитаме блоговите.'))
			.finally(() => setLoading(false))
	}, [])

	const getExcerpt = (item: Blog) => item.header || ''

	const getDateParts = (dateString: string) => {
		const date = new Date(dateString)
		const day = date.getDate().toString().padStart(2, '0')
		const month = date
			.toLocaleString('mk-MK', { month: 'short' })
			.replace('.', '')
		const year = date.getFullYear().toString().slice(-2)
		return { day, month, year }
	}

	if (loading) return <Loader />
	if (error) return <ErrorMessage message={error} />

	return (
		<main className="container mx-auto px-4 py-8 md:pb-12 md:pt-10">
			<h1 className="text-3xl font-semibold sm:text-4xl underline underline-offset-[12px] sm:underline-offset-[16px] text-center mb-12">
				Новости
			</h1>
			{blog.length === 0 ? (
				<div className="text-center text-gray-500">Нема новости.</div>
			) : (
				<div className="space-y-10 animate-fade-in">
					{blog.map((item) => {
						const { day, month, year } = getDateParts(item.createdAt)
						return (
							<article
								key={item.id}
								className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
							>
								<div className="relative md:w-1/2 w-full min-h-[220px] md:min-h-[260px] flex-shrink-0">
									{item.mainImage && (
										<img
											src={item.mainImage}
											alt={item.title}
											className="w-full h-full object-cover max-h-96"
											loading="lazy"
										/>
									)}
									<div className="absolute bottom-4 left-4 bg-black text-white rounded-md px-5 py-3 flex flex-col items-center shadow-lg">
										<span className="text-2xl font-bold leading-none">{day}</span>
										<span className="text-xs uppercase tracking-wider">
											{month}-{year}
										</span>
									</div>
								</div>
								<div className="flex-1 flex flex-col justify-center px-6 py-6">
									<h2 className="text-lg sm:text-2xl font-medium mb-2">{item.title}</h2>
									<p className="text-gray-600 mb-4 line-clamp-2">{getExcerpt(item)}</p>
									<hr className="mb-6" />
									<Link
										to={`/blog/${item.slug}`}
										state={{ item }}
										className="inline-block border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition font-medium tracking-wide"
										onClick={() =>
											sessionStorage.setItem(
												`currentBlog:${item.slug}`,
												JSON.stringify(item)
											)
										}
									>
										ПРОЧИТАЈ ПОВЕЌЕ
									</Link>
								</div>
							</article>
						)
					})}
				</div>
			)}
		</main>
	)
}

export default Blog
