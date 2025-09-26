import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { useCart } from '../../cart/useCart'
import useResponsive from '../../../common/useResponsive'

export const RightNav = () => {
	const { cartItems, getTotalItems, getTotalUniqueProducts, decreaseQuantity } =
		useCart()
	const [isOpen, setIsOpen] = useState(false)
	const [isFlashing, setIsFlashing] = useState(false)
	const [isClosing, setIsClosing] = useState(false)
	const isMobile = useResponsive()
	const navigate = useNavigate()
	const location = useLocation()
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const prevTotalRef = useRef(getTotalItems())
	const [progressWidth, setProgressWidth] = useState(0)

	const subtotal = useMemo(
		() =>
			cartItems.reduce((sum, item) => {
				const discountFactor = 1 - (item.discount || 0) / 100
				const discountedItem = Math.round(item.price * discountFactor)
				return sum + Math.round(discountedItem * item.quantity)
			}, 0),
		[cartItems]
	)

	const shippingCost = useMemo(() => (subtotal >= 2000 ? 0 : 150), [subtotal])
	const totalCost = useMemo(
		() => subtotal + shippingCost,
		[subtotal, shippingCost]
	)

	useEffect(() => {
		const newWidth = Math.min((subtotal / 2000) * 100, 100)
		setProgressWidth(newWidth)
	}, [subtotal])

	useEffect(() => {
		if (
			location.pathname === '/checkout' ||
			location.pathname.startsWith('/shop/') ||
			location.pathname === '/shop'
		) {
			handleClose()
		}
	}, [location.pathname])

	useEffect(() => {
		const currentTotal = getTotalItems()
		const isShopRoute = location.pathname.startsWith('/shop')
		const shouldFlash =
			currentTotal > prevTotalRef.current && isShopRoute && !isMobile

		if (shouldFlash) {
			setIsOpen(true)
			setIsFlashing(true)

			timeoutRef.current = setTimeout(() => {
				setIsFlashing(false)
				handleClose()
			}, 2000)
		}

		prevTotalRef.current = currentTotal
	}, [getTotalItems(), location.pathname, isMobile])

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	const handleClose = () => {
		setIsClosing(true)
		setTimeout(() => {
			setIsOpen(false)
			setIsClosing(false)
		}, 300)
	}

	const toggleSidebar = () => {
		if (location.pathname === '/checkout') return
		if (isOpen) {
			handleClose()
		} else {
			setIsOpen(true)
		}
	}

	const handleMouseEnter = () => {
		if (location.pathname === '/checkout' || isMobile) return
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		setIsOpen(true)
		setIsClosing(false)
	}

	const handleMouseLeave = () => {
		if (isMobile) return
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		timeoutRef.current = setTimeout(() => handleClose(), 300)
	}

	return (
		<div className="relative flex items-center group">
			<Popover className="relative">
				<div
					onMouseEnter={!isMobile ? handleMouseEnter : undefined}
					onMouseLeave={!isMobile ? handleMouseLeave : undefined}
					onClick={isMobile ? toggleSidebar : undefined}
				>
					<PopoverButton
						className={`p-2 sm:p-3 rounded-full transition-colors relative min-h-[44px] min-w-[44px] flex items-center justify-center ${
							isFlashing ? 'animate-pulse-scale' : ''
						}`}
						onClick={(e) => {
							if (getTotalItems() > 0) {
								e.preventDefault()
								if (!isMobile) {
									navigate('/checkout')
								}
							}
						}}
						aria-label="Cart"
					>
						<ShoppingCartIcon
							className={`h-6 w-6 sm:h-7 sm:w-7 ${
								location.pathname === '/' ? 'text-white' : 'text-black'
							}`}
						/>
						<span
							className={`absolute -top-1 -right-1 bg-black text-white rounded-full px-1.5 sm:px-2 py-0.5 text-xs font-medium min-w-[20px] min-h-[20px] flex items-center justify-center ${
								isFlashing ? 'animate-pulse-scale' : ''
							}`}
						>
							{getTotalItems()}
						</span>
					</PopoverButton>

					<Transition
						show={isOpen}
						enter="transition ease-out duration-300"
						enterFrom="opacity-0 translate-y-2 scale-95"
						enterTo="opacity-100 translate-y-0 scale-100"
						leave="transition ease-in duration-300"
						leaveFrom="opacity-100 translate-y-0 scale-100"
						leaveTo="opacity-0 translate-y-2 scale-95"
					>
						<PopoverPanel
							className={`fixed right-0 top-0 bg-white shadow-xl border border-gray-100 transition-all duration-300 z-50 ${
								isMobile
									? 'w-[75%] max-w-[320px] h-full z-50'
									: 'md:w-80 lg:w-96 md:absolute md:top-full md:mt-2.5 md:rounded-xl'
							} ${
								isOpen && !isClosing
									? 'translate-x-0 opacity-100'
									: 'md:opacity-0 md:-translate-y-2 md:pointer-events-none'
							} ${isFlashing ? 'animate-pulse-scale' : ''} ${
								isClosing && isMobile ? 'animate-slide-out' : ''
							} ${isClosing && !isMobile ? 'animate-cart-close' : ''}`}
							static
							onMouseEnter={!isMobile ? handleMouseEnter : undefined}
							onMouseLeave={!isMobile ? handleMouseLeave : undefined}
						>
							<div
								className="p-3 sm:p-4 space-y-3 sm:space-y-4 h-full flex flex-col"
								onClick={(e) => e.stopPropagation()}
							>
								{isMobile && (
									<button
										onClick={handleClose}
										className="absolute top-3 right-3 text-black p-2 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-100"
										aria-label="Close"
									>
										<XMarkIcon className="h-5 w-5" />
									</button>
								)}
								<div className="flex items-center justify-between pb-2 border-b border-gray-200 pr-12 sm:pr-0">
									<h3 className="text-base sm:text-lg font-bold text-black">
										Вашата кошничка ({getTotalUniqueProducts()})
									</h3>
								</div>

								{cartItems.length === 0 ? (
									<div className="py-8 text-center">
										<p className="text-gray-400 text-sm sm:text-base">
											Кошничката е празна
										</p>
									</div>
								) : (
									<>
										<div className="max-h-72 sm:max-h-96 overflow-y-auto pr-2 -mr-2">
											{cartItems.map((item, index) => (
												<div key={item.id} className="group relative">
													<div className="flex gap-3 sm:gap-4 py-2 sm:py-3">
														<img
															src={item.image}
															alt={item.name}
															className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
														/>

														<div className="flex-1 min-w-0">
															<h4 className="font-medium text-black line-clamp-2 text-sm sm:text-base">
																{item.name}
															</h4>
															<div className="flex items-baseline gap-2 mt-1">
																<span className="text-xs sm:text-sm text-gray-500">
																	{item.quantity} ×{' '}
																	{Math.round(item.price * (1 - (item.discount || 0) / 100))}{' '}
																	ден.
																</span>
															</div>
														</div>

														<button
															onClick={(e) => {
																e.stopPropagation()
																decreaseQuantity(item.id)
															}}
															className="text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100 h-[36px] w-[36px] flex items-center justify-center flex-shrink-0"
															aria-label="Remove"
														>
															<XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
														</button>
													</div>

													{index < cartItems.length - 1 && (
														<hr className="my-2 border-gray-100" />
													)}
												</div>
											))}
										</div>

										{shippingCost > 0 && (
											<div className="space-y-2 pt-2">
												<div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
													<div
														className="absolute left-0 h-full bg-black transition-all duration-500 ease-out"
														style={{ width: `${progressWidth}%` }}
													/>
												</div>
												<p className="text-center text-xs text-gray-500">
													{Math.max(2000 - subtotal, 0).toFixed(0)} ден. до бесплатна достава
												</p>
											</div>
										)}

										<div className="space-y-2 sm:space-y-3 pt-2">
											<div className="flex justify-between text-sm">
												<span className="text-black">Цена:</span>
												<span className="font-medium text-black">
													{subtotal.toFixed(0)} ден.
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-black">Достава:</span>
												<span className="font-medium text-black">
													{shippingCost.toFixed(0)} ден.
												</span>
											</div>
											<div className="flex justify-between pt-2 border-t border-gray-200">
												<span className="font-bold text-black">Вкупно:</span>
												<span className="font-bold text-base sm:text-lg text-black">
													{totalCost.toFixed(0)} ден.
												</span>
											</div>
										</div>

										<button
											onClick={() => navigate('/checkout')}
											className="w-full bg-white hover:bg-black hover:text-white border border-black text-black py-3 sm:py-4 rounded-lg font-medium transition-all text-sm sm:text-base min-h-[48px] flex items-center justify-center"
										>
											Кон плаќање
										</button>
									</>
								)}
							</div>
						</PopoverPanel>
					</Transition>
				</div>
			</Popover>
		</div>
	)
}
