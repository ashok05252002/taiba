import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

interface ReviewStepProps {
    onBack: () => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ onBack }) => {
    const { cartItems, cartTotal } = useCart();
    const finalTotal = cartTotal * 1.05; // Assuming 5% tax

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6 border-b pb-4">
                {cartItems.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-taiba-grey">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">OMR {(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {/* Details */}
            <div className="space-y-4 mb-6">
                <div>
                    <h3 className="font-semibold">Shipping To:</h3>
                    <p className="text-taiba-grey">Ahmed Ali, 123 Al Khuwair St, Muscat, 111</p>
                </div>
                <div>
                    <h3 className="font-semibold">Payment Method:</h3>
                    <p className="text-taiba-grey">Credit Card ending in **** 1234</p>
                </div>
            </div>

            {/* Total */}
            <div className="space-y-2">
                <div className="flex justify-between text-taiba-grey"><span>Subtotal</span><span>OMR {cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-taiba-grey"><span>Taxes (5%)</span><span>OMR {(cartTotal * 0.05).toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t"><span>Total</span><span>OMR {finalTotal.toFixed(2)}</span></div>
            </div>

            <div className="mt-8 flex justify-between">
                <motion.button
                    onClick={onBack}
                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back
                </motion.button>
                <Link to="/order-confirmation">
                    <motion.button
                        className="bg-taiba-purple text-white px-8 py-3 rounded-xl font-semibold"
                        whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(115, 38, 117, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Place Order
                    </motion.button>
                </Link>
            </div>
        </div>
    );
};

export default ReviewStep;
