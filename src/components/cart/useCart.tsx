import { useContext } from 'react'
import { CartContext } from './cartContext.tsx'

// Custom hook to access cart functionality throughout the application
// Provides access to cart state and methods in any component
export const useCart = () => {
	const context = useContext(CartContext)
	if (!context) {
		// Ensure the hook is used within a CartProvider context
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
