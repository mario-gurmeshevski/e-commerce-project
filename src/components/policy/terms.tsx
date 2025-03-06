import { ClipboardIcon } from '@heroicons/react/24/outline';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <header className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 bg-clip-text">
                        Terms and Conditions
                    </h2>
                    <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <ClipboardIcon className="w-4 h-4 text-gray-500" />
                        <span>Effective Since October 2021</span>
                    </div>
                </header>

                <div className="space-y-12">
                    {/* Delivery Deadline */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Delivery deadline
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>Delivery time is up to 5 working days from the moment of payment confirmation.</p>
                            <div className="p-4 rounded-lg border">
                                <p><span className="font-semibold">BeeHappy-Makmela</span> reserves the right to extend the delivery time by prior agreement with the buyer.</p>
                            </div>
                            <p>Delivery is made only on the territory of the Republic of North Macedonia.</p>
                        </div>
                    </div>

                    {/* Taking the Order */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>

                            Taking the order
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>Prior to the delivery of the product, the buyer will be contacted by phone, on the phone number left for contact, to confirm the date and time of delivery.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>The prices are valid for the cities throughout the Republic of North Macedonia.</p>
                                    <p className="mt-2">Delivery is done through our delivery service or through external partners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Shipping Fees */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Shipping fees
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6">
                                    <h4 className="font-medium mb-3 text-gray-700">Free Shipping</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                            Skopje: Free
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                            Other towns: Free over 2,000 denars
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-medium mb-3 text-gray-700">Paid Shipping</h4>
                                    <p className="flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        Other towns under 2,000 denars: 150 denars
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Receiving Products */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Receiving the products
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>Each buyer is obliged when checking the product/s, to check for possible damage during the transport, and if it is more than one product, to check if any product is missing.</p>
                            <p>If the product is delivered damaged, or a certain product is missing from the order, the buyer should inform us immediately, in order to take measures to eliminate the unintentional error.</p>
                            <p>In this case, the cost of replacing the product shall be borne by us.</p>
                        </div>
                    </div>

                    {/* Returns and Exchanges */}
                    <div className="py-8 border-b border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Returns and exchanges of products
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>If the buyer wants to replace the product, he is obliged to keep it undamaged, unpacked and unused together with all attached documents. If there is a delay in delivery by the company engaged to perform the delivery, BeeHappy-Makmela cannot take any responsibility.</p>
                            <p>In case the buyer wants to return the product, not through our fault or the fault of the supplier, and wants the refunded amount to be returned to the product, then the shipping cost will be deducted from the final amount.</p>
                        </div>
                    </div>

                    {/* Other Shipping Info */}
                    <div className="py-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>

                            Other shipping information
                        </h3>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>Deliveries on Saturday after 4 pm, on Sundays and on public holidays are not made.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>If the order is made after 5 pm, it will be checked by us the next working day, and after receiving confirmation of the successful transaction - payment, the delivery period begins.</p>
                                </div>
                            </div>
                            <p>If the order is made on Friday after 4 pm, Saturday, Sunday or on a non-working day, this procedure starts from the first following working day.</p>
                            <p>Weekends and non-working days are not included in the delivery deadline.</p>
                            <p>The delivery of the product is done at the specified delivery address by the buyer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
