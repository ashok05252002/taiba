import React from 'react';
import { Search, Download } from 'lucide-react';

interface TransactionTableFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    methodFilter: string;
    setMethodFilter: (method: string) => void;
}

const TransactionTableFilters: React.FC<TransactionTableFiltersProps> = ({
    searchTerm, setSearchTerm, statusFilter, setStatusFilter, methodFilter, setMethodFilter
}) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="relative w-full md:w-1/3">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 rounded-full px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-taiba-blue focus:outline-none border border-gray-200"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-taiba-blue focus:border-taiba-blue block p-2"
                >
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                </select>
                <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-taiba-blue focus:border-taiba-blue block p-2"
                >
                    <option value="all">All Methods</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="cod">COD</option>
                    <option value="wallet">Wallet</option>
                    <option value="upi">UPI</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-semibold">
                    <Download size={16} />
                    Export
                </button>
            </div>
        </div>
    );
};

export default TransactionTableFilters;
