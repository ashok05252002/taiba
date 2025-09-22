import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Pill } from 'lucide-react';
import MedicalBackground from '../components/background/MedicalBackground';

const OrderConfirmationPage: React.FC = () => {
    return (
        <div className="bg-white py-20 relative overflow-hidden">
            <MedicalBackground theme="confirmation" />
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                >
                    <CheckCircle className="w-24 h-24 mx-auto text-green-500" />
                </motion.div>

                <motion.h1 
                    className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Thank you for your order!
                </motion.h1>

                <motion.p 
                    className="text-lg text-taiba-grey mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Your order #TP2025001 has been placed successfully. You will receive an email confirmation shortly.
                </motion.p>

                <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 mb-8 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="font-semibold text-xl mb-4">Order Summary</h2>
                    <div className="text-left space-y-3">
                        <div className="flex justify-between"><span>Paracetamol 500mg x 2</span><span>OMR 11.00</span></div>
                        <div className="flex justify-between"><span>Vitamin D3 x 1</span><span>OMR 12.75</span></div>
                        <div className="flex justify-between font-bold border-t pt-3 mt-3"><span>Total</span><span>OMR 23.75</span></div>
                    </div>
                </motion.div>

                <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/order/TP2025001">
                        <motion.button
                            className="w-full sm:w-auto bg-taiba-purple text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Package size={20} />
                            <span>Track Your Order</span>
                        </motion.button>
                    </Link>
                    <Link to="/">
                        <motion.button
                            className="w-full sm:w-auto bg-taiba-blue text-white px-8 py-3 rounded-full font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Continue Shopping
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
