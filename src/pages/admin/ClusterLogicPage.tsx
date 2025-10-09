import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Map, List, Archive, Bike, FileText, BarChart } from 'lucide-react';
import ClusterMap from '../../components/admin/cluster-logic/ClusterMap';
import OrderAssignmentFlow from '../../components/admin/cluster-logic/OrderAssignmentFlow';
import StockReservationMonitor from '../../components/admin/cluster-logic/StockReservationMonitor';
import DeliveryAssignmentMonitor from '../../components/admin/cluster-logic/DeliveryAssignmentMonitor';
import LiveActivityFeed from '../../components/admin/cluster-logic/LiveActivityFeed';
import ClusterAuditLog from '../../components/admin/cluster-logic/ClusterAuditLog';

type ClusterTab = 'map' | 'flow' | 'reservations' | 'deliveries' | 'logs' | 'reports';

const ClusterLogicPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ClusterTab>('map');

    const tabs: { id: ClusterTab; name: string; icon: React.ElementType }[] = [
        { id: 'map', name: 'Map', icon: Map },
        { id: 'flow', name: 'Order Flow', icon: List },
        { id: 'reservations', name: 'Reservations', icon: Archive },
        { id: 'deliveries', name: 'Deliveries', icon: Bike },
        { id: 'logs', name: 'Logs', icon: FileText },
        { id: 'reports', name: 'Reports', icon: BarChart },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'map': return <ClusterMap />;
            case 'flow': return <OrderAssignmentFlow />;
            case 'reservations': return <StockReservationMonitor />;
            case 'deliveries': return <DeliveryAssignmentMonitor />;
            case 'logs': return <LiveActivityFeed />;
            case 'reports': return <ClusterAuditLog />;
            default: return <ClusterMap />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Network /> Cluster-Wise Branch Assignment</h1>
            
            <div className="bg-white rounded-lg border shadow-sm flex">
                <nav className="w-56 border-r p-4">
                    <ul className="space-y-1">
                        {tabs.map(tab => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-md text-sm font-medium ${activeTab === tab.id ? 'bg-blue-100 text-taiba-blue' : 'hover:bg-gray-100'}`}
                                >
                                    <tab.icon size={16} />
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="flex-1 p-6 bg-gray-50/50">
                    {renderContent()}
                </main>
            </div>
        </motion.div>
    );
};

export default ClusterLogicPage;
