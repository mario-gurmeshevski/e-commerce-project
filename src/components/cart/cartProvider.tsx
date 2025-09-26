import { ReactNode, useEffect, useState } from 'react'
import { Honey } from '../../interfaces/honey.ts'
import { CartContext, CartItem } from './cartContext.tsx'

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const storedCart = localStorage.getItem('cart')
		if (storedCart) {
			try {
				return JSON.parse(storedCart)
			} catch (error) {
				console.error('Failed to parse cart data from localStorage:', error)
				localStorage.removeItem('cart') // Clear corrupted data
				return []
			}
		}
		return []
	})

	useEffect(() => {
		try {
			localStorage.setItem('cart', JSON.stringify(cartItems))
		} catch (error) {
			console.error('Failed to save cart data to localStorage:', error)
		}
	}, [cartItems])

	const clearCart = () => {
		setCartItems([])
	}

	const addToCart = (product: Honey, quantity: number) => {
		setCartItems((prev) => {
			const existing = prev.find((item) => item.id === product.id)
			const availableQuantity = product.stock

			if (existing) {
				const potentialQuantity = existing.quantity + quantity
				const newQuantity = Math.min(potentialQuantity, availableQuantity)

				if (newQuantity > existing.quantity) {
					return prev.map((item) =>
						item.id === product.id ? { ...item, quantity: newQuantity } : item
					)
				}
				return prev
			}

			if (availableQuantity > 0) {
				const initialQuantity = Math.min(quantity, availableQuantity)
				return [...prev, { ...product, quantity: initialQuantity }]
			}

			return prev
		})
	}

	const removeFromCart = (productId: string) => {
		setCartItems((prev) => prev.filter((item) => item.id !== productId))
	}

	const decreaseQuantity = (productId: string) => {
		setCartItems((prev) =>
			prev
				.map((item) =>
					item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
				)
				.filter((item) => item.quantity > 0)
		)
	}

	const getTotalItems = () =>
		cartItems.reduce((sum, item) => sum + item.quantity, 0)

	const getTotalUniqueProducts = () => cartItems.length

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				decreaseQuantity,
				getTotalItems,
				getTotalUniqueProducts,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
