import { useEffect, useState } from 'react'
import honeyImage1 from '../../images/slideShow/image1.jpg'
import honeyImage2 from '../../images/slideShow/image2.jpg'
import honeyImage3 from '../../images/slideShow/image3.jpg'
import honeyImage4 from '../../images/slideShow/image4.jpg'

const HomeSlideShow = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const images = [honeyImage1, honeyImage2, honeyImage4, honeyImage3]

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
