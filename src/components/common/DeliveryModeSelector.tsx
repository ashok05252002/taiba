import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Store } from 'lucide-react';

interface DeliveryModeSelectorProps {
    mode: 'delivery' | 'takeaway';
    setMode: (mode: 'delivery' | 'takeaway') => void;
}

const DeliveryModeSelector: React.FC<DeliveryModeSelectorProps> = ({ mode, setMode }) => {
    return (
        <div className="flex items-center bg-gray-100 rounded-full p-1">
            <motion.button
                onClick={() => setMode('delivery')}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${mode === 'delivery' ? 'bg-white text-taiba-purple shadow-sm' : 'text-gray-600'}`}
            >
                <Truck size={16} />
                <span>Delivery</span>
            </motion.button>
            <motion.button
                onClick={() => setMode('takeaway')}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${mode === 'takeaway' ? 'bg-white text-taiba-purple shadow-sm' : 'text-gray-600'}`}
            >
                <Store size={16} />
                <span>Takeaway</span>
            </motion.button>
        </div>
    );
};

export default DeliveryModeSelector;
