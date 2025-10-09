import React from 'react';
import { AdminOrder } from '../../../pages/admin/OrderManagementPage';

interface ActiveOrdersTableProps {
    orders: AdminOrder[];
}

const ActiveOrdersTable: React.FC<ActiveOrdersTableProps> = ({ orders }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">Order ID</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">Status</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">Cluster</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">Delivery Partner</th>
                        <th className="px-4 py-2 text-right font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="px-4 py-2 font-medium text-taiba-blue">{order.id}</td>
                            <td className="px-4 py-2">{order.status}</td>
                            <td className="px-4 py-2">{order.branch.zone}</td>
                            <td className="px-4 py-2">{order.deliveryPartner?.name}</td>
                            <td className="px-4 py-2 text-right">
                                <button className="text-taiba-blue hover:underline">Override</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveOrdersTable;
