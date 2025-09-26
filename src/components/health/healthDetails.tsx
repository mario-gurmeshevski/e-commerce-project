import { Fragment, useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
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
import PDFViewer from '../../common/pdfViewer.tsx'
import { fetchWithFallback } from '../../utils/apiClient.ts'
import { API_CONFIG } from '../../utils/apiConfig'

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
			document.title = `${stateItem.title} - E Commerce`
			sessionStorage.setItem(storageKey, JSON.stringify(stateItem))
			return
		}

		const stored = sessionStorage.getItem(storageKey)
		if (stored) {
			const parsed = JSON.parse(stored)
			if (parsed && parsed.slug === slug) {
				setHealthItem(parsed)
				setLoading(false)
				document.title = `${parsed.title} - E Commerce`
				return
			}
		}

		fetchWithFallback<Health>(
			`${API_CONFIG.endpoints.health}/slug/${slug}`,
			'health.json'
		)
			.then((res) => {
				// Handle both array and single object responses
				let healthData: Health | null = null
				if (Array.isArray(res.data)) {
					healthData = res.data.find((item) => item.slug === slug) || null
				} else {
					healthData = res.data
				}

				if (healthData) {
					setHealthItem(healthData)
					sessionStorage.setItem(storageKey, JSON.stringify(healthData))
					document.title = `${healthData.title} - E Commerce`
				} else {
					console.error(`Health item with slug ${slug} not found in response`)
				}
			})
			.catch((error) => {
				console.error('Error fetching health details:', error)
			})
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

	const renderSingleImage = (item: ContentItem, fullWidth = false) => {
		if (!item || item.type !== 'image') return null

		const imageUrl = item.content
		if (!imageUrl) return null

		return (
			<div
				className={
					fullWidth
						? 'w-full transition-all rounded-md duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md'
						: 'w-full md:w-[44%] flex-shrink-0 transition-all rounded-md duration-300 hover:scale-[1.02] hover:shadow-lg shadow-md'
				}
			>
				<Zoom zoomMargin={40} IconUnzoom={XMarkIcon}>
					<img
						src={imageUrl}
						alt="Health image"
						className="object-cover rounded-md w-full max-h-[350px] md:min-h-[500px]"
						loading="lazy"
					/>
				</Zoom>
			</div>
		)
	}

	const renderImageGroup = (
		images: ContentItem[],
		hasHeader: boolean = false
	) => {
		if (!images || images.length === 0) return null

		return (
			<>
				{hasHeader && images[0]?.itemHeader && (
					<h4 className="text-lg font-semibold mb-2 center">
						{images[0].itemHeader}
					</h4>
				)}
				<div className="flex flex-wrap gap-4 justify-between w-full">
					{images.map((img, i) => (
						<Fragment key={i}>{renderSingleImage(img)}</Fragment>
					))}
				</div>
			</>
		)
	}

	const renderParagraphs = (item: ContentItem) => {
		if (!item || item.type !== 'paragraph') return null

		const paragraph = item.content
		if (!paragraph) return null

		return (
			<div className="space-y-5">
				{item.itemHeader && (
					<h4 className="text-lg font-semibold mb-2">{item.itemHeader}</h4>
				)}
				<p className="text-lg text-gray-700 leading-relaxed">
					{paragraph.split(urlRegex).map((part, j) => {
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

							if (url.toLowerCase().endsWith('.pdf')) {
								return (
									<Fragment key={j}>
										<PDFViewer url={url} displayText={displayText} />
										{punctuation}
									</Fragment>
								)
							} else {
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
						}
						return <Fragment key={j}>{part}</Fragment>
					})}
				</p>
			</div>
		)
	}

	const renderSection = (section: HealthSection, index: number) => {
		const sectionClass =
			'bg-white rounded-lg p-6 md:p-8 mb-8 transition-all duration-300 relative overflow-hidden backdrop-blur-sm'

		const headerElement = section.contentHeader && (
			<h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b border-gray-200 pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-1/4 after:h-[3px] after:bg-black after:rounded-full">
				{section.contentHeader}
			</h3>
		)

		if (
			section.items.length === 2 &&
			((section.items[0].type === 'paragraph' &&
				section.items[1].type === 'image') ||
				(section.items[0].type === 'image' &&
					section.items[1].type === 'paragraph'))
		) {
			const first = section.items[0]
			const second = section.items[1]
			return (
				<div key={index} className={sectionClass}>
					{headerElement}
					<div className="flex flex-col md:flex-row gap-6 justify-between">
						<div className="w-full md:w-[40%]">
							{first.type === 'paragraph'
								? renderParagraphs(first)
								: renderSingleImage(first, true)}
						</div>
						<div className="w-full md:w-[60%] flex items-center">
							{second.type === 'paragraph'
								? renderParagraphs(second)
								: renderSingleImage(second, true)}
						</div>
					</div>
				</div>
			)
		}

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
				const images = []
				let j = i + 1
				while (j < section.items.length && section.items[j].type === 'image') {
					images.push(section.items[j])
					j++
				}
				itemPairs.push({
					type: 'paragraph-images',
					paragraph: item,
					images: images,
				})
				i = j - 1
			} else if (
				item.type === 'image' &&
				i + 1 < section.items.length &&
				section.items[i + 1].type === 'paragraph'
			) {
				const images = [item]
				let j = i + 1
				while (j < section.items.length && section.items[j].type === 'image') {
					images.push(section.items[j])
					j++
				}
				const paragraphIndex =
					j < section.items.length && section.items[j].type === 'paragraph' ? j : -1

				if (paragraphIndex !== -1) {
					itemPairs.push({
						type: 'images-paragraph',
						images: images,
						paragraph: section.items[paragraphIndex],
					})
					i = paragraphIndex
				} else {
					itemPairs.push({
						type: 'images-only',
						images: images,
					})
					i = j - 1
				}
			} else if (item.type === 'image') {
				const images = [item]
				let j = i + 1
				while (j < section.items.length && section.items[j].type === 'image') {
					images.push(section.items[j])
					j++
				}
				itemPairs.push({
					type: 'images-only',
					images: images,
				})
				i = j - 1
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
						} else if (
							pair.type === 'paragraph-images' &&
							pair.images?.length === 1
						) {
							return (
								<div
									key={pairIndex}
									className="flex flex-col md:flex-row gap-6 justify-between"
								>
									<div className="w-full md:w-[40%]">
										{pair.paragraph && renderParagraphs(pair.paragraph)}
									</div>
									<div className="w-full md:w-[60%] flex items-center">
										{pair.images &&
											pair.images[0] &&
											renderSingleImage(pair.images[0], true)}
									</div>
								</div>
							)
						} else if (pair.type === 'paragraph-images') {
							return (
								<div
									key={pairIndex}
									className="flex flex-col md:flex-row gap-6 justify-between"
								>
									<div className="w-full md:w-[40%]">
										{pair.paragraph && renderParagraphs(pair.paragraph)}
									</div>
									<div className="w-full md:w-[55%]">
										{pair.images && renderImageGroup(pair.images)}
									</div>
								</div>
							)
						} else if (pair.type === 'images-paragraph') {
							return (
								<div
									key={pairIndex}
									className="flex flex-col md:flex-row gap-6 justify-between"
								>
									<div className="w-full md:w-[55%]">
										{pair.images && renderImageGroup(pair.images)}
									</div>
									<div className="w-full md:w-[40%]">
										{renderParagraphs(
											pair.paragraph ?? { type: 'paragraph', content: '' }
										)}
									</div>
								</div>
							)
						} else if (pair.type === 'images-only') {
							return (
								<div key={pairIndex} className="w-full">
									<div className="flex flex-row gap-6 flex-wrap w-full justify-center">
										{pair.images && renderImageGroup(pair.images, true)}
									</div>
								</div>
							)
						} else {
							return (
								<div key={pairIndex} className="w-full">
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
					<h2 className="text-xl md:text-2xl mb-4 text-gray-900 font-medium leading-relaxed">
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
