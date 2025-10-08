import React from 'react';
import SummaryCard from '../SummaryCard';
import { Users, Bike, UserCheck } from 'lucide-react';

const UserSummaryCards: React.FC = () => {
    const summaryData = [
        { title: 'Total Customers', value: '1,280', trend: '+15%', icon: Users, color: 'text-blue-500' },
        { title: 'Delivery Partners', value: '45', trend: '+2', icon: Bike, color: 'text-green-500' },
        { title: 'Sub-Admins', value: '5', trend: '+0', icon: UserCheck, color: 'text-purple-500' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summaryData.map((data, index) => (
                <SummaryCard key={index} {...data} />
            ))}
        </div>
    );
};

export default UserSummaryCards;
