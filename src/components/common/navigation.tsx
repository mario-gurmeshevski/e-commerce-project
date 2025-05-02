import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../cart/useCart.tsx'
import {
	ShoppingCartIcon,
	Bars3BottomLeftIcon,
	XMarkIcon,
	InformationCircleIcon,
	EnvelopeIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import bee from '/Logo.png'

const FacebookIcon = () => (
	<svg
		className="h-7 w-7 text-white fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 50 50"
	>
		<path d="M 25 3 C 12.861562 3 3 12.861562 3 25 C 3 36.019135 11.127533 45.138355 21.712891 46.728516 L 22.861328 46.902344 L 22.861328 29.566406 L 17.664062 29.566406 L 17.664062 26.046875 L 22.861328 26.046875 L 22.861328 21.373047 C 22.861328 18.494965 23.551973 16.599417 24.695312 15.410156 C 25.838652 14.220896 27.528004 13.621094 29.878906 13.621094 C 31.758714 13.621094 32.490022 13.734993 33.185547 13.820312 L 33.185547 16.701172 L 30.738281 16.701172 C 29.349697 16.701172 28.210449 17.475903 27.619141 18.507812 C 27.027832 19.539724 26.84375 20.771816 26.84375 22.027344 L 26.84375 26.044922 L 32.966797 26.044922 L 32.421875 29.564453 L 26.84375 29.564453 L 26.84375 46.929688 L 27.978516 46.775391 C 38.71434 45.319366 47 36.126845 47 25 C 47 12.861562 37.138438 3 25 3 z M 25 5 C 36.057562 5 45 13.942438 45 25 C 45 34.729791 38.035799 42.731796 28.84375 44.533203 L 28.84375 31.564453 L 34.136719 31.564453 L 35.298828 24.044922 L 28.84375 24.044922 L 28.84375 22.027344 C 28.84375 20.989871 29.033574 20.060293 29.353516 19.501953 C 29.673457 18.943614 29.981865 18.701172 30.738281 18.701172 L 35.185547 18.701172 L 35.185547 12.009766 L 34.318359 11.892578 C 33.718567 11.811418 32.349197 11.621094 29.878906 11.621094 C 27.175808 11.621094 24.855567 12.357448 23.253906 14.023438 C 21.652246 15.689426 20.861328 18.170128 20.861328 21.373047 L 20.861328 24.046875 L 15.664062 24.046875 L 15.664062 31.566406 L 20.861328 31.566406 L 20.861328 44.470703 C 11.816995 42.554813 5 34.624447 5 25 C 5 13.942438 13.942438 5 25 5 z"></path>
	</svg>
)

const InstagramIcon = () => (
	<svg
		className="h-7 w-7 text-white fill-current"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 50 50"
	>
		<path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
	</svg>
)

const LeftNav = ({ isMobile = false, closeMenu = () => {} }) => {
	return (
		<div
			className={`${
				isMobile
					? 'flex flex-col space-y-4 p-6 w-full'
					: 'flex justify-between items-center w-full p-6'
			}`}
		>
			{isMobile && (
				<div className="mb-6 pb-4 border-b border-gray-700">
					<div className="flex items-center">
						<img src={bee} alt="bee" className="h-8 mr-2" />
						<span className="text-2xl tracking-widest font-thin">МАКМЕЛА</span>
					</div>
				</div>
			)}

			<Link
				to="/shop"
				className={`group relative ${
					isMobile
						? 'flex items-center py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors'
						: 'text-lg'
				}`}
				onClick={isMobile ? closeMenu : undefined}
			>
				{isMobile && <ShoppingCartIcon className="h-5 w-5" />}
				<span className="pl-3">Продавница</span>
				{!isMobile && (
					<div className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
				)}
			</Link>

			<Link
				to="/about"
				className={`group relative ${
					isMobile
						? 'flex items-center py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors'
						: 'text-lg'
				}`}
				onClick={isMobile ? closeMenu : undefined}
			>
				{isMobile && <InformationCircleIcon className="h-5 w-5" />}
				<span className="pl-3">За Нас</span>
				{!isMobile && (
					<div className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
				)}
			</Link>

			<Link
				to="/contact"
				className={`group relative ${
					isMobile
						? 'flex items-center py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors'
						: 'text-lg'
				}`}
				onClick={isMobile ? closeMenu : undefined}
			>
				{isMobile && <EnvelopeIcon className="h-5 w-5" />}
				<span className="pl-3">Контакт</span>
				{!isMobile && (
					<div className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
				)}
			</Link>

			{isMobile && (
				<div className="mt-auto pt-6 border-t border-gray-700">
					<div className="flex space-x-4">
						<a href="#" className="p-2 rounded-full transition-colors">
							<FacebookIcon />
						</a>
						<a href="#" className="p-2 rounded-full transition-colors">
							<InstagramIcon />
						</a>
					</div>
				</div>
			)}
		</div>
	)
}

const CenterNav = () => {
	return (
		<Link to="/" className="text-center flex items-center">
			<img src={bee} alt="bee" className="h-7 md:h-12 mr-2" />
			<span className={'text-2xl md:text-4xl tracking-widest font-thin'}>
				МАКМЕЛА
			</span>
		</Link>
	)
}

const RightNav = () => {
	const { cartItems, getTotalItems, getTotalUniqueProducts, decreaseQuantity } =
		useCart()
	const [subtotal, setSubtotal] = useState(Number)
	const [isFlashing, setIsFlashing] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const timeoutRef = useRef<number | null>(null)
	const navigate = useNavigate()
	const prevTotalRef = useRef(getTotalItems())
	const location = useLocation()
	const triggerRef = useRef<HTMLDivElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)
	const isHome = location.pathname === '/'
	const isOpenRef = useRef(isOpen)
	const totalItems = getTotalItems()

	const mobileStyles = {
		panel: {
			width: '62%',
			height: '100vh',
			borderRadius: 0,
			top: 0,
			transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
		},
		content: {
			padding: '1rem',
			overflowY: 'auto',
		},
	}

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 1024px)')
		const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches)
		setIsMobile(mediaQuery.matches)
		mediaQuery.addEventListener('change', handleResize)
		return () => mediaQuery.removeEventListener('change', handleResize)
	}, [])

	useEffect(() => {
		if (
			location.pathname === '/checkout' ||
			location.pathname.startsWith('/shop/') ||
			location.pathname === '/shop'
		) {
			setIsOpen(false)
		}
	}, [location.pathname])

	useEffect(() => {
		if (isOpen) {
			const handleClickOutside = (event: MouseEvent) => {
				const clickedElement = event.target as Node
				const panelNode = panelRef.current
				const triggerNode = triggerRef.current

				const isOutside =
					!panelNode?.contains(clickedElement) &&
					!triggerNode?.contains(clickedElement)

				if (isOutside) {
					setIsOpen(false)
					window.clearTimeout(timeoutRef.current as number)
				}
			}

			document.addEventListener('mousedown', handleClickOutside)
			return () => document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen, isMobile])

	useLayoutEffect(() => {
		const currentTotal = totalItems
		const isShopRoute = location.pathname.startsWith('/shop')
		const shouldFlash = currentTotal > prevTotalRef.current && isShopRoute

		if (shouldFlash && !isMobile) {
			setIsOpen(true)
			setIsFlashing(true)

			const flashTimeout = setTimeout(() => setIsFlashing(false), 500)
			const closeTimeout = setTimeout(() => {
				if (isShopRoute && isOpenRef.current) {
					setIsOpen(false)
				}
			}, 2000)

			return () => {
				clearTimeout(flashTimeout)
				clearTimeout(closeTimeout)
				setIsFlashing(false)
			}
		}

		prevTotalRef.current = currentTotal
	}, [totalItems, isMobile])

	useEffect(() => {
		isOpenRef.current = isOpen
	}, [isOpen])

	const clearTimeout = (timeoutId?: ReturnType<typeof setTimeout> | null) => {
		if (timeoutId) {
			window.clearTimeout(timeoutId)
		} else if (timeoutRef.current) {
			window.clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}
	}

	const handleMouseEnter = () => {
		if (location.pathname === '/checkout') return

		clearTimeout()
		setIsOpen(true)
	}

	const handleMouseLeave = () => {
		clearTimeout()
		timeoutRef.current = window.setTimeout(() => {
			setIsOpen(false)
		}, 300)
	}

	useEffect(() => {
		return () => clearTimeout()
	}, [])

	const getSubtotal = () =>
		cartItems.reduce((sum, item) => {
			const discountFactor = 1 - (item.discount || 0) / 100
			const discountedItem = Math.round(item.price * discountFactor)
			return sum + Math.round(discountedItem * item.quantity)
		}, 0)

	const getShippingCost = () => {
		const subtotal = getSubtotal()
		return subtotal >= 2000 ? 0 : 150
	}

	const getTotalCost = () => {
		return getSubtotal() + getShippingCost()
	}

	useEffect(() => {
		setSubtotal(getSubtotal())
	}, [cartItems])

	const getRemainingForFreeShipping = () => {
		const subtotal = getSubtotal()
		return Math.max(2000 - subtotal, 0)
	}

	const toggleSidebar = () => {
		if (location.pathname === '/checkout') return
		setIsOpen(!isOpen)
	}

	return (
		<div className="relative flex items-center group">
			<Popover className="relative">
				<div
					ref={triggerRef}
					onMouseEnter={!isMobile ? handleMouseEnter : undefined}
					onMouseLeave={!isMobile ? handleMouseLeave : undefined}
					onClick={isMobile ? toggleSidebar : undefined}
				>
					<PopoverButton
						className={`p-2 rounded-full ${
							isHome ? 'hover:bg-gray-800 hover:bg-opacity-10' : 'hover:bg-gray-50'
						} transition-colors relative`}
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
							className={`h-6 w-6 ${isHome ? 'text-white' : 'text-black'}`}
						/>
						<span
							className={`absolute -top-1 -right-1  bg-black text-white rounded-full px-2 py-0.5 text-xs font-medium
                                ${isFlashing ? 'animate-pulse-scale' : ''}`}
						>
							{getTotalItems()}
						</span>
					</PopoverButton>

					<Transition
						show={isOpen}
						enter="transition ease-out duration-300"
						enterFrom="opacity-0 translate-y-2"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-2"
					>
						<PopoverPanel
							style={isMobile ? mobileStyles.panel : {}}
							ref={panelRef}
							className={`fixed right-0 top-0 bg-white shadow-xl border border-gray-100 transition-all duration-300 z-50 ${
								isMobile
									? 'w-[62%] h-full z-50'
									: 'lg:w-80 lg:absolute lg:top-full lg:mt-2.5 lg:rounded-xl'
							} ${
								isOpen
									? 'translate-x-0 opacity-100'
									: 'lg:opacity-0 lg:-translate-y-2 lg:pointer-events-none'
							} 
                        ${isFlashing ? 'animate-pulse-scale' : ''}
                        }`}
							static
						>
							<div
								className="p-4 space-y-4 h-full flex flex-col"
								onClick={(e) => e.stopPropagation()}
							>
								{/* Panel Header */}
								{isMobile && (
									<button
										onClick={toggleSidebar}
										className="absolute top-4 right-4 text-black"
										aria-label="Close"
									>
										<XMarkIcon className="h-6 w-6" />
									</button>
								)}
								<div className="flex items-center justify-between pb-2 border-b border-gray-200">
									<h3 className="text-lg font-bold text-black">
										Вашата кошничка ({getTotalUniqueProducts()})
									</h3>
								</div>

								{/* Empty State */}
								{cartItems.length === 0 ? (
									<div className="py-6 text-center">
										<p className="text-gray-400">Корпата е празна</p>
									</div>
								) : (
									<>
										{/* Items List */}
										<div className="max-h-96 overflow-y-auto pr-2 -mr-2">
											{cartItems.map((item, index) => (
												<div key={item.id} className="group relative">
													<div className="flex gap-4 py-3">
														{/* Product Image */}
														<img
															src={item.image}
															alt={item.name}
															className="w-16 h-16 object-cover rounded-lg border border-gray-200"
														/>

														{/* Product Info */}
														<div className="flex-1">
															<h4 className="font-medium text-black line-clamp-1">
																{item.name}
															</h4>
															<div className="flex items-baseline gap-2 mt-1">
																<span className="text-sm text-gray-500">
																	{item.quantity} ×{' '}
																	{Math.round(item.price * (1 - (item.discount || 0) / 100))}{' '}
																	ден.
																</span>
															</div>
														</div>

														{/* Remove Button */}
														<button
															onClick={(e) => {
																e.stopPropagation()
																decreaseQuantity(item.id)
															}}
															className="text-gray-400 hover:text-red-600 transition-colors ml-auto"
															aria-label="Remove"
														>
															<XMarkIcon className="h-5 w-5" />
														</button>
													</div>

													{/* Divider */}
													{index < cartItems.length - 1 && (
														<hr className="my-2 border-gray-100" />
													)}
												</div>
											))}
										</div>

										{/* Shipping Progress */}
										{getShippingCost() > 0 && (
											<div className="space-y-2 pt-2">
												<div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
													<div
														className="absolute left-0 h-full bg-black transition-all duration-500"
														style={{
															width: `${Math.min((subtotal / 2000) * 100, 100)}%`,
														}}
													/>
												</div>
												<p className="text-center text-xs text-gray-500">
													{getRemainingForFreeShipping().toFixed(0)} ден. до бесплатна
													достава
												</p>
											</div>
										)}

										{/* Order Summary */}
										<div className="space-y-3 pt-2">
											<div className="flex justify-between text-sm ">
												<span className="text-black">Цена:</span>
												<span className="font-medium text-black">
													{getSubtotal().toFixed(0)} ден.
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-black">Достава:</span>
												<span className="font-medium text-black">
													{getShippingCost().toFixed(0)} ден.
												</span>
											</div>
											<div className="flex justify-between pt-2 border-t border-gray-200">
												<span className="font-bold text-black">Вкупно:</span>
												<span className="font-bold text-lg text-black">
													{getTotalCost().toFixed(0)} ден.
												</span>
											</div>
										</div>

										{/* Checkout Button */}
										<button
											onClick={() => navigate('/checkout')}
											className="w-full bg-white hover:bg-black hover:text-white border border-black text-black py-3 rounded-lg font-medium transition-all"
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

const BottomLine = ({ isHome }: { isHome: boolean }) => {
	return (
		<div
			className={`w-full h-[1px] transition-colors duration-500 ${
				isHome ? 'bg-white' : 'bg-black'
			}`}
		></div>
	)
}

const Navigation = () => {
	const location = useLocation()
	const isHome = location.pathname === '/'
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	// Track window width for responsive design
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
			if (window.innerWidth > 1260) {
				setIsMobileMenuOpen(false)
			}
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false)
	}

	return (
		<header
			className={`fixed top-0 left-0 w-full z-10 md:absolute  ${
				isHome ? 'text-white' : 'text-black'
			}
			${isHome ? 'bg-transparent' : 'bg-white'}
			md:bg-transparent
			`}
		>
			<nav
				className={`flex items-stretch h-[80px] divide-x ${
					isHome ? 'divide-white' : 'divide-black'
				}`}
			>
				{/* Left Section */}
				<div className="flex-1 flex items-center px-4">
					{windowWidth <= 1260 ? (
						<button onClick={toggleMobileMenu} className="focus:outline-none">
							{isMobileMenuOpen ? (
								<XMarkIcon className="h-6 w-6" />
							) : (
								<Bars3BottomLeftIcon className="h-6 w-6" />
							)}
						</button>
					) : (
						<LeftNav />
					)}
				</div>

				{/* Center Section */}
				<div className="flex-1 flex items-center justify-center px-5 mx-5">
					<CenterNav />
				</div>

				{/* Right Section */}
				<div className="flex-1 flex items-center justify-end px-4">
					<RightNav />
				</div>
			</nav>

			{windowWidth <= 1260 && (
				<>
					<div
						className={`fixed top-0 left-0 w-4/5 max-w-xs h-screen bg-gray-900 shadow-2xl z-50 text-white overflow-hidden ${
							isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
						} transition-transform duration-300 ease-in-out`}
					>
						<div className="flex justify-end p-4">
							<button
								onClick={closeMobileMenu}
								className="p-2 hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
								aria-label="Close menu"
							>
								<XMarkIcon className="h-6 w-6" />
							</button>
						</div>

						<div className="h-[calc(100vh-64px)] overflow-y-auto pb-safe">
							<LeftNav isMobile={true} closeMenu={closeMobileMenu} />
						</div>
					</div>

					<div
						className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
						style={{
							opacity: isMobileMenuOpen ? 1 : 0,
							pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
						}}
						onClick={closeMobileMenu}
					/>
				</>
			)}

			{isMobileMenuOpen && windowWidth <= 1260 && (
				<div
					className="fixed inset-0 bg-black bg-opacity-30 z-40 animate-overlay-enter"
					onClick={closeMobileMenu}
				/>
			)}

			{/* Bottom Line */}
			<BottomLine isHome={isHome} />
		</header>
	)
}

export default Navigation
