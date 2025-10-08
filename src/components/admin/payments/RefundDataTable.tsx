import React from 'react';
import { Refund } from '../../../pages/admin/PaymentManagementPage';
import { Eye } from 'lucide-react';

interface RefundDataTableProps {
    refunds: Refund[];
    onViewRefund: (refund: Refund) => void;
}

const RefundDataTable: React.FC<RefundDataTableProps> = ({ refunds, onViewRefund }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Refund ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {refunds.map(r => (
                        <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-taiba-blue">{r.orderId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.customer.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">OMR {r.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(r.status)}`}>
                                    {r.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => onViewRefund(r)} className="text-taiba-blue hover:text-taiba-purple flex items-center gap-1">
                                    <Eye size={16} />
                                    View Audit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RefundDataTable;
