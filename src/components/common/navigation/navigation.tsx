import { useLocation } from 'react-router-dom'
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import useResponsive from '../../../common/useResponsive'
import { LeftNav } from './leftNav'
import { CenterNav } from './centerNav'
import { RightNav } from './rightNav'
import { FacebookIcon, InstagramIcon } from './socialIcons'

const Navigation = () => {
	const location = useLocation()
	const isHome = location.pathname === '/'
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const isMobile = useResponsive()

	useEffect(() => {
		if (!isMobile) {
			setIsMobileMenuOpen(false)
		}
	}, [isMobile])

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false)
	}

	return (
		<header
			className={`fixed top-0 left-0 w-full z-10 md:absolute ${
				isHome ? 'text-white' : 'text-black'
			} ${isHome ? 'bg-transparent' : 'bg-white'} md:bg-transparent`}
		>
			<nav
				className={`flex items-stretch h-[70px] sm:h-[80px] divide-x ${
					isHome ? 'divide-white' : 'divide-black'
				}`}
			>
				<div className="flex-none flex w-auto h-full px-2 sm:px-4 items-center">
					{isMobile ? (
						<button
							onClick={toggleMobileMenu}
							className="p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center outline-none focus:ring-0"
							aria-label="Toggle menu"
						>
							<Bars3BottomLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					) : (
						<LeftNav isHome={isHome} />
					)}
				</div>

				<div className="flex-1 flex items-center justify-center px-2 sm:px-4">
					<CenterNav />
				</div>

				<div className="flex-none w-12 sm:w-16 md:flex-1 flex items-center px-2 sm:px-4">
					{!isMobile ? (
						<div className="flex items-center justify-between w-full">
							<div className="flex space-x-2 lg:space-x-4">
								<a
									href="https://www.facebook.com/mario.gurmeshevski"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Facebook"
									className="p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
								>
									<FacebookIcon isHome={isHome} />
								</a>
								<a
									href="https://www.instagram.com/mario.gurmeshevski"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Instagram"
									className="p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
								>
									<InstagramIcon isHome={isHome} />
								</a>
							</div>
							<RightNav />
						</div>
					) : (
						<div className="flex items-center justify-end w-full">
							<RightNav />
						</div>
					)}
				</div>
			</nav>
			{isMobile && (
				<>
					<div
						className={`fixed top-0 left-0 w-[85%] max-w-sm h-screen bg-gray-900 shadow-2xl z-50 text-white overflow-hidden ${
							isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
						} transition-transform duration-300 ease-in-out`}
					>
						<div className="flex justify-end p-3 sm:p-4">
							<button
								onClick={closeMobileMenu}
								className="p-2 rounded-full transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
								aria-label="Close menu"
							>
								<XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
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
			<div
				className={`w-full h-[1px] transition-colors duration-500 ${
					isHome ? 'bg-white' : 'bg-black'
				}`}
			/>
		</header>
	)
}

export default Navigation
