import React from 'react';

type Order = {
    id: string;
    date: string;
    status: string;
    total: string;
    customer: { name: string };
};

interface PartnerOrdersProps {
    deliveries: Order[];
}

const PartnerOrders: React.FC<PartnerOrdersProps> = ({ deliveries }) => {
    const getStatusColor = (status: string) => {
        return status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
    };

    return (
        <div className="bg-white p-4 rounded-lg border">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {deliveries.map(order => (
                            <tr key={order.id}>
                                <td className="px-4 py-3 text-sm font-medium text-taiba-blue">{order.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{order.customer.name}</td>
                                <td className="px-4 py-3 text-sm font-semibold">OMR {order.total}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PartnerOrders;
