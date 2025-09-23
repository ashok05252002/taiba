import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Store, ChevronDown } from 'lucide-react';
import { generateAddresses, storeLocations } from '../../utils/mockData';

interface LocationSelectorProps {
    mode: 'delivery' | 'takeaway';
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ mode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const addresses = generateAddresses(3);
    const [selected, setSelected] = useState(mode === 'delivery' ? addresses[0].address : storeLocations[0].name);

    const options = mode === 'delivery' 
        ? addresses.map(a => ({ id: a.id, name: a.address }))
        : storeLocations.map(s => ({ id: s.id, name: s.name }));

    const handleSelect = (option: { id: string; name: string }) => {
        setSelected(option.name);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-taiba-grey"
            >
                {mode === 'delivery' ? <MapPin size={16} /> : <Store size={16} />}
                <div className="text-left">
                    <p className="text-xs">{mode === 'delivery' ? 'Deliver to' : 'Pickup from'}</p>
                    <p className="font-bold text-gray-800 truncate w-32">{selected}</p>
                </div>
                <ChevronDown size={16} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border z-20"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <ul className="p-2">
                            {options.map(option => (
                                <li key={option.id}>
                                    <button 
                                        onClick={() => handleSelect(option)}
                                        className="w-full text-left p-2 rounded-md hover:bg-gray-100 text-sm"
                                    >
                                        {option.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LocationSelector;
