import {Link, useLocation, useNavigate} from "react-router-dom";
import {useCart} from "../cart/useCart.tsx";
import { ShoppingCartIcon, Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {useEffect, useRef, useState} from "react";

const LeftNav = ({isMobile = false, closeMenu = () => {}}) => {
    return (
        <div className={`${isMobile ? "flex flex-col space-y-6 items-start" : "flex justify-between items-center w-full p-6"}`}>
            <Link
                to="/shop"
                className="group relative"
                onClick={isMobile ? closeMenu : undefined}
            >
                Продавница
                <div className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link
                to="/beehappy"
                className="group relative"
                onClick={isMobile ? closeMenu : undefined}
            >
                BeeHappy
                <div className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link
                to="/about"
                className="group relative"
                onClick={isMobile ? closeMenu : undefined}
            >
                За Нас
                <div className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link
                to="/contact"
                className="group relative"
                onClick={isMobile ? closeMenu : undefined}
            >
                Контакт
                <div className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full"></div>
            </Link>
        </div>
    );
};

const CenterNav = () => {
    return (
        <div className="flex justify-center">
            <Link to="/" className="text-center text-lg tracking-widest">
                МАКМЕЛА
            </Link>
        </div>
    );
};

const RightNav = () => {
    const { cartItems, getTotalItems, getTotalUniqueProducts, decreaseQuantity } = useCart();
    const [isFlashing, setIsFlashing] = useState(false);
    const [cartActive, setCartActive] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const hoverTimeout = useRef<number | null>(null);
    const navigate = useNavigate();
    const prevTotalRef = useRef(getTotalItems());
    const location = useLocation();
    const preciseRound = (num: number) => Math.round(num);

    useEffect(() => {
        const currentTotal = getTotalItems();
        const isShopPage = location.pathname.startsWith('/shop');
        const shouldFlash = currentTotal > prevTotalRef.current && isShopPage;

        if (shouldFlash) {
            setIsFlashing(true);
            const timeout = setTimeout(() => setIsFlashing(false), 1000);
            return () => {
                clearTimeout(timeout);
                setIsFlashing(false);
            };
        }

        prevTotalRef.current = currentTotal;
    }, [getTotalItems(), location.pathname]);

    const getSubtotal = () =>
        cartItems.reduce((sum, item) => {
            const discountFactor = 1 - (item.discount || 0) / 100;
            const discountedItem = preciseRound(item.price * discountFactor)
            return sum + Math.round(discountedItem * item.quantity);
        }, 0);

    const getShippingCost = () => {
        const subtotal = getSubtotal();
        return subtotal >= 2000 ? 0 : 150;
    };

    const getTotalCost = () => {
        return getSubtotal() + getShippingCost();
    };

    const getRemainingForFreeShipping = () => {
        const subtotal = getSubtotal();
        return Math.max(2000 - subtotal, 0);
    };

    const handleButtonMouseEnter = () => {
        setIsDropdownVisible(true);
        setCartActive(true);
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
    };

    const handleButtonMouseLeave = () => {
        setCartActive(false);
        hoverTimeout.current = window.setTimeout(() => {
            setIsDropdownVisible(false);
        }, 300);
    };

    const handleDropdownMouseEnter = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
        setIsDropdownVisible(cartActive);
        if (!cartActive) {
            setIsDropdownVisible(false);
        }
    };


    const handleDropdownMouseLeave = () => {
        hoverTimeout.current = window.setTimeout(() => {
            setIsDropdownVisible(false);
            setCartActive(false);
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (hoverTimeout.current) {
                clearTimeout(hoverTimeout.current);
            }
        };
    }, [])

    useEffect(() => {
        if (!cartActive) {
            setIsDropdownVisible(false);
        }
    }, [cartActive]);

    return (
        <div className="relative flex items-center group">
            {/* Cart Button Container */}
            <div
                className="relative"
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
            >
                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                    onClick={() => getTotalItems() > 0 && navigate("/checkout")}
                    aria-label="Cart"
                >
                    <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
                    <span className={`absolute -top-1 -right-1 bg-black text-white rounded-full px-2 py-0.5 text-xs font-medium 
                        ${isFlashing ? 'animate-pulse-scale' : ''}`}>
                        {getTotalItems()}
                    </span>
                </button>
            {/* Cart Panel */}
                <div
                    className={`absolute right-0 top-full w-80 bg-white shadow-xl rounded-xl border border-gray-100 transition-all duration-300 ${
                        (isDropdownVisible || isFlashing)
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-2'
                    }`}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                >
                <div className="p-4 space-y-4">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900">
                            Вашата кошничка ({getTotalUniqueProducts()})
                        </h3>
                    </div>

                    {/* Empty State */}
                    {cartItems.length === 0 ? (
                        <div className="py-6 text-center">
                            <p className="text-gray-400">Корпата е празна</p>
                        </div>
                    ) : (
                        <>
                            {/* Items List */}
                            <div className="max-h-96 overflow-y-auto pr-2 -mr-2">
                                {cartItems.map((item, index) => (
                                    <div key={item.id} className="group relative">
                                        <div className="flex gap-4 py-3">
                                            {/* Product Image */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                            />

                                            {/* Product Info */}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 line-clamp-1">
                                                    {item.name}
                                                </h4>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <span className="text-sm text-gray-500">
                                                        {item.quantity} × {preciseRound(item.price * (1 - (item.discount || 0) / 100))} ден.
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors ml-auto"
                                                aria-label="Remove"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </div>

                                        {/* Divider */}
                                        {index < cartItems.length - 1 && (
                                            <hr className="my-2 border-gray-100" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Shipping Progress */}
                            {getShippingCost() > 0 && (
                                <div className="space-y-2 pt-2">
                                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="absolute left-0 h-full bg-black transition-all duration-500"
                                            style={{ width: `${Math.min((getSubtotal() / 2000) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-center text-xs text-gray-500">
                                        {getRemainingForFreeShipping().toFixed(0)} ден. до бесплатна достава
                                    </p>
                                </div>
                            )}

                            {/* Order Summary */}
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between text-sm">
                                    <span>Цена:</span>
                                    <span className="font-medium">{getSubtotal().toFixed(0)} ден.</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Достава:</span>
                                    <span className="font-medium">{getShippingCost().toFixed(0)} ден.</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-gray-200">
                                    <span className="font-bold">Вкупно:</span>
                                    <span className="font-bold text-lg text-black">
                                        {getTotalCost().toFixed(0)} ден.
                                    </span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full bg-white hover:bg-black hover:text-white border border-black text-black py-3 rounded-lg font-medium transition-all"
                            >
                                Кон плаќање
                            </button>
                        </>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

const BottomLine = ({ isHome }: { isHome: boolean }) => {
    return (
        <div
            className={`w-full h-[1px] transition-colors duration-500 ${
                isHome ? "bg-white" : "bg-black"
            }`}
        ></div>
    );
};

const Navigation = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Track window width for responsive design
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 1260) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`absolute top-0 left-0 w-full z-10 ${
                isHome ? "text-white" : "text-black"
            }`}
        >
            <nav
                className={`flex items-stretch h-[80px] divide-x ${
                    isHome ? "divide-white" : "divide-black"
                }`}
            >
                {/* Left Section */}
                <div className="flex-1 flex items-center px-4">
                    {windowWidth <= 1260 ? (
                        <button onClick={toggleMobileMenu} className="focus:outline-none">
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3BottomLeftIcon className="h-6 w-6" />
                            )}
                        </button>
                    ) : (
                        <LeftNav />
                    )}
                </div>

                {/* Center Section */}
                <div className="flex-1 flex items-center justify-center px-4">
                    <CenterNav />
                </div>

                {/* Right Section */}
                <div className="flex-1 flex items-center justify-end px-4">
                    <RightNav />
                </div>
            </nav>

            {/* Mobile Menu - Slide in from left */}
            {windowWidth <= 1260 && (
                <div
                    className={`fixed top-[80px] left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } ${isHome ? "text-black" : "text-black"}`}
                >
                    <div className="p-6">
                        <LeftNav isMobile={true} closeMenu={closeMobileMenu} />
                    </div>
                </div>
            )}

            {/* Overlay when mobile menu is open */}
            {isMobileMenuOpen && windowWidth <= 1260 && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Bottom Line */}
            <BottomLine isHome={isHome} />
        </header>
    );
};

export default Navigation;
