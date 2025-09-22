import React from 'react';
import { motion } from 'framer-motion';
import { generateAddresses } from '../../utils/mockData';
import { Home, Briefcase, Trash2, Edit, PlusCircle } from 'lucide-react';

const ManageAddresses = () => {
    const addresses = generateAddresses(2);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Addresses</h2>
                <button className="flex items-center gap-2 bg-taiba-blue text-white px-4 py-2 rounded-lg font-semibold">
                    <PlusCircle size={18} />
                    Add New
                </button>
            </div>
            <div className="space-y-4">
                {addresses.map((address, index) => (
                    <motion.div
                        key={address.id}
                        className="bg-gray-50 p-4 rounded-xl border flex justify-between items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-start gap-4">
                            {address.type === 'Home' ? <Home className="text-taiba-grey mt-1" /> : <Briefcase className="text-taiba-grey mt-1" />}
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold">{address.type}</p>
                                    {address.isDefault && <span className="text-xs bg-taiba-pistachio text-black px-2 py-0.5 rounded-full">Default</span>}
                                </div>
                                <p className="text-taiba-grey">{address.name}</p>
                                <p className="text-taiba-grey">{address.address}</p>
                                <p className="text-taiba-grey">{address.phone}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-gray-500 hover:text-taiba-blue"><Edit size={18} /></button>
                            <button className="p-2 text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageAddresses;
