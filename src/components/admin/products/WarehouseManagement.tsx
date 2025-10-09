import React from 'react';
import { Warehouse } from '../../../pages/admin/ProductManagementPage';
import { Move, Settings } from 'lucide-react';

interface WarehouseManagementProps {
    warehouses: Warehouse[];
}

const WarehouseManagement: React.FC<WarehouseManagementProps> = ({ warehouses }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Items</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low Stock Alerts</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {warehouses.map(warehouse => (
                        <tr key={warehouse.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{warehouse.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{warehouse.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{warehouse.totalItems.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {warehouse.lowStockItems > 0 ? (
                                    <span className="text-red-600 font-semibold">{warehouse.lowStockItems}</span>
                                ) : (
                                    <span className="text-green-600">0</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                <button className="inline-flex items-center gap-1 text-taiba-blue hover:underline">
                                    <Move size={14} />
                                    Transfer Stock
                                </button>
                                 <button className="inline-flex items-center gap-1 text-gray-600 hover:underline">
                                    <Settings size={14} />
                                    Manage Products
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WarehouseManagement;
