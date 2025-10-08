import React from 'react';
import { Search, Plus } from 'lucide-react';

interface UserTableFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    onAddUser: () => void;
}

const UserTableFilters: React.FC<UserTableFiltersProps> = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onAddUser }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="relative w-full md:w-1/3">
                <input
                    type="text"
                    placeholder="Search users..."
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
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                    <option value="on-duty">On-Duty</option>
                    <option value="offline">Offline</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button onClick={onAddUser} className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">
                    <Plus size={16} />
                    Add User
                </button>
            </div>
        </div>
    );
};

export default UserTableFilters;
