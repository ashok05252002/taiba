import React from 'react';
import SummaryCard from '../SummaryCard';
import { Package, Archive, Folder, AlertTriangle } from 'lucide-react';

const ProductSummaryCards: React.FC = () => {
    const summaryData = [
        { title: 'Total Products', value: '2,345', trend: '+50', icon: Package, color: 'text-blue-500' },
        { title: 'Total Categories', value: '12', trend: '+1', icon: Folder, color: 'text-purple-500' },
        { title: 'Warehouses', value: '4', trend: '+0', icon: Archive, color: 'text-green-500' },
        { title: 'Low Stock', value: '32 Items', trend: '+3 Alerts', icon: AlertTriangle, color: 'text-red-500' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryData.map((data, index) => (
                <SummaryCard key={index} {...data} />
            ))}
        </div>
    );
};

export default ProductSummaryCards;
