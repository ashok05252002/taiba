import React from 'react';
import { motion } from 'framer-motion';
import { Network, MapPin, Package } from 'lucide-react';
import BranchTable from '../../components/admin/cluster/BranchTable';

const ClusterLogicPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Network /> Cluster & Branch Logic</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Map View */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="font-semibold mb-4">Live Branch Overview</h3>
                    <div className="w-full h-96 bg-gray-200 rounded-md relative">
                        <img src="/assets/images/maps/oman-map-placeholder.png" alt="Oman Map" className="w-full h-full object-cover rounded-md opacity-50" />
                        {/* Mock branch locations */}
                        <div className="absolute top-1/3 left-1/2 text-center cursor-pointer group">
                            <MapPin className="text-taiba-blue group-hover:scale-125 transition-transform" size={32}/>
                            <span className="text-xs font-bold bg-white/80 px-2 py-1 rounded-md shadow-md">Muscat</span>
                        </div>
                         <div className="absolute top-2/3 left-1/4 text-center cursor-pointer group">
                            <MapPin className="text-taiba-purple group-hover:scale-125 transition-transform" size={32}/>
                            <span className="text-xs font-bold bg-white/80 px-2 py-1 rounded-md shadow-md">Nizwa</span>
                        </div>
                         <div className="absolute top-1/4 left-1/3 text-center cursor-pointer group">
                            <MapPin className="text-green-500 group-hover:scale-125 transition-transform" size={32}/>
                            <span className="text-xs font-bold bg-white/80 px-2 py-1 rounded-md shadow-md">Sohar</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-2">Pending Assignments</h3>
                        <p className="text-4xl font-bold text-orange-500">12</p>
                        <p className="text-sm text-gray-500">Orders waiting for branch assignment</p>
                    </div>
                     <div className="bg-white p-6 rounded-lg border shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-2">Active Deliveries</h3>
                        <p className="text-4xl font-bold text-blue-500">34</p>
                        <p className="text-sm text-gray-500">Deliveries currently in progress</p>
                    </div>
                </div>
            </div>

            {/* Branch Table */}
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="font-semibold mb-4 text-lg flex items-center gap-2"><Package /> Branch Inventory & Assignment</h3>
                <BranchTable />
            </div>
        </motion.div>
    );
};

export default ClusterLogicPage;
