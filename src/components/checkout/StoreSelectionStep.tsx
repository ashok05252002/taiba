import React from 'react';
import { motion } from 'framer-motion';
import { useOrder } from '../../contexts/OrderContext';
import { storeLocations } from '../../utils/mockData';
import { Store } from 'lucide-react';

interface StoreSelectionStepProps {
    onNext: () => void;
}

const StoreSelectionStep: React.FC<StoreSelectionStepProps> = ({ onNext }) => {
    const { selectedStore, setSelectedStore } = useOrder();

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Select Pickup Store</h2>
            
            <div className="space-y-4">
                {storeLocations.map(store => (
                    <label key={store.id} className="flex items-start space-x-4 p-4 border-2 rounded-lg has-[:checked]:border-taiba-purple transition-all cursor-pointer">
                        <input 
                            type="radio" 
                            name="store" 
                            value={store.id} 
                            checked={selectedStore?.id === store.id} 
                            onChange={() => setSelectedStore(store)} 
                            className="form-radio text-taiba-purple focus:ring-taiba-purple h-5 w-5 mt-1" 
                        />
                        <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                                <Store size={18} />
                                <p className="font-bold">{store.name}</p>
                            </div>
                            <p className="text-taiba-grey">{store.address}</p>
                        </div>
                    </label>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
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

export default StoreSelectionStep;
