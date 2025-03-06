import { createContext, useState, useEffect, ReactNode } from "react";
import { Honey } from "../../interfaces/honey";

type CartItem = Honey & { quantity: number };

export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Honey, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    getTotalItems: () => number;
    getTotalUniqueProducts: () => number;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const clearCart = () => {
        setCartItems([]);
    };

    const addToCart = (product: Honey, quantity: number) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const decreaseQuantity = (productId: string) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const getTotalItems = () =>
        cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const getTotalUniqueProducts = () => cartItems.length;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                decreaseQuantity,
                getTotalItems,
                getTotalUniqueProducts,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
