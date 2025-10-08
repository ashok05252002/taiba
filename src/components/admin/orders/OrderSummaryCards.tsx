import React from 'react';
import SummaryCard from '../SummaryCard';
import { ShoppingCart, RefreshCw, Truck, RotateCcw } from 'lucide-react';

const OrderSummaryCards: React.FC = () => {
    const summaryData = [
        { title: 'Total Orders', value: '345', trend: '+8.2%', icon: ShoppingCart, color: 'text-blue-500' },
        { title: 'Pending Orders', value: '23', trend: '-2', icon: RefreshCw, color: 'text-orange-500' },
        { title: 'Shipped Orders', value: '280', trend: '+15', icon: Truck, color: 'text-green-500' },
        { title: 'Returns', value: '5', trend: '+1', icon: RotateCcw, color: 'text-red-500' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryData.map((data, index) => (
                <SummaryCard key={index} {...data} />
            ))}
        </div>
    );
};

export default OrderSummaryCards;
