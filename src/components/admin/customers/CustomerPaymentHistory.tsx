import React from 'react';

type Payment = {
    id: string;
    orderId: string;
    date: string;
    amount: string;
    method: string;
    status: string;
};

interface CustomerPaymentHistoryProps {
    payments: Payment[];
}

const CustomerPaymentHistory: React.FC<CustomerPaymentHistoryProps> = ({ payments }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map(p => (
                        <tr key={p.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{p.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-taiba-blue">{p.orderId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(p.date).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">OMR {p.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.method}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(p.status)}`}>
                                    {p.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerPaymentHistory;
