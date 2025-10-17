import React from 'react';
import { Upload, Plus } from 'lucide-react';

const postalCodes = [
    { code: '111', cluster: 'Muscat Central', branch: 'Taiba Main' },
    { code: '112', cluster: 'Seeb North', branch: 'Taiba Seeb' },
    { code: '113', cluster: 'Muscat Central', branch: 'Taiba Ruwi' },
];

const PostalCodeMapping: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Postal Code to Store Mapping</h3>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm"><Plus size={14}/> Add Manual</button>
                    <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm"><Upload size={14}/> Upload CSV</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Postal Code</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Assigned Cluster</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Assigned Branch</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {postalCodes.map(pc => (
                            <tr key={pc.code}>
                                <td className="px-4 py-2 font-medium">{pc.code}</td>
                                <td className="px-4 py-2">{pc.cluster}</td>
                                <td className="px-4 py-2">{pc.branch}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostalCodeMapping;
