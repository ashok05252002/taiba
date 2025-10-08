import React from 'react';
import { storeLocations } from '../../../utils/mockData';
import { Package, Truck } from 'lucide-react';

const BranchTable: React.FC = () => {
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {storeLocations.map(branch => (
                        <tr key={branch.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className="text-sm font-medium text-gray-900">{branch.name}</p>
                                <p className="text-xs text-gray-500">{branch.address}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branch.zone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(branch.stockStatus)}`}>
                                    {branch.stockStatus}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="flex items-center gap-1 text-taiba-blue hover:underline">
                                    <Package size={14} />
                                    Reserve Stock
                                </button>
                                <button className="flex items-center gap-1 text-taiba-purple hover:underline">
                                    <Truck size={14} />
                                    Assign Delivery
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BranchTable;
