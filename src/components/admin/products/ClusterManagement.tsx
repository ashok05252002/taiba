import React, { useState } from 'react';
import { generateWarehouses } from '../../../utils/mockData';
import { Move, Settings, Package, AlertTriangle } from 'lucide-react';
import StockTransferModal from './StockTransferModal';
import ProductAssignmentPanel from './ProductAssignmentPanel';
import { Product } from '../../../types';

interface ClusterManagementProps {
    allProducts: Product[];
}

const ClusterManagement: React.FC<ClusterManagementProps> = ({ allProducts }) => {
    const [warehouses, setWarehouses] = useState(() => generateWarehouses(4));
    const [isTransferModalOpen, setTransferModalOpen] = useState(false);
    const [isAssignmentPanelOpen, setAssignmentPanelOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState<(typeof warehouses)[0] | null>(null);

    const handleOpenAssignment = (warehouse: typeof warehouses[0]) => {
        setSelectedWarehouse(warehouse);
        setAssignmentPanelOpen(true);
    };

    const handleTransferStock = (from: string, to: string, product: string, quantity: number) => {
        alert(`Transferring ${quantity} of ${product} from ${from} to ${to}`);
        setTransferModalOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 flex items-center gap-2"><Package/>Total Clusters</h4>
                    <p className="text-2xl font-bold">{warehouses.length}</p>
                </div>
                 <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 flex items-center gap-2"><AlertTriangle/>Low Stock Alerts</h4>
                    <p className="text-2xl font-bold">{warehouses.reduce((acc, w) => acc + w.lowStockItems, 0)}</p>
                </div>
            </div>
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
                                    <button onClick={() => setTransferModalOpen(true)} className="inline-flex items-center gap-1 text-taiba-blue hover:underline">
                                        <Move size={14} />
                                        Transfer Stock
                                    </button>
                                    <button onClick={() => handleOpenAssignment(warehouse)} className="inline-flex items-center gap-1 text-gray-600 hover:underline">
                                        <Settings size={14} />
                                        Manage Products
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <StockTransferModal 
                isOpen={isTransferModalOpen} 
                onClose={() => setTransferModalOpen(false)} 
                warehouses={warehouses}
                products={allProducts}
                onTransfer={handleTransferStock}
            />
            <ProductAssignmentPanel
                isOpen={isAssignmentPanelOpen}
                onClose={() => setAssignmentPanelOpen(false)}
                warehouse={selectedWarehouse}
                products={allProducts}
            />
        </>
    );
};

export default ClusterManagement;
