import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
	const location = useLocation()
	const isHome = location.pathname === '/'

	return (
		<footer
			className={`absolute bottom-0 left-0 w-full text-sm py-4 z-0 ${
				isHome ? 'text-white' : 'text-gray-600'
			}`}
		>
			<hr className={`mb-4 md:mb-8 ${isHome ? 'border-white' : 'border-black'}`} />
			<div className=" px-4 md:px-8  flex flex-col items-center  space-y-4">
				{/* Left and Right Sections */}
				<div className="w-full flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					{/* Left Section */}
					<div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
						<p className="text-xs sm:text-sm">
							Проверете ги нашите
							<Link
								to="/terms"
								className={`hover:text-gray-300 ${
									isHome ? 'text-white' : 'text-black'
								}`}
							>
								Услови и Правила
							</Link>
							и нашата
						</p>
						<Link
							to="/privacy"
							className={`text-xs sm:text-sm hover:text-gray-300 ${
								isHome ? 'text-white' : 'text-black'
							}`}
						>
							Политика на Приватност
						</Link>
					</div>

					{/* Right Section */}
					<div className="flex flex-col items-center md:items-end space-y-1 text-center md:text-right">
						<p className="text-xs sm:text-sm">
							© BeeHappy-Makmela is a registered Trademark.
						</p>
						<p className="text-xs sm:text-sm">All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
