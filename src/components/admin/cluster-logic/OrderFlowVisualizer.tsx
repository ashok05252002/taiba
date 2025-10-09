import React from 'react';
import { FilePlus, Search, Archive, Bike, CheckCircle } from 'lucide-react';

const steps = [
    { name: 'New Order', icon: FilePlus, count: 5 },
    { name: 'Cluster ID', icon: Search, count: 4 },
    { name: 'Stock Reserved', icon: Archive, count: 4 },
    { name: 'Delivery Assigned', icon: Bike, count: 3 },
    { name: 'Confirmed', icon: CheckCircle, count: 2 },
];

const OrderFlowVisualizer: React.FC = () => {
    return (
        <div className="flex items-center justify-between text-center text-sm">
            {steps.map((step, index) => (
                <React.Fragment key={step.name}>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 border-2 rounded-full flex flex-col items-center justify-center">
                            <step.icon className="text-gray-600 mb-1" />
                            <span className="font-bold text-lg">{step.count}</span>
                        </div>
                        <p className="mt-2 font-medium text-gray-700">{step.name}</p>
                    </div>
                    {index < steps.length - 1 && <div className="flex-grow h-0.5 bg-gray-200 mx-4"></div>}
                </React.Fragment>
            ))}
        </div>
    );
};

export default OrderFlowVisualizer;
