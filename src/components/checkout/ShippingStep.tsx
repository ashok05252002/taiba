import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateAddresses } from '../../utils/mockData';
import { Home, Briefcase, PlusCircle } from 'lucide-react';

interface ShippingStepProps {
    onNext: () => void;
}

const ShippingStep: React.FC<ShippingStepProps> = ({ onNext }) => {
    const [addresses] = useState(generateAddresses(3));
    const [selectedAddress, setSelectedAddress] = useState(addresses.find(a => a.isDefault)?.id);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Select Shipping Address</h2>
            
            {!showForm ? (
                <div className="space-y-4">
                    {addresses.map(address => (
                        <label key={address.id} className="flex items-start space-x-4 p-4 border-2 rounded-lg has-[:checked]:border-taiba-blue transition-all cursor-pointer">
                            <input type="radio" name="address" value={address.id} checked={selectedAddress === address.id} onChange={() => setSelectedAddress(address.id)} className="form-radio text-taiba-blue focus:ring-taiba-blue h-5 w-5 mt-1" />
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                    {address.type === 'Home' ? <Home size={18} /> : <Briefcase size={18} />}
                                    <p className="font-bold">{address.type}</p>
                                    {address.isDefault && <span className="text-xs bg-taiba-pistachio text-black px-2 py-0.5 rounded-full">Default</span>}
                                </div>
                                <p className="text-taiba-grey">{address.name}</p>
                                <p className="text-taiba-grey">{address.address}</p>
                                <p className="text-taiba-grey">{address.phone}</p>
                            </div>
                        </label>
                    ))}
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-taiba-blue font-semibold mt-4">
                        <PlusCircle size={20} />
                        Add a New Address
                    </button>
                </div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h3 className="text-lg font-semibold mb-4">New Address</h3>
                    <form className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                        <input type="text" placeholder="Address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                        <div className="flex space-x-4">
                            <input type="text" placeholder="City" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                            <input type="text" placeholder="Postal Code" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                        </div>
                        <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-pistachio" />
                        <button onClick={() => setShowForm(false)} type="button" className="text-sm text-taiba-grey hover:underline">Cancel</button>
                    </form>
                </motion.div>
            )}

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
