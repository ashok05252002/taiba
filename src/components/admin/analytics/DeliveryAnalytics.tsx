import React from 'react';
import SummaryCard from '../SummaryCard';
import DeliveryPerformance from '../dashboard/DeliveryPerformance';
import { Truck, Clock, CheckCircle, XCircle, Download } from 'lucide-react';

const DeliveryAnalytics: React.FC = () => {
    const summaryData = [
        { title: 'Total Deliveries', value: '332', trend: '+9%', icon: Truck, color: 'text-blue-500' },
        { title: 'Avg. Delivery Time', value: '45 mins', trend: '-3 mins', icon: Clock, color: 'text-green-500' },
        { title: 'On-Time Rate', value: '96.5%', trend: '+1.2%', icon: CheckCircle, color: 'text-purple-500' },
        { title: 'Failed Deliveries', value: '13', trend: '+2', icon: XCircle, color: 'text-red-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-semibold">
                    <Download size={16} /> Export Report
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryData.map((data, index) => (
                    <SummaryCard key={index} {...data} />
                ))}
            </div>
            <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-4">Overall Delivery Success Rate</h3>
                <DeliveryPerformance />
            </div>
        </div>
    );
};

export default DeliveryAnalytics;
