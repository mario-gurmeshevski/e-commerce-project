import { Honey } from '../../interfaces/honey'
import { useCart } from '../cart/useCart.tsx'
import { Link } from 'react-router-dom'
import { formatProductSlug } from '../../common/formatting'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { Transition } from '@headlessui/react'
import React from 'react'

const ShopItem = ({ item }: { item: Honey }) => {
	const { addToCart } = useCart()
	const currentPrice = Math.round(item.price * (1 - item.discount / 100))

	const handleAddToCart = (e: React.MouseEvent, product: Honey) => {
		e.stopPropagation()
		addToCart(product, 1)
	}

	return (
		<article className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
			<Link
				to={`/shop/${formatProductSlug(item.name)}`}
				state={{ item }}
				className="block p-4 space-y-4"
				onClick={() => sessionStorage.setItem('currentItem', JSON.stringify(item))}
			>
				{/* Image Section */}
				<div className="relative aspect-square overflow-hidden rounded-lg">
					<img
						src={item.image}
						alt={item.name}
						width={400}
						height={400}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
					/>
				</div>

				{/* Product Info */}
				<div className="space-y-2">
					<h2 className="font-medium text-gray-900 line-clamp-2 leading-tight">
						{item.name}
					</h2>

					{/* Pricing */}
					<div className="flex flex-wrap items-baseline gap-2">
						{item.discount > 0 ? (
							<>
								<span className="text-gray-400 line-through text-sm">
									{item.price.toFixed(0)} ден.
								</span>
								<span className="text-lg font-medium text-black">
									{currentPrice} ден.
								</span>
								<span className="text-xs font-medium bg-amber-100 text-red-600 px-2 py-1 rounded-full">
									-{item.discount}%
								</span>
							</>
						) : (
							<span className="text-lg font-medium text-gray-900">
								{currentPrice} ден.
							</span>
						)}
					</div>

					{/* Stock Status */}
					<div className="flex items-center gap-2">
						<div
							className={`h-2 w-2 rounded-full ${
								item.stock > 0 ? 'bg-green-500' : 'bg-red-500'
							}`}
						/>
						<span
							className={`text-sm ${
								item.stock > 0 ? 'text-green-600' : 'text-red-600'
							}`}
						>
							{item.stock > 0 ? 'На залиха' : 'Нема залиха'}
						</span>
					</div>
				</div>
			</Link>

			{/* Add to Cart Button */}
			<div className="p-4 pt-0 mt-auto relative overflow-hidden">
				<button
					className={`w-full flex items-center justify-center gap-2 
                         hover:bg-black text-black hover:text-white border border-black
                        px-4 py-3 rounded-lg 
                        transition-all duration-300 
                        hover:scale-[1.02] 
                        active:scale-95 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        `}
					onClick={(e) => handleAddToCart(e, item)}
					disabled={item.stock <= 0}
					aria-disabled={item.stock <= 0}
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
				<Transition
					show={false}
					enter="transition-opacity duration-150"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="absolute inset-0 pointer-events-none">
						<div
							className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2
                            bg-white/30 rounded-full scale-0
                            group-active:scale-100 transition-transform duration-500"
						/>
					</div>
				</Transition>
			</div>
		</article>
	)
}

export default ShopItem
