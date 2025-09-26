import { createContext } from 'react'
import { Honey } from '../../interfaces/honey'

// CartItem extends Honey type with quantity property
// Represents an item in the shopping cart with its quantity
export type CartItem = Honey & { quantity: number }

// Defines the interface for the cart context
// Provides methods and data for managing the shopping cart across components
export interface CartContextType {
	// Current items in the shopping cart with their quantities
	cartItems: CartItem[]
	// Add a product to cart or update quantity if already exists
	addToCart: (product: Honey, quantity: number) => void
	// Remove an item completely from the cart
	removeFromCart: (productId: string) => void
	// Decrease quantity by 1, remove if quantity reaches 0
	decreaseQuantity: (productId: string) => void
	// Get total number of items (counting quantities)
	getTotalItems: () => number
	// Get number of unique products in cart (ignoring quantities)
	getTotalUniqueProducts: () => number
	// Clear all items from the cart
	clearCart: () => void
}

// Cart Context for sharing cart state across the application
// Must be wrapped with CartProvider for proper functionality
export const CartContext = createContext<CartContextType>({} as CartContextType)
