import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IOrder } from '../interfaces/order';

export default function Order() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<IOrder | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(
                    `/api/order/${id}`
                );
                setOrder(response.data);
            } catch (err) {
                setError('Order not found or access denied');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    useEffect(() => {
        if (order) {
            document.title = `Order #${order.orderId} - Makmela`;
        } else if (error) {
            document.title = 'Order not Found - Makmela';
        }
    }, [order, error]);

    const handleCancel = async () => {
        if (!order) return;

        try {
            await axios.delete(
                `/api/order/${order.id}`
            );
            navigate('/', {
                state: {
                    showCancelSuccess: true,
                    message: 'Your order has been successfully canceled'
                }
            });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(err.response?.data?.message || 'Failed to delete order');
            } else {
                alert('Failed to delete order');
            }
        }
    };

    if (isLoading) return <div className="text-center p-4 sm:p-8 min-h-[200px] flex items-center justify-center">Loading...</div>;
    if (error) return <div className="text-red-500 p-4 sm:p-8 text-center min-h-[200px] flex items-center justify-center">{error}</div>;
    if (!order) return <div className="p-4 sm:p-8 text-center min-h-[200px] flex items-center justify-center">Order not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6">
            <div className="border rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold mb-2">
                            Order #{order.orderId}
                        </h1>
                        <p className={`text-sm ${order.status ? 'text-green-600' : 'text-yellow-400'}`}>
                            Status: {order.status ? 'Ordered' : 'Pending'}
                        </p>
                    </div>

                    {!order.status && (
                        <button
                            onClick={handleCancel}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 self-start"
                        >
                            Cancel Order
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div className="bg-gray-50 p-3 rounded-md">
                        <h2 className="font-semibold text-sm sm:text-base mb-2">Доставни Информации</h2>
                        <div className="space-y-1 text-sm sm:text-base">
                            <p>{order.firstName} {order.lastName}</p>
                            <p>{order.address}</p>
                            <p>{order.city}, {order.municipality}</p>
                            <p>Postal Code: {order.postalCode}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                        <h2 className="font-semibold text-sm sm:text-base mb-2">Контактни Информации</h2>
                        <div className="space-y-1 text-sm sm:text-base">
                            <p>Phone: {order.phoneNumber}</p>
                            <p>Email: {order.email}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold text-sm sm:text-base mb-4">Order Items</h2>
                    <div className="space-y-4">
                        {order.cart.items.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2 gap-2">
                                <div>
                                    <p className="font-medium text-sm sm:text-base">{item.name}</p>
                                    <p className="text-xs sm:text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <p className="text-sm sm:text-base">
                                    {(item.price * item.quantity).toFixed(0)} ден.
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 text-sm sm:text-base">
                        {/* Subtotal */}
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{order.cart.priceSummary.subtotal.toFixed(0)} ден.</span>
                        </div>

                        {/* Shipping */}
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>{order.cart.priceSummary.shipping.toFixed(0)} ден.</span>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between font-semibold mt-2 text-base sm:text-lg">
                            <span>Total:</span>
                            <span>{order.cart.priceSummary.total.toFixed(2)} ден.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
