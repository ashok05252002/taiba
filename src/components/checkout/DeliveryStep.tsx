import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Zap } from 'lucide-react';

interface DeliveryStepProps {
    onNext: () => void;
    onBack: () => void;
}

const DeliveryStep: React.FC<DeliveryStepProps> = ({ onNext, onBack }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Delivery Method</h2>
            <div className="space-y-4">
                <label className="flex items-center space-x-4 p-4 border-2 rounded-lg has-[:checked]:border-taiba-blue transition-all cursor-pointer">
                    <input type="radio" name="delivery" className="form-radio text-taiba-blue focus:ring-taiba-blue h-5 w-5" defaultChecked />
                    <Truck className="text-taiba-grey" />
                    <div>
                        <p className="font-semibold">Standard Delivery</p>
                        <p className="text-sm text-taiba-grey">Est. delivery: 2-3 business days - FREE</p>
                    </div>
                </label>
                <label className="flex items-center space-x-4 p-4 border-2 rounded-lg has-[:checked]:border-taiba-blue transition-all cursor-pointer">
                    <input type="radio" name="delivery" className="form-radio text-taiba-blue focus:ring-taiba-blue h-5 w-5" />
                    <Zap className="text-taiba-grey" />
                    <div>
                        <p className="font-semibold">Express Delivery</p>
                        <p className="text-sm text-taiba-grey">Est. delivery: Same day - OMR 2.00</p>
                    </div>
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
                    Next: Payment
                </motion.button>
            </div>
        </div>
    );
};

export default DeliveryStep;
