import React from 'react';
import { motion } from 'framer-motion';

interface ShippingStepProps {
    onNext: () => void;
}

const ShippingStep: React.FC<ShippingStepProps> = ({ onNext }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
            <form className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" defaultValue="Ahmed Ali" />
                <input type="text" placeholder="Address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" defaultValue="123 Al Khuwair St" />
                <div className="flex space-x-4">
                    <input type="text" placeholder="City" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" defaultValue="Muscat" />
                    <input type="text" placeholder="Postal Code" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" defaultValue="111" />
                </div>
                <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" defaultValue="+968 9876 5432" />
                <div className="flex items-center">
                    <input id="save-address" type="checkbox" className="h-4 w-4 text-taiba-blue rounded border-gray-300 focus:ring-taiba-blue" />
                    <label htmlFor="save-address" className="ml-2 block text-sm text-gray-900">Save this address for future use</label>
                </div>
            </form>
            <div className="mt-8 flex justify-end">
                <motion.button
                    onClick={onNext}
                    className="bg-taiba-blue text-white px-8 py-3 rounded-xl font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Next: Delivery
                </motion.button>
            </div>
        </div>
    );
};

export default ShippingStep;
