import { Link, useLocation } from 'react-router-dom'
import {
	ShoppingCartIcon,
	InformationCircleIcon,
	EnvelopeIcon,
	NewspaperIcon,
	HeartIcon,
	GlobeEuropeAfricaIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import { FacebookIcon, InstagramIcon } from './socialIcons'
import bee from '/Logo.png'

interface LeftNavProps {
	isMobile?: boolean
	closeMenu?: () => void
	isHome?: boolean
}

export const LeftNav = ({
	isMobile = false,
	closeMenu = () => {},
	isHome = false,
}: LeftNavProps) => {
	const location = useLocation()
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	const isActiveLink = (path: string) => {
		if (path === '/') {
			return location.pathname === '/'
		}
		return location.pathname.startsWith(path)
	}

	const MobileLinkClass = (isActive: boolean) => {
		return `flex items-center py-4 px-3 rounded-lg transition-colors focus:outline-none min-h-[48px] ${
			isActive ? 'bg-gray-700 text-white' : 'text-gray-300 active:bg-gray-800'
		}`
	}

	const desktopLinkClass =
		'group relative text-lg px-3 py-2 transition-colors focus:outline-none min-h-[44px] flex items-center'

	const handleMouseEnter = () => setIsPopoverOpen(true)
	const handleMouseLeave = () => setIsPopoverOpen(false)

	return (
		<div
			className={`${
				isMobile
					? 'flex flex-col space-y-1 p-4 sm:p-6 w-full min-h-screen'
					: 'flex items-center gap-x-2 lg:gap-x-4 p-2 lg:p-4'
			}`}
		>
			{isMobile && (
				<div className="mb-4 sm:mb-6 pb-4 border-b border-gray-700">
					<div className="flex items-center">
						<img src={bee} alt="bee" className="h-6 sm:h-8 mr-2" />
						<span className="text-xl sm:text-2xl tracking-wide sm:tracking-widest font-thin">
							E Commerce
						</span>
					</div>
				</div>
			)}

			<Link
				to="/shop"
				className={
					isMobile ? MobileLinkClass(isActiveLink('/shop')) : `${desktopLinkClass}`
				}
				onClick={isMobile ? closeMenu : undefined}
			>
				{isMobile && <ShoppingCartIcon className="h-5 w-5 flex-shrink-0" />}
				{isMobile && <span className="pl-3 text-base sm:text-lg">Продавница</span>}
				{!isMobile && (
					<span className="relative text-sm lg:text-lg">
						Продавница
						<span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
					</span>
				)}
			</Link>

			{isMobile ? (
				<>
					<Link
						to="/blog"
						className={MobileLinkClass(isActiveLink('/blog'))}
						onClick={closeMenu}
					>
						<NewspaperIcon className="h-5 w-5 flex-shrink-0" />
						<span className="pl-3 text-base sm:text-lg">Блог</span>
					</Link>
					<Link
						to="/health"
						className={MobileLinkClass(isActiveLink('/health'))}
						onClick={closeMenu}
					>
						<HeartIcon className="h-5 w-5 flex-shrink-0" />
						<span className="pl-3 text-base sm:text-lg">Придобивки за Здравјето</span>
					</Link>
					<Link
						to="/pollen_propolis"
						className={MobileLinkClass(isActiveLink('/pollen_propolis'))}
						onClick={closeMenu}
					>
						<GlobeEuropeAfricaIcon className="h-5 w-5 flex-shrink-0" />
						<span className="pl-3 text-base sm:text-lg">Полен и Прополис</span>
					</Link>
				</>
			) : (
				<Popover
					className="relative"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<PopoverButton
						className={`${desktopLinkClass}`}
						tabIndex={0}
						aria-haspopup="true"
					>
						<span className="relative text-sm lg:text-lg">
							Вести
							<span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
						</span>
					</PopoverButton>

					<Transition show={isPopoverOpen}>
						<PopoverPanel
							className={`absolute z-10 w-max rounded-lg shadow-lg ${
								isHome ? 'bg-white text-black' : 'bg-white'
							}`}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<div className="p-1 flex flex-col min-w-[200px]">
								<Link
									to="/blog"
									className="p-3 hover:bg-gray-200 rounded-md text-sm lg:text-base"
								>
									<span className="pl-3">Блог</span>
								</Link>
								<Link
									to="/health"
									className="p-3 hover:bg-gray-200 rounded-md text-sm lg:text-base"
								>
									<span className="pl-3">Придобивки за Здравјето</span>
								</Link>
								<Link
									to="/pollen_propolis"
									className="p-3 hover:bg-gray-200 rounded-md text-sm lg:text-base"
								>
									<span className="pl-3">Полен и Прополис</span>
								</Link>
							</div>
						</PopoverPanel>
					</Transition>
				</Popover>
			)}

			<Link
				to="/about"
				className={
					isMobile ? MobileLinkClass(isActiveLink('/about')) : `${desktopLinkClass}`
				}
				onClick={isMobile ? closeMenu : undefined}
			>
				{isMobile && <InformationCircleIcon className="h-5 w-5 flex-shrink-0" />}
				{isMobile && <span className="pl-3 text-base sm:text-lg">За Нас</span>}
				{!isMobile && (
					<span className="relative text-sm lg:text-lg">
						За Нас
						<span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
					</span>
				)}
			</Link>

			<Link
				to="/contact"
				className={
					isMobile
						? MobileLinkClass(isActiveLink('/contact'))
						: `${desktopLinkClass}`
				}
				onClick={isMobile ? closeMenu : undefined}
			>
				{isMobile && <EnvelopeIcon className="h-5 w-5 flex-shrink-0" />}
				{isMobile && <span className="pl-3 text-base sm:text-lg">Контакт</span>}
				{!isMobile && (
					<span className="relative text-sm lg:text-lg">
						Контакт
						<span className="absolute left-0 -bottom-1 h-px w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
					</span>
				)}
			</Link>

			{isMobile && (
				<div className="mt-auto pt-4 sm:pt-6 border-t border-gray-700">
					<div className="flex space-x-4 justify-center">
						<a
							href="https://www.facebook.com/mario.gurmeshevski"
							className="p-3 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
							aria-label="Facebook"
						>
							<FacebookIcon isHome={true} />
						</a>
						<a
							href="https://www.instagram.com/mario.gurmeshevski"
							className="p-3 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
							aria-label="Instagram"
						>
							<InstagramIcon isHome={true} />
						</a>
					</div>
				</div>
			)}
		</div>
	)
}
