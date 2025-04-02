import {Link, useLocation, useNavigate} from "react-router-dom";
import {useCart} from "../cart/useCart.tsx";
import { ShoppingCartIcon, Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {Popover, PopoverButton, PopoverPanel, Transition} from '@headlessui/react';
import bee from '/Logo.png';




const LeftNav = ({isMobile = false, closeMenu = () => {}}) => {
    return (
        <div className={`${isMobile ? "flex flex-col space-y-6 items-start bg-opacity-5" : "flex justify-between items-center w-full p-6"}`}>
            <Link
                to="/shop"
                className="group relative"
                onClick={isMobile ? closeMenu : undefined}
            >
                Продавница
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
            <Link to="/" className="text-center flex items-center">
                <img src={bee} alt="bee" className="h-7 md:h-12 mr-2"/>                
                <span className={"text-2xl md:text-4xl tracking-widest font-thin"}>МАКМЕЛА</span>
            </Link>
    );
};

const RightNav = () => {
    const { cartItems, getTotalItems, getTotalUniqueProducts, decreaseQuantity } = useCart();
    const [subtotal, setSubtotal] = useState(Number);
    const [isFlashing, setIsFlashing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const navigate = useNavigate();
    const prevTotalRef = useRef(getTotalItems());
    const location = useLocation();
    const triggerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const isHome = location.pathname === "/";
    const preciseRound = (num: number) => Math.round(num);
    const isOpenRef = useRef(isOpen);
    const totalItems = useMemo(() => getTotalItems(), [getTotalItems]);


    const mobileStyles = {
        panel: {
            width: '62%',
            height: '100vh',
            borderRadius: 0,
            top: 0,
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                },
        content: {
            padding: '1rem',
            overflowY: 'auto'
        }
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);



    useEffect(() => {
        if(location.pathname === '/checkout'){
            setIsFlashing(false);
            setIsOpen(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isOpen) {
            const handleClickOutside = (event: MouseEvent) => {
                const clickedElement = event.target as Node;
                const panelNode = panelRef.current;
                const triggerNode = triggerRef.current;

                const isOutside = (!panelNode?.contains(clickedElement) &&
                    !triggerNode?.contains(clickedElement));

                if (isOutside) {
                    setIsOpen(false);
                    clearTimeout(timeoutRef.current);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, isMobile]);

    useLayoutEffect(() => {
        const currentTotal = totalItems;
        const shouldFlash = currentTotal > prevTotalRef.current
            && location.pathname.startsWith('/shop')
            && !isMobile;

        if (shouldFlash) {
            setIsOpen(true);
            setIsFlashing(true);

            const flashTimeout = setTimeout(() => setIsFlashing(false), 500);
            const closeTimeout = setTimeout(() => {
                if (isOpenRef.current) {
                    setIsOpen(false);
                }
            }, 2000);

            return () => {
                clearTimeout(flashTimeout);
                clearTimeout(closeTimeout);
                setIsFlashing(false);
            };
        }

        prevTotalRef.current = currentTotal;
    }, [totalItems, isMobile,location.pathname]);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);


    const clearTimeout = (timeoutId?: ReturnType<typeof setTimeout> | null) => {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
        } else if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleMouseEnter = () => {
        if (location.pathname === '/checkout') return;

        clearTimeout();
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        clearTimeout();
        timeoutRef.current = window.setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    useEffect(() => {
        return () => clearTimeout();
    }, []);

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

    useEffect(() => {
        setSubtotal(getSubtotal());
    }, [cartItems]);

    const getRemainingForFreeShipping = () => {
        const subtotal = getSubtotal();
        return Math.max(2000 - subtotal, 0);
    };

    const toggleSidebar = () => {
        if (location.pathname === '/checkout') return;
        setIsOpen(!isOpen)
    }

    return (
        <div className="relative flex items-center group">
            <Popover className="relative">
                <div
                    ref={triggerRef}
                    onMouseEnter={!isMobile ? handleMouseEnter : undefined}
                    onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                    onClick={isMobile ? toggleSidebar : undefined}
                >
                    <PopoverButton
                        className={`p-2 rounded-full ${isHome ? 'hover:bg-gray-800 hover:bg-opacity-10' : 'hover:bg-gray-50'} transition-colors relative`}
                        onClick={(e) => {
                            if (getTotalItems() > 0) {
                                e.preventDefault();
                                if(!isMobile){
                                navigate("/checkout");
                            }
                        }}}
                        aria-label="Cart"
                    >
                        <ShoppingCartIcon
                            className={`h-6 w-6 ${isHome ? 'text-white' : 'text-black'}`}
                        />
                        <span className={`absolute -top-1 -right-1  bg-black text-white rounded-full px-2 py-0.5 text-xs font-medium
                                ${isFlashing ? 'animate-pulse-scale' : ''}`}>
                                {getTotalItems()}
                        </span>
                    </PopoverButton>

                    <Transition
                        show={isOpen}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 translate-y-2"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-2"
                    >
                    <PopoverPanel
                        style={isMobile ? mobileStyles.panel : {}}
                        ref={panelRef}
                        className={`fixed right-0 top-0 bg-white shadow-xl border border-gray-100 transition-all duration-300 z-50 ${
                            isMobile
                                ? 'w-[62%] h-full z-50'
                                : 'lg:w-80 lg:absolute lg:top-full lg:mt-2.5 lg:rounded-xl'
                        } ${
                            isOpen
                                ? 'translate-x-0 opacity-100'
                                : 'lg:opacity-0 lg:-translate-y-2 lg:pointer-events-none'
                        } 
                        ${isFlashing ? 'animate-pulse-scale' : ''}
                        }`}
                        static
                    >
                        <div className="p-4 space-y-4 h-full flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Panel Header */}
                            {isMobile && (
                                <button
                                    onClick={toggleSidebar}
                                    className="absolute top-4 right-4 text-black"
                                    aria-label="Close"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            )}
                            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                                <h3 className="text-lg font-bold text-black">
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
                                                        <h4 className="font-medium text-black line-clamp-1">
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
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            decreaseQuantity(item.id);
                                                        }}
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
                                                    style={{
                                                        width: `${Math.min((subtotal / 2000) * 100, 100)}%`,
                                                    }}
                                                />
                                            </div>
                                            <p className="text-center text-xs text-gray-500">
                                                {getRemainingForFreeShipping().toFixed(0)} ден. до бесплатна достава
                                            </p>
                                        </div>
                                    )}

                                    {/* Order Summary */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex justify-between text-sm ">
                                            <span className="text-black">Цена:</span>
                                            <span className="font-medium text-black">{getSubtotal().toFixed(0)} ден.</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-black">Достава:</span>
                                            <span className="font-medium text-black">{getShippingCost().toFixed(0)} ден.</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-gray-200">
                                            <span className="font-bold text-black">Вкупно:</span>
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
                    </PopoverPanel>
                    </Transition>
                </div>
            </Popover>
        </div>
    );
}

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
                <div className="flex-1 flex items-center justify-center px-5 mx-5">
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
                    className={`fixed top-0 left-0 w-64 h-screen bg-white shadow-lg z-50 text-black ${
                        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeMobileMenu}
                        className="absolute top-4 left-4 text-black"
                        aria-label="Close"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>

                    {/* Navigation Content */}
                    <div className="mt-16 p-6">
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
