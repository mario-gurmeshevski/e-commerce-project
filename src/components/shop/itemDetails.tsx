import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useCart } from '../cart/useCart.tsx'
import { Honey } from '../../interfaces/honey'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { formatSlug } from '../../common/formatting'
import { Transition } from '@headlessui/react'
import axios from 'axios'
import Loader from '../common/Loader.tsx'

const ItemDetails: React.FC = () => {
	const { addToCart } = useCart()
	const location = useLocation()
	const { productName } = useParams<{ productName: string }>()
	const storageKey = `currentItem:${productName}`
	const [item, setItem] = useState<Honey | null>(() => {
		const stateItem = location.state?.item
		if (stateItem) return stateItem
		const storedItem = sessionStorage.getItem(storageKey)
		return storedItem ? JSON.parse(storedItem) : null
	})

	const [quantity, setQuantity] = useState(1)
	const [selectedTab, setSelectedTab] = useState(0)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (item && item.name) {
			document.title = `${item.name} - Makmela`
		}
	}, [item])

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
			axios
				.get(`/api/honey/name/${productName}`)
				.then((res) => {
					setItem(res.data)
					sessionStorage.setItem(storageKey, JSON.stringify(res.data))
				})
				.catch(() => setError('Продуктот не е пронајден'))
				.finally(() => setLoading(false))
		}
	}, [productName])

	const handleQuantityChange = (type: 'increment' | 'decrement') => {
		setQuantity((prev) => Math.max(1, type === 'increment' ? prev + 1 : prev - 1))
	}

	if (loading) return <Loader />

	if (error)
		return (
			<div className="flex items-center justify-center h-[70vh] text-xl font-medium text-red-500">
				{error}
			</div>
		)

	if (!item || !item.name) {
		return (
			<div className="flex items-center justify-center h-[70vh] text-xl font-medium">
				Продуктот не е пронајден
			</div>
		)
	}

	const expectedSlug = formatSlug(item.name)
	if (productName !== expectedSlug) {
		return (
			<div className="text-center mt-10 text-xl font-medium text-red-500">
				Невалиден URL за производот
			</div>
		)
	}
	return (
		<div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
			{/* Product Main Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
				{/* Image Section */}
				<div className="relative group overflow-hidden rounded-xl aspect-square">
					<img
						src={item.image}
						alt={item.name}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>

				{/* Product Details */}
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
							{item.name}
						</h1>
						<p className="text-gray-500 text-lg mb-4">Пакување: {item.weight}г</p>
					</div>

					{/* Price Section */}
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

					{/* Quantity Selector */}
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

					{/* Tabs Section */}
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
