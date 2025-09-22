import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, Truck, Wallet } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const { cartTotal } = useCart();
    
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Checkout</h1>
                    <p className="text-taiba-grey text-center mb-8 flex items-center justify-center space-x-2">
                        <Lock size={16} />
                        <span>Secure Payment Gateway</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shipping & Payment Forms */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-6">1. Shipping Address</h2>
                        <form className="space-y-4">
                            <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                            <input type="text" placeholder="Address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                            <div className="flex space-x-4">
                                <input type="text" placeholder="City" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                                <input type="text" placeholder="Postal Code" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                            </div>
                            <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                        </form>

                        <h2 className="text-xl font-semibold mt-8 mb-6">2. Payment Method</h2>
                        <div className="space-y-3">
                            {[
                                { name: 'Credit Card', icon: CreditCard },
                                { name: 'Cash on Delivery', icon: Truck },
                                { name: 'Wallet', icon: Wallet }
                            ].map(method => (
                                <label key={method.name} className="flex items-center space-x-3 p-4 border rounded-lg has-[:checked]:bg-taiba-pistachio/20 has-[:checked]:border-taiba-pistachio transition-all">
                                    <input type="radio" name="payment" className="form-radio text-taiba-purple focus:ring-taiba-purple" />
                                    <method.icon className="text-taiba-grey" />
                                    <span>{method.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg h-fit">
                        <h2 className="text-xl font-semibold mb-6">3. Order Summary</h2>
                        <div className="space-y-3 border-b pb-4">
                            <div className="flex justify-between">
                                <span>Paracetamol 500mg x 2</span>
                                <span>OMR 11.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Vitamin D3 x 1</span>
                                <span>OMR 12.75</span>
                            </div>
                        </div>
                        <div className="space-y-3 mt-4">
                            <div className="flex justify-between text-taiba-grey">
                                <span>Subtotal</span>
                                <span>OMR {cartTotal > 0 ? cartTotal.toFixed(2) : '23.75'}</span>
                            </div>
                            <div className="flex justify-between text-taiba-grey">
                                <span>Shipping</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-3 mt-2">
                                <span>Total</span>
                                <span>OMR {cartTotal > 0 ? cartTotal.toFixed(2) : '23.75'}</span>
                            </div>
                        </div>
                        <Link to="/order-confirmation">
                            <motion.button
                                className="w-full bg-taiba-purple text-white py-3 mt-6 rounded-xl font-semibold"
                                whileHover={{ scale: 1.02, boxShadow: '0px 5px 15px rgba(115, 38, 117, 0.3)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Place Order (OMR {cartTotal > 0 ? cartTotal.toFixed(2) : '23.75'})
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
