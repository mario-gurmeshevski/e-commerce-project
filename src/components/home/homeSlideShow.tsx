import { useEffect, useState } from 'react'
import honeyImage1 from '../../images/slideShow/premium_honey_with_black_background_and_cinemon.jpg'
import honeyImage2 from '../../images/slideShow/honey_with_a_grey_background.jpg'
import honeyImage3 from '../../images/slideShow/bees_on_a_comb.jpg'
import honeyImage4 from '../../images/slideShow/honey_comb_holding.jpg'
import honeyImage5 from '../../images/slideShow/makmela_brand_close_up.jpg'

const HomeSlideShow = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const images = [
		honeyImage5,
		honeyImage2,
		honeyImage1,
		honeyImage3,
		honeyImage4,
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
		}, 5000)

		return () => clearInterval(interval)
	}, [images.length])

	return (
		<div className="relative w-full h-[100vh] z-0 overflow-hidden">
			{images.map((image, index) => (
				<div
					key={index}
					className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
					style={{
						backgroundImage: `url(${image})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						opacity: index === currentIndex ? 1 : 0,
					}}
				></div>
			))}
		</div>
	)
}

export default HomeSlideShow
