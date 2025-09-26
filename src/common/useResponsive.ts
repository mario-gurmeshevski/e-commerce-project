import { useState, useEffect } from 'react'

const useResponsive = (breakpoint = 768) => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint)

	useEffect(() => {
		const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)
		const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches)
		setIsMobile(mediaQuery.matches)
		mediaQuery.addEventListener('change', handleResize)
		return () => mediaQuery.removeEventListener('change', handleResize)
	}, [breakpoint])

	return isMobile
}

export default useResponsive
