/**
 * Item Details Component
 *
 * This component displays detailed information for a specific product.
 * It fetches product information from the API or fallback data based on the product name
 * in the URL. The component features a tabbed interface for product information,
 * quantity selector, and add-to-cart functionality.
 *
 * Features:
 * - Product detail display with images and descriptions
 * - Tabbed interface for product information (flowers, aroma, consumption)
 * - Quantity selector with inventory validation
 * - Add to cart functionality
 * - Loading and error states
 * - Product slug validation
 * - Session storage caching for product data
 */

import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useCart } from '../cart/useCart.tsx'
import { Honey } from '../../interfaces/honey'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { formatSlug } from '../../common/formatting'
import { Transition } from '@headlessui/react'
import Loader from '../common/Loader.tsx'
import ErrorMessage from '../common/ErrorMessage.tsx'
import { fetchWithFallback } from '../../utils/apiClient.ts'
import { API_CONFIG } from '../../utils/apiConfig'

/**
 * Component to display detailed information for a single product
 * Fetches product data based on the productName parameter from the URL
 */
const ItemDetails: React.FC = () => {
	const { addToCart } = useCart()
	const location = useLocation()
	const { productName } = useParams<{ productName: string }>()
	/**
	 * Session storage key for caching current item data
	 */
	const storageKey = `currentItem:${productName}`

	/**
	 * Current item state, initialized with data from location state or session storage
	 */
	const [item, setItem] = useState<Honey | null>(() => {
		const stateItem = location.state?.item
		if (stateItem) return stateItem
		const storedItem = sessionStorage.getItem(storageKey)
		return storedItem ? JSON.parse(storedItem) : null
	})

	/**
	 * Selected quantity for the item, starts at 1
	 */
	const [quantity, setQuantity] = useState(1)

	/**
	 * Currently selected tab index for product information
	 */
	const [selectedTab, setSelectedTab] = useState(0)

	/**
	 * Loading state to show/hide loader component
	 */
	const [loading, setLoading] = useState(false)

	/**
	 * Error state to display error messages to the user
	 */
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (item && item.name) {
			document.title = `${item.name} - E Commerce`
		}
	}, [item])

	/**
	 * Fetches item data based on the productName parameter
	 * First checks session storage for cached data, then fetches from API or fallback
	 * Updates document title with item name and caches data in session storage
	 */
	useEffect(() => {
		const storageKey = `currentItem:${productName}`
		const storedItem = sessionStorage.getItem(storageKey)
		let parsedItem = storedItem ? JSON.parse(storedItem) : null
		if (parsedItem && parsedItem.name) {
			setItem(parsedItem)
			return
		}
		if (productName) {
			setLoading(true)
			setError(null)
			fetchWithFallback<Honey>(
				`${API_CONFIG.endpoints.honey}/name/${productName}`,
				'honey.json'
			)
				.then((res) => {
					// Handle both single item and array responses
					let honeyData: Honey | null = null
					if (Array.isArray(res.data)) {
						honeyData =
							res.data.find((item) => formatSlug(item.name) === productName) || null
					} else {
						honeyData = res.data
					}

					if (honeyData) {
						setItem(honeyData)
						sessionStorage.setItem(storageKey, JSON.stringify(honeyData))
					} else {
						setError('Продуктот не е пронајден')
					}
				})
				.catch(() => setError('Продуктот не е пронајден'))
				.finally(() => setLoading(false))
		}
	}, [productName])

	/**
	 * Updates the selected quantity for the item
	 * Ensures quantity never goes below 1
	 *
	 * @param {'increment' | 'decrement'} type - Whether to increase or decrease quantity
	 */
	const handleQuantityChange = (type: 'increment' | 'decrement') => {
		setQuantity((prev) => Math.max(1, type === 'increment' ? prev + 1 : prev - 1))
	}

	if (loading) return <Loader />

	if (error) return <ErrorMessage message={error} />
	if (!item || !item.name)
		return <ErrorMessage message="Продуктот не е пронајден" />

	const expectedSlug = formatSlug(item.name)
	if (productName !== expectedSlug) {
		return <ErrorMessage message="Невалиден URL за производот" />
	}
	return (
		<div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
				<div className="relative group overflow-hidden rounded-xl aspect-square">
					<img
						src={item.image}
						alt={item.name}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>

				<div className="space-y-6">
					<div>
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
							{item.name}
						</h1>
						<p className="text-gray-500 text-lg mb-4">Пакување: {item.weight}г</p>
					</div>

					<div className="space-y-4">
						<div className="flex items-baseline gap-4">
							{item.discount > 0 ? (
								<>
									<span className="text-gray-400 line-through text-xl">
										{item.price.toFixed(0)} ден.
									</span>
									<span className="text-3xl font-bold text-black">
										{Math.round(item.price * (1 - item.discount / 100))} ден.
									</span>
									<span className="bg-amber-100 text-red-600 px-3 py-1 rounded-full text-sm">
										-{item.discount}%
									</span>
								</>
							) : (
								<span className="text-3xl font-bold text-gray-900">
									{item.price.toFixed(0)} ден.
								</span>
							)}
						</div>

						<div className="flex items-center gap-2">
							<div
								className={`h-3 w-3 rounded-full ${
									item.stock > 0 ? 'bg-green-500' : 'bg-red-500'
								}`}
							/>
							<span
								className={`text-lg ${
									item.stock > 0 ? 'text-green-600' : 'text-red-600'
								}`}
							>
								{item.stock > 0 ? 'Има на залиха' : 'Нема на залиха'}
							</span>
						</div>
					</div>

					<hr className="border-t border-gray-200" />

					<div className="flex items-center gap-4">
						<div className="flex items-center border border-gray-200 rounded-lg">
							<button
								onClick={() => handleQuantityChange('decrement')}
								className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-30"
								disabled={quantity <= 1}
							>
								<MinusIcon className="w-6 h-6" />
							</button>
							<div className="w-16 text-center text-xl font-medium">{quantity}</div>
							<button
								onClick={() => handleQuantityChange('increment')}
								className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-30"
								disabled={item.stock <= quantity}
							>
								<PlusIcon className="w-6 h-6" />
							</button>
						</div>

						<button
							onClick={() => addToCart(item, quantity)}
							disabled={item.stock <= 0}
							className="flex-1 flex items-center justify-center border border-black hover:bg-black hover:text-white hover:border-white px-6 py-4 rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<ShoppingCartIcon
								className={`w-5 h-5 transition-transform duration-300 ${
									item.stock > 0 ? 'group-hover:translate-x-1' : ''
								}`}
							/>
							<span className="font-medium">
								{item.stock > 0 ? 'Додади во кошничка' : 'Нема залиха'}
							</span>
						</button>
					</div>

					<TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
						<TabList className="flex justify-between w-full">
							{['ЦВЕТОВИ', 'АРОМА', 'КОНСУМИРАЈ'].map((tab) => (
								<Tab
									key={tab}
									className={({ selected }) => `
                                       flex-1 text-center px-4 py-3 text-sm font-medium focus:outline-none
                                        ${
																																									selected
																																										? 'text-black border-b-2 border-black'
																																										: 'text-gray-500 hover:text-gray-700 border-b-2 border-gray-200'
																																								}
                                    `}
								>
									{tab}
								</Tab>
							))}
						</TabList>

						<TabPanels className="mt-6">
							<TabPanel>
								<Transition
									show={selectedTab === 0}
									enter="transition-opacity duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
								>
									<div className="space-y-4 text-gray-600">
										<p>{item.flowers_description}</p>
										<p className="font-medium">Доминантни растенија: {item.flowers}</p>
									</div>
								</Transition>
							</TabPanel>

							<TabPanel>
								<Transition
									show={selectedTab === 1}
									enter="transition-opacity duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
								>
									<div className="space-y-4 text-gray-600">
										<p>{item.aroma_explanation}</p>
										<p>{item.aroma}</p>
										<p>{item.aroma_description}</p>
										<p className="text-sm italic">
											• Фотографијата е за илустративни цели
										</p>
									</div>
								</Transition>
							</TabPanel>

							<TabPanel>
								<Transition
									show={selectedTab === 2}
									enter="transition-opacity duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
								>
									<div className="space-y-6 text-gray-600">
										<div>
											<h3 className="text-lg font-semibold mb-2">Консумирање</h3>
											<p>{item.consume}</p>
										</div>

										<div>
											<h3 className="text-lg font-semibold mb-2">Рок на консумирање</h3>
											<p>{item.consume_date}</p>
										</div>

										<div>
											<h3 className="text-lg font-semibold mb-2">Чување</h3>
											<p>Да се чува на темно и суво место.</p>
										</div>
									</div>
								</Transition>
							</TabPanel>
						</TabPanels>
					</TabGroup>
				</div>
			</div>
		</div>
	)
}

export default ItemDetails
