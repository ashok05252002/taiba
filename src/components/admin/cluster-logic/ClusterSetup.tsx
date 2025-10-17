import React from 'react';
import { Plus } from 'lucide-react';
import ClusterMap from './ClusterMap';

const ClusterSetup: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Cluster Configuration</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">
                    <Plus size={16} /> Create Cluster
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium mb-2">Cluster List</h4>
                    <div className="space-y-2">
                        <div className="p-3 bg-white rounded-md border">
                            <p className="font-semibold">Muscat Central</p>
                            <p className="text-xs text-gray-500">2 Branches | 15 Postal Codes</p>
                        </div>
                        <div className="p-3 bg-white rounded-md border">
                            <p className="font-semibold">Dhofar</p>
                            <p className="text-xs text-gray-500">1 Branch | 8 Postal Codes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Branch Map</h4>
                    <ClusterMap />
                </div>
            </div>
        </div>
    );
};

export default ClusterSetup;
