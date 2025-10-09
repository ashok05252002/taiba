import React from 'react';

type Return = {
    id: string;
    orderId: string;
    date: string;
    reason: string;
    product: { name: string };
};

interface CustomerReturnsHistoryProps {
    returns: Return[];
}

const CustomerReturnsHistory: React.FC<CustomerReturnsHistoryProps> = ({ returns }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {returns.map(r => (
                        <tr key={r.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{r.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-taiba-blue">{r.orderId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerReturnsHistory;
