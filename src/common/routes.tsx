import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	Navigate,
} from 'react-router-dom'
import { useEffect } from 'react'
import {
	PAGE_TITLES,
	ROUTES as ROUTE_PATHS,
	ERROR_MESSAGES,
} from '../utils/constants.ts'
import Home from '../components/home/home.tsx'
import Navigation from '../components/common/navigation/navigation.tsx'
import Shop from '../components/shop/shop.tsx'
import ItemDetails from '../components/shop/itemDetails.tsx'
import Footer from '../components/common/footer.tsx'
import Contact from '../components/small_pages/contact.tsx'
import AboutUs from '../components/small_pages/aboutUs.tsx'
import Checkout from '../components/small_pages/checkout.tsx'
import { useCart } from '../components/cart/useCart.tsx'
import Order from '../components/shop/order.tsx'
import Terms from '../components/policy/terms.tsx'
import Privacy from '../components/policy/privacy.tsx'
import Blog from '../components/blog/blog.tsx'
import BlogDetails from '../components/blog/blogDetails.tsx'
import Health from '../components/health/health.tsx'
import HealthDetails from '../components/health/healthDetails.tsx'
import BeePollenPropolis from '../components/small_pages/beePollenPropolis.tsx'
import ErrorMessage from '../components/common/ErrorMessage.tsx'

// Main routing component that handles navigation and page-specific functionality
const AppRoutes = () => {
	const location = useLocation()
	const isHome = location.pathname === ROUTE_PATHS.HOME

	// Map routes to their corresponding page titles for dynamic title updates
	const routeTitles: Record<string, string> = {
		'/': PAGE_TITLES.HOME,
		'/shop': PAGE_TITLES.SHOP,
		'/contact': PAGE_TITLES.CONTACT,
		'/about': PAGE_TITLES.ABOUT,
		'/checkout': PAGE_TITLES.CHECKOUT,
		'/terms': PAGE_TITLES.TERMS,
		'/privacy': PAGE_TITLES.PRIVACY,
		'/blog': PAGE_TITLES.BLOG,
		'/health': PAGE_TITLES.HEALTH,
		'/pollen_propolis': PAGE_TITLES.POLLEN_PROPOLIS,
	}

	// Protected route component that ensures cart has items before showing checkout
	const ProtectedCheckout = () => {
		const { getTotalItems } = useCart()
		return getTotalItems() > 0 ? (
			<Checkout />
		) : (
			<Navigate to={ROUTE_PATHS.SHOP} replace />
		)
	}

	// Update document title based on current route
	useEffect(() => {
		const staticTitle = routeTitles[location.pathname] || PAGE_TITLES.HOME
		if (staticTitle) {
			document.title = staticTitle
		}
	}, [location.pathname])

	// Scroll to top of page when route changes
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location.pathname])

	return (
		<div className="relative min-h-screen">
			<Navigation />
			<div
				className={`${isHome ? '' : 'pt-[80px]'} ${isHome ? '' : 'pb-[150px]'}`}
			>
				<Routes>
					<Route path={ROUTE_PATHS.HOME} element={<Home />} />
					<Route path={ROUTE_PATHS.SHOP} element={<Shop />} />
					<Route path="/shop/:productName" element={<ItemDetails />} />
					<Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />
					<Route path={ROUTE_PATHS.ABOUT} element={<AboutUs />} />
					<Route path={ROUTE_PATHS.CHECKOUT} element={<ProtectedCheckout />} />
					<Route path="/order/:id" element={<Order />} />
					<Route path={ROUTE_PATHS.TERMS} element={<Terms />} />
					<Route path={ROUTE_PATHS.PRIVACY} element={<Privacy />} />
					<Route
						path={ROUTE_PATHS.POLLEN_PROPOLIS}
						element={<BeePollenPropolis />}
					/>
					<Route path={ROUTE_PATHS.BLOG} element={<Blog />} />
					<Route path="/blog/:slug" element={<BlogDetails />} />
					<Route path={ROUTE_PATHS.HEALTH} element={<Health />} />
					<Route path="/health/:slug" element={<HealthDetails />} />
					<Route
						path="*"
						element={<ErrorMessage message={ERROR_MESSAGES.PAGE_NOT_FOUND} />}
					/>
				</Routes>
			</div>
			<Footer />
		</div>
	)
}

// Wrapper component that provides routing context to the application
const AppWrapper = () => (
	<Router>
		<AppRoutes />
	</Router>
)

export default AppWrapper
