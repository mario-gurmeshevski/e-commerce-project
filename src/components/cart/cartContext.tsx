import { createContext } from 'react'
import { Honey } from '../../interfaces/honey'

export type CartItem = Honey & { quantity: number }

export interface CartContextType {
	cartItems: CartItem[]
	addToCart: (product: Honey, quantity: number) => void
	removeFromCart: (productId: string) => void
	decreaseQuantity: (productId: string) => void
	getTotalItems: () => number
	getTotalUniqueProducts: () => number
	clearCart: () => void
}

export const CartContext = createContext<CartContextType>({} as CartContextType)
