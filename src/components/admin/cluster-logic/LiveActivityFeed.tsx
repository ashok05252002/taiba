import React from 'react';
import { faker } from '@faker-js/faker';

const feed = Array.from({length: 10}, () => ({
    id: faker.string.uuid(),
    time: `${faker.number.int({min: 1, max: 59})}s ago`,
    message: faker.helpers.arrayElement([
        `Order #TP${faker.number.int({min:10000,max:99999})} assigned to Muscat Central cluster.`,
        `Stock for Panadol reserved at Salalah Gardens branch.`,
        `Delivery partner Ahmed Ali assigned to order #TP${faker.number.int({min:10000,max:99999})}.`,
        `ALERT: No stock for Amoxicillin in Al Batinah cluster for order #TP${faker.number.int({min:10000,max:99999})}.`,
    ])
}));

const LiveActivityFeed: React.FC = () => {
    return (
        <div className="p-4">
            <h3 className="font-semibold text-lg mb-4">Live Activity Feed</h3>
            <div className="space-y-4">
                {feed.map(item => (
                    <div key={item.id} className="relative pl-5">
                        <div className="absolute left-0 top-1.5 w-2 h-2 bg-taiba-blue rounded-full"></div>
                        <div className="absolute left-[3px] top-4 h-full w-0.5 bg-gray-200"></div>
                        <p className="text-xs text-gray-500">{item.time}</p>
                        <p className="text-sm">{item.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveActivityFeed;
