import React from 'react';
import { StoreLocation } from '../../../pages/admin/StoreManagementPage';
import { Edit, Trash2, Eye } from 'lucide-react';

interface StoreDataTableProps {
    stores: StoreLocation[];
    onDelete: (store: StoreLocation) => void;
    onViewDetails: (store: StoreLocation) => void;
}

const StoreDataTable: React.FC<StoreDataTableProps> = ({ stores, onDelete, onViewDetails }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'High': return 'bg-green-100 text-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {stores.map(store => (
                        <tr key={store.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.zone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(store.stockStatus)}`}>
                                    {store.stockStatus}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button onClick={() => onViewDetails(store)} className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100 inline-block">
                                    <Eye size={16} />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100"><Edit size={16} /></button>
                                <button onClick={() => onDelete(store)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoreDataTable;
