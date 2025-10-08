import React from 'react';
import { faker } from '@faker-js/faker';

const RecentOrders: React.FC = () => {
    const orders = Array.from({ length: 5 }, () => ({
        id: `TP${faker.number.int({ min: 10000, max: 99999 })}`,
        customer: faker.person.fullName(),
        avatar: faker.image.avatar(),
        amount: faker.commerce.price({ min: 10, max: 200, symbol: 'OMR ' }),
        status: faker.helpers.arrayElement(['Paid', 'Pending', 'Failed']),
    }));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid': return 'text-green-600';
            case 'Pending': return 'text-orange-500';
            case 'Failed': return 'text-red-600';
            default: return 'text-gray-500';
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
            <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <ul className="space-y-4">
            {orders.map(order => (
                <li key={order.id} className="flex items-center space-x-3">
                    <img src={order.avatar} alt={order.customer} className="w-10 h-10 rounded-full flex-shrink-0"/>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.id}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">{order.amount}</p>
                        <p className={`text-xs font-semibold ${getStatusColor(order.status)}`}>{order.status}</p>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default RecentOrders;
