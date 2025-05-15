import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	Navigate,
} from 'react-router-dom'
import { useEffect } from 'react'
import Home from '../components/home/home.tsx'
import Navigation from '../components/common/navigation.tsx'
import Shop from '../components/shop/shop.tsx'
import ItemDetails from '../components/shop/itemDetails.tsx'
import NotFound from '../components/common/notFound.tsx'
import Footer from '../components/common/footer.tsx'
import Contact from '../components/contact.tsx'
import AboutUs from '../components/aboutUs.tsx'
import Checkout from '../components/checkout.tsx'
import { useCart } from '../components/cart/useCart.tsx'
import Order from '../components/order.tsx'
import Terms from '../components/policy/terms.tsx'
import Privacy from '../components/policy/privacy.tsx'
import Blog from '../components/blog/blog.tsx'
import BlogDetails from '../components/blog/blogDetails.tsx'
import Health from '../components/health/health.tsx'
import HealthDetails from '../components/health/healthDetails.tsx'

const AppRoutes = () => {
	const location = useLocation()
	const isHome = location.pathname === '/'

	const routeTitles: Record<string, string> = {
		'/': 'Home - Makmela',
		'/shop': 'Shop - Makmela',
		'/contact': 'Contact - Makmela',
		'/about': 'About Us - Makmela',
		'/checkout': 'Checkout - Makmela',
		'/terms': 'Terms - Makmela',
		'/privacy': 'Privacy - Makmela',
		'/blog': 'Blog - Makmela',
		'/health': 'Health - Makmela',
	}

	const ProtectedCheckout = () => {
		const { getTotalItems } = useCart()
		return getTotalItems() > 0 ? <Checkout /> : <Navigate to="/shop" replace />
	}

	useEffect(() => {
		const staticTitle = routeTitles[location.pathname]
		if (staticTitle) {
			document.title = staticTitle
		}
	}, [location.pathname])

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
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/shop/:productName" element={<ItemDetails />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/checkout" element={<ProtectedCheckout />} />
					<Route path="/order/:id" element={<Order />} />
					<Route path="/terms" element={<Terms />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:slug" element={<BlogDetails />} />
					<Route path="/health" element={<Health />} />
					<Route path="/health/:slug" element={<HealthDetails />} />
					<Route path="/api/*" element={<Navigate to="/not-found" replace />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			<Footer />
		</div>
	)
}

const AppWrapper = () => (
	<Router>
		<AppRoutes />
	</Router>
)

export default AppWrapper
