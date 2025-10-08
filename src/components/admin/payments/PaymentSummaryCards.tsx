import React from 'react';
import SummaryCard from '../SummaryCard';
import { DollarSign, CheckCircle, Clock, RotateCcw } from 'lucide-react';

const PaymentSummaryCards: React.FC = () => {
    const summaryData = [
        { title: 'Total Transactions', value: 'OMR 15,670', trend: '+5.5%', icon: DollarSign, color: 'text-blue-500' },
        { title: 'Successful Payments', value: '412', trend: '+12', icon: CheckCircle, color: 'text-green-500' },
        { title: 'Pending Payments', value: '15', trend: '-3', icon: Clock, color: 'text-orange-500' },
        { title: 'Total Refunds', value: 'OMR 230', trend: '+OMR 50', icon: RotateCcw, color: 'text-red-500' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryData.map((data, index) => (
                <SummaryCard key={index} {...data} />
            ))}
        </div>
    );
};

export default PaymentSummaryCards;
