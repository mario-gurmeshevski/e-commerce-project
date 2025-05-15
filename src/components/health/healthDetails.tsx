import { Fragment, useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import type {
	ContentItem,
	Health,
	HealthSection,
} from '../../interfaces/health.ts'
import Loader from '../common/Loader.tsx'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {
	XMarkIcon,
	ArrowLeftIcon,
	CalendarIcon,
} from '@heroicons/react/24/outline'

function getInstagramDisplay(url: string): string | null {
	const profileMatch = url.match(
		/^https:\/\/www\.instagram\.com\/([^\/\s]+)\/?$/
	)
	if (profileMatch) {
		return '@' + profileMatch[1]
	}
	const hashtagMatch = url.match(
		/^https:\/\/www\.instagram\.com\/explore\/tags\/([^\/\s]+)\/?$/
	)
	if (hashtagMatch) {
		return '#' + hashtagMatch[1]
	}
	return null
}

const HealthDetails = () => {
	const { slug } = useParams<{ slug?: string }>()
	const location = useLocation()
	const storageKey = `currentHealth:${slug}`
	const [healthItem, setHealthItem] = useState<Health | null>(null)
	const [loading, setLoading] = useState(!healthItem)
	const urlRegex = /(https?:\/\/[^\s]+)/g

	useEffect(() => {
		if (!slug) {
			setLoading(false)
			setHealthItem(null)
			return
		}

		setLoading(true)
		setHealthItem(null)

		const stateItem = location.state?.item
		if (stateItem && stateItem.slug === slug) {
			setHealthItem(stateItem)
			setLoading(false)
			document.title = `${stateItem.title} - Makmela`
			sessionStorage.setItem(storageKey, JSON.stringify(stateItem))
			return
		}

		const stored = sessionStorage.getItem(storageKey)
		if (stored) {
			const parsed = JSON.parse(stored)
			if (parsed && parsed.slug === slug) {
				setHealthItem(parsed)
				setLoading(false)
				document.title = `${parsed.title} - Makmela`
				return
			}
		}

		axios
			.get<Health>(`/api/health/slug/${slug}`)
			.then((res) => {
				setHealthItem(res.data)
				sessionStorage.setItem(storageKey, JSON.stringify(res.data))
				document.title = `${res.data.title} - Makmela`
			})
			.catch()
			.finally(() => setLoading(false))
	}, [slug, location.state])

	if (loading) return <Loader />

	if (!healthItem) return

	if (slug !== healthItem.slug) {
		return (
			<div className="min-h-[calc(100vh-25vh)] flex flex-col items-center justify-center text-center px-4 py-8">
				<div className="p-6 sm:p-8 max-w-md w-full">
					<p className="text-black text-lg sm:text-xl font-semibold mb-6">
						Невалиден URL за придобивка.
					</p>
					<Link
						to="/health"
						className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
					>
						<ArrowLeftIcon className="h-4 w-4 mr-2" />
						Назад кон сите придобивки
					</Link>
				</div>
			</div>
		)
	}

	const renderImages = (item: ContentItem) => {
		if (!item || item.type !== 'image') return null

		const images = Array.isArray(item.content) ? item.content : [item.content]
		if (images.length === 0) return null

		return (
			<>
				{item.itemHeader && (
					<h4 className="text-lg font-semibold mb-2 center">{item.itemHeader}</h4>
				)}
				{images.length > 1 ? (
					<div className="flex flex-wrap gap-4 justify-between w-full">
						{images.map((img, i) => (
							<div
								key={i}
								className="w-full md:w-[44%] flex-shrink-0 transition-all rounded-md duration-300 hover:scale-[1.02] hover:shadow-md"
							>
								<Zoom zoomMargin={40} IconUnzoom={XMarkIcon}>
									<img
										src={img}
										alt={`Health image ${i + 1}`}
										className="object-cover rounded-md w-full max-h-[350px] md:min-h-[500px]"
										loading="lazy"
									/>
								</Zoom>
							</div>
						))}
					</div>
				) : (
					<div className="flex flex-wrap gap-4 min-w-[44%]">
						{images.map((img, i) => (
							<div
								key={i}
								className="w-full flex-shrink-0 transition-all rounded-md duration-300 hover:scale-[1.02] hover:shadow-md"
							>
								<Zoom zoomMargin={40} IconUnzoom={XMarkIcon}>
									<img
										src={img}
										alt={`Health image ${i + 1}`}
										className="object-cover rounded-md w-full max-h-[350px] md:min-h-[500px]"
										loading="lazy"
									/>
								</Zoom>
							</div>
						))}
					</div>
				)}
			</>
		)
	}

	const renderParagraphs = (item: ContentItem) => {
		if (!item || item.type !== 'paragraph') return null

		const paragraphs = Array.isArray(item.content) ? item.content : [item.content]
		if (paragraphs.length === 0) return null

		return (
			<div className="space-y-5">
				{item.itemHeader && (
					<h4 className="text-lg font-semibold mb-2">{item.itemHeader}</h4>
				)}
				{paragraphs.map((p, i) => {
					const parts = p.split(urlRegex)
					return (
						<p key={i} className="text-lg text-gray-700 leading-relaxed">
							{parts.map((part, j) => {
								if (urlRegex.test(part)) {
									const match = part.match(/^(.*?)([.,!?;:]?)$/)
									const url = match ? match[1] : part
									const punctuation = match ? match[2] : ''

									let displayText = getInstagramDisplay(url)

									if (!displayText) {
										try {
											const urlObj = new URL(url)
											const filename = urlObj.pathname.split('/').pop() || ''
											if (filename) {
												displayText = decodeURIComponent(filename)
													.replace(/\-/g, ' ')
													.replace(/\.pdf$|\.docx$|\.xlsx$/i, '')
													.split(' ')
													.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
													.join(' ')
											}
										} catch (e) {}
									}

									if (!displayText) displayText = url

									return (
										<Fragment key={j}>
											<a
												href={url}
												className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center font-medium transition-colors duration-200"
												target="_blank"
												rel="noopener noreferrer"
											>
												<span className="mr-1">{displayText}</span>
											</a>
											{punctuation}
										</Fragment>
									)
								}
								return <Fragment key={j}>{part}</Fragment>
							})}
						</p>
					)
				})}
			</div>
		)
	}

	const renderSection = (section: HealthSection, index: number) => {
		const sectionClass =
			'bg-white rounded-lg p-6 md:p-8 mb-8 transition-all duration-300 relative overflow-hidden backdrop-blur-sm'

		const headerElement = section.contentHeader && (
			<h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-1/4 after:h-[3px] after:bg-black after:rounded-full">
				{section.contentHeader}
			</h3>
		)

		const itemPairs = []
		for (let i = 0; i < section.items.length; i++) {
			const item = section.items[i]

			if (
				item.type === 'paragraph' &&
				item.itemHeader &&
				i + 1 < section.items.length &&
				section.items[i + 1].type === 'paragraph' &&
				section.items[i + 1].itemHeader
			) {
				itemPairs.push({
					type: 'paragraph-paragraph',
					left: item,
					right: section.items[i + 1],
				})
				i++
			} else if (
				item.type === 'paragraph' &&
				i + 1 < section.items.length &&
				section.items[i + 1].type === 'image'
			) {
				itemPairs.push({
					type: 'paragraph-image',
					paragraph: item,
					image: section.items[i + 1],
				})
				i++
			} else if (
				item.type === 'image' &&
				i + 1 < section.items.length &&
				section.items[i + 1].type === 'paragraph'
			) {
				itemPairs.push({
					type: 'image-paragraph',
					image: item,
					paragraph: section.items[i + 1],
				})
				i++
			} else {
				itemPairs.push({
					type: 'single',
					item: item,
				})
			}
		}

		return (
			<div key={index} className={sectionClass}>
				{headerElement}
				<>
					{itemPairs.map((pair, pairIndex) => {
						if (pair.type === 'paragraph-paragraph') {
							return (
								<div key={pairIndex} className="mb-8">
									<div className="flex flex-row gap-6">
										<div className="w-1/2">
											{renderParagraphs(pair.left ?? { type: 'paragraph', content: '' })}
										</div>
										<div className="w-1/2">
											{renderParagraphs(pair.right ?? { type: 'paragraph', content: '' })}
										</div>
									</div>
								</div>
							)
						} else if (pair.type === 'paragraph-image') {
							return (
								<div
									key={pairIndex}
									className="flex flex-col md:flex-row gap-6 justify-between"
								>
									<div className="w-full md:w-[40%]">
										{pair.paragraph && renderParagraphs(pair.paragraph)}
									</div>
									{pair.image && renderImages(pair.image)}
								</div>
							)
						} else if (pair.type === 'image-paragraph') {
							return (
								<div
									key={pairIndex}
									className="flex flex-col md:flex-row gap-6 justify-between"
								>
									{pair.image && renderImages(pair.image)}
									<div className="w-full md:w-[40%]">
										{renderParagraphs(
											pair.paragraph ?? { type: 'paragraph', content: '' }
										)}
									</div>
								</div>
							)
						} else {
							return (
								<div key={pairIndex} className="w-full">
									{pair.item?.type === 'image' && (
										<div className="flex flex-row gap-6 flex-wrap w-full justify-center">
											{renderImages(pair.item)}
										</div>
									)}
									{pair.item?.type === 'paragraph' && renderParagraphs(pair.item)}
								</div>
							)
						}
					})}
				</>
			</div>
		)
	}

	return (
		<div className="max-w-4xl md:max-w-7xl mx-auto py-10 px-4 min-h-screen">
			<Link
				to="/health"
				className="inline-flex items-center mb-8 text-gray-700 font-medium hover:text-blue-700 transition-colors duration-150 focus:outline-none rounded-lg px-4 py-2 border border-gray-300 hover:border-blue-300 bg-white group"
			>
				<ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
				<span>Назад кон сите придобивки</span>
			</Link>

			<div className="rounded-xl p-6 md:p-8 mb-8">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
					{healthItem.title}
				</h1>

				<div className="flex items-center text-sm text-gray-500 mb-6">
					<CalendarIcon className="h-4 w-4 mr-2" />
					{new Date(healthItem.createdAt).toLocaleDateString('mk-MK', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</div>

				{healthItem.header && (
					<h2 className="text-xl md:text-2xl mb-4 text-gray-800 font-medium leading-relaxed">
						{healthItem.header}
					</h2>
				)}
			</div>

			<div className="space-y-8">
				{healthItem.content.map((section, index) => renderSection(section, index))}
			</div>
		</div>
	)
}

export default HealthDetails
