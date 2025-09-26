import { Link } from 'react-router-dom'
import bee from '/Logo.png'

export const CenterNav = () => {
	return (
		<Link to="/" className="text-center flex items-center justify-center">
			<img
				src={bee}
				alt="bee"
				className="h-5 sm:h-6 md:h-8 lg:h-10 xl:h-12 mr-1 sm:mr-2 flex-shrink-0"
			/>
			<span className="text-2xl sm:text-4xl md:text-3xl lg:text-3xl xl:text-5xl tracking-widest sm:tracking-widest font-thin">
				E Commerce
			</span>
		</Link>
	)
}
