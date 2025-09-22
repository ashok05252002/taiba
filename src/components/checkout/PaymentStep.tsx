import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Truck } from 'lucide-react';

interface PaymentStepProps {
    onNext: () => void;
    onBack: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ onNext, onBack }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
            <div className="space-y-4">
                <label className="flex items-center space-x-4 p-4 border-2 rounded-lg has-[:checked]:border-taiba-purple transition-all cursor-pointer">
                    <input type="radio" name="payment" className="form-radio text-taiba-purple focus:ring-taiba-purple h-5 w-5" defaultChecked />
                    <CreditCard className="text-taiba-grey" />
                    <p className="font-semibold">Credit/Debit Card</p>
                </label>
                <div className="pl-12 space-y-3">
                    <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-purple" />
                    <div className="flex space-x-4">
                        <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-taiba-purple" />
                        <input type="text" placeholder="CVC" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-taiba-purple" />
                    </div>
                </div>
                <label className="flex items-center space-x-4 p-4 border-2 rounded-lg has-[:checked]:border-taiba-purple transition-all cursor-pointer">
                    <input type="radio" name="payment" className="form-radio text-taiba-purple focus:ring-taiba-purple h-5 w-5" />
                    <Wallet className="text-taiba-grey" />
                    <p className="font-semibold">Mobile Wallet</p>
                </label>
                <label className="flex items-center space-x-4 p-4 border-2 rounded-lg has-[:checked]:border-taiba-purple transition-all cursor-pointer">
                    <input type="radio" name="payment" className="form-radio text-taiba-purple focus:ring-taiba-purple h-5 w-5" />
                    <Truck className="text-taiba-grey" />
                    <p className="font-semibold">Cash on Delivery</p>
                </label>
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
                <motion.button
                    onClick={onNext}
                    className="bg-taiba-blue text-white px-8 py-3 rounded-xl font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Next: Review
                </motion.button>
            </div>
        </div>
    );
};

export default PaymentStep;
