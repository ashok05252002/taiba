import React, { useState } from 'react';
import { Transaction } from '../../../pages/admin/PaymentManagementPage';
import TransactionTableFilters from './TransactionTableFilters';

interface TransactionDataTableProps {
    transactions: Transaction[];
}

const TransactionDataTable: React.FC<TransactionDataTableProps> = ({ transactions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [methodFilter, setMethodFilter] = useState('all');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              t.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              t.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || t.status.toLowerCase() === statusFilter;
        const matchesMethod = methodFilter === 'all' || t.method.toLowerCase().replace(' ', '-') === methodFilter;
        return matchesSearch && matchesStatus && matchesMethod;
    });

    return (
        <div>
            <TransactionTableFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                methodFilter={methodFilter}
                setMethodFilter={setMethodFilter}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransactions.map(t => (
                            <tr key={t.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{t.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-taiba-blue">{t.orderId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(t.date).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">OMR {t.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.method}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(t.status)}`}>
                                        {t.status}
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

export default TransactionDataTable;
