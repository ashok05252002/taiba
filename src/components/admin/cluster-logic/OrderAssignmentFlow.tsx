import React from 'react';
import { motion } from 'framer-motion';
import { FilePlus, Search, Archive, Bike, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
    { name: 'New Order', icon: FilePlus, count: 5 },
    { name: 'Cluster ID', icon: Search, count: 4 },
    { name: 'Stock Reserved', icon: Archive, count: 4 },
    { name: 'Delivery Assigned', icon: Bike, count: 3 },
    { name: 'Confirmed', icon: CheckCircle, count: 2 },
];

const OrderAssignmentFlow: React.FC = () => {
    return (
        <div className="p-4">
            <h3 className="font-semibold text-lg mb-6">Live Order Assignment Flow</h3>
            <div className="flex items-center justify-between text-center text-sm">
                {steps.map((step, index) => (
                    <React.Fragment key={step.name}>
                        <motion.div 
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="w-20 h-20 bg-white border-2 rounded-full flex flex-col items-center justify-center shadow-md">
                                <step.icon className="text-taiba-blue mb-1" size={24} />
                                <span className="font-bold text-xl">{step.count}</span>
                            </div>
                            <p className="mt-2 font-medium text-gray-700 w-24">{step.name}</p>
                        </motion.div>
                        {index < steps.length - 1 && (
                            <motion.div 
                                className="flex-grow text-gray-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.1 }}
                            >
                                <ArrowRight size={24} />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default OrderAssignmentFlow;
