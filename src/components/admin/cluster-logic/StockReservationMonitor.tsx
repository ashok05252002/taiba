import React from 'react';
import { faker } from '@faker-js/faker';
import { generateProducts } from '../../../utils/mockData';
import { AlertTriangle, Clock } from 'lucide-react';

const reservedStock = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    product: generateProducts(1)[0],
    orderId: `TP${faker.number.int({min: 10000, max: 99999})}`,
    quantity: faker.number.int({min: 1, max: 3}),
    timeLeft: `${faker.number.int({min: 2, max: 14})} min left`,
    atRisk: faker.datatype.boolean(0.2),
}));

const StockReservationMonitor: React.FC = () => {
    return (
        <div className="p-4">
            <h3 className="font-semibold text-lg mb-4">Stock Reservation Monitor</h3>
            <div className="space-y-3">
                {reservedStock.map(item => (
                    <div key={item.id} className={`p-3 rounded-lg border ${item.atRisk ? 'bg-red-50 border-red-200' : 'bg-white'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-sm">{item.product.name}</p>
                                <p className="text-xs text-gray-500">Order: {item.orderId} | Qty: {item.quantity}</p>
                            </div>
                            <div className={`flex items-center gap-2 text-xs font-semibold ${item.atRisk ? 'text-red-600' : 'text-gray-600'}`}>
                                {item.atRisk ? <AlertTriangle size={14}/> : <Clock size={14}/>}
                                {item.timeLeft}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockReservationMonitor;
