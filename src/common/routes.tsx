import {BrowserRouter as Router, Routes, Route, useLocation, Navigate} from "react-router-dom";
import { useEffect } from "react";
import Home from "../components/home/home.tsx";
import Navigation from "../components/common/navigation.tsx";
import Shop from "../components/shop/shop.tsx";
import ItemDetails from "../components/shop/itemDetails.tsx";
import NotFound from "../components/common/notFound.tsx";
import Footer from "../components/common/footer.tsx";
import Contact from "../components/contact.tsx";
import AboutUs from "../components/aboutUs.tsx";
import Checkout from "../components/checkout.tsx";
import {useCart} from "../components/cart/useCart.tsx";
import Order from "../components/order.tsx";
import Terms from "../components/policy/terms.tsx";
import Privacy from "../components/policy/privacy.tsx";

const AppRoutes = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";


    const routeTitles: Record<string, string> = {
        "/": "Home - Makmela",
        "/shop": "Shop - Makmela",
        "/contact": "Contact - Makmela",
        "/about": "About Us - Makmela",
        "/checkout": "Checkout - Makmela",
        "/terms": "Terms - Makmela",
        "/privacy": "Privacy - Makmela",
    };

    const ProtectedCheckout = () => {
        const { getTotalItems } = useCart();
        return getTotalItems() > 0 ? <Checkout /> : <Navigate to="/shop" replace />;
    };

    const useDynamicTitle = () => {
        const location = useLocation();

        useEffect(() => {
            const path = location.pathname;

            // Handle order IDs
            if (path.startsWith("/order/")) {
                const orderId = path.split("/order/")[1];
                document.title = `Order #${orderId} - Makmela`;
            }
            // Handle product names
            else if (path.startsWith("/shop/")) {
                const storedItem = sessionStorage.getItem('currentItem');
                const item = location.state?.item || (storedItem ? JSON.parse(storedItem) : null);

                if (item) {
                    document.title = `${item.name} - Makmela`;
                } else {
                    const productRename = path.split("/shop/")[1];
                    const formattedName = decodeURIComponent(productRename)
                        .replace(/-/g, ' ')
                        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                    document.title = `${formattedName} - Makmela`;
                }
            }
            else {
                document.title = routeTitles[path] || "Makmela";
            }
        }, [location]);
    };
    useDynamicTitle();

    return (
        <div className="relative min-h-screen">
            <Navigation />
            <div className={`${isHome ? "" : "pt-[80px]"} ${isHome ? "":"pb-[150px]"}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/:productName" element={<ItemDetails />} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/checkout" element={<ProtectedCheckout />} />
                    <Route path="/order/:id" element={<Order />} />
                    <Route path="/terms" element={<Terms/>} />
                    <Route path="/privacy" element={<Privacy/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <AppRoutes />
    </Router>
);

export default AppWrapper;
