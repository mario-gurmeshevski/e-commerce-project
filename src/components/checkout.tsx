import React, { useState } from 'react';
import axios from 'axios';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import {useCart} from "./cart/useCart.tsx";
import {useNavigate} from "react-router-dom";

export default function Checkout() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        municipality: '',
        postalCode: 0,
        phoneNumber: 0,
        email: '',
        cart: [useCart()]
    });

    const [loading, setLoading] = useState(false);
    const { cartItems, clearCart,  addToCart, decreaseQuantity  } = useCart();
    const navigate = useNavigate();
    const preciseRound= (num: number) => Math.round(num);



    const subtotal = cartItems.reduce((sum, item) => {
        const discountFactor = 1 - (item.discount || 0) / 100;
        const discountedItem = preciseRound(item.price * discountFactor)
        const itemTotal = discountedItem * item.quantity;
        return sum + preciseRound(itemTotal);
    }, 0);

    const shipping = subtotal >= 2000 ? 0 : 150;
    const total = subtotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'postalCode' || name === 'phoneNumber' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                ...formData,
                cart: {
                    items: cartItems.map(item => ({
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: Math.round(item.price * (1 - (item.discount || 0)/100)),
                        discount: item.discount || 0
                    })),
                    priceSummary: {
                        subtotal: subtotal,
                        shipping: shipping,
                        total: total
                    }
                }
            };

            const response = await axios.post(`/api/order/create`, orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Order created successfully:', response.data);

            clearCart();
            navigate('/');

        } catch (err) {
            console.error('Error creating order:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

                {/* Checkout Form */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Детали за наплата</h2>

                    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Име</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Презиме</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email адреса</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Адреса</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Град</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Општина</label>
                                    <input
                                        type="text"
                                        name="municipality"
                                        value={formData.municipality}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Поштенски Број</label>
                                    <input
                                        type="number"
                                        name="postalCode"
                                        value={formData.postalCode || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефонски Број</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="border-t pt-4 sm:pt-6">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">Начин на Наплата</h3>
                            <div className="flex items-center bg-blue-50 p-3 sm:p-4 rounded-lg">
                                <ShoppingBagIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2" />
                                <span className="font-medium text-sm sm:text-base">Плати при подигнување</span>
                            </div>
                        </div>
                        {loading ? (
                            <button
                                type="button"
                                disabled
                                className="w-full bg-gray-400 text-white py-2 sm:py-3 px-4 rounded-lg font-medium cursor-not-alowed"
                            >
                                Процесира...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 sm:py-3 px-4 rounded-lg font-medium transition-colors"
                            >
                                Потврди нарачка
                            </button>
                        )}
                    </form>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-fit mt-4 lg:mt-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Вашата Нарачка</h2>
                    <div className="space-y-4 sm:space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    decreaseQuantity(item.id);
                                                }}
                                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className="text-xs sm:text-sm text-gray-500 w-3 sm:w-4 text-center">
                                        {item.quantity}
                                    </span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(item, 1);
                                                }}
                                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                aria-label="Increase quantity"
                                                disabled={item.stock <= item.quantity}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-medium text-sm sm:text-base">
                                    {Math.round((item.price * (1 - (item.discount || 0)/100)) * item.quantity)} ден.
                                </span>
                            </div>
                        ))}

                        {/* Totals */}
                        <div className="space-y-2 sm:space-y-3 mt-4 pt-4 border-t">
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm sm:text-base">Цена</span>
                                <span className="font-medium text-sm sm:text-base">{subtotal.toFixed(0)} ден.</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm sm:text-base">Достава</span>
                                <span className="font-medium text-sm sm:text-base">{shipping.toFixed(0)} ден.</span>
                            </div>
                            <div className="flex justify-between border-t pt-3">
                                <span className="text-base sm:text-lg font-bold text-gray-900">Вкупно</span>
                                <span className="text-base sm:text-lg font-bold text-gray-900">{total.toFixed(2)} ден.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
