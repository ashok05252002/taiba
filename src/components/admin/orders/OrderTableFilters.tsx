import React from 'react';
import { Search } from 'lucide-react';

interface OrderTableFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
}

const OrderTableFilters: React.FC<OrderTableFiltersProps> = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="relative w-full md:w-1/3">
                <input
                    type="text"
                    placeholder="Search by Order ID, Customer..."
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
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-taiba-blue focus:border-taiba-blue block w-full p-2"
                >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>
        </div>
    );
};

export default OrderTableFilters;
