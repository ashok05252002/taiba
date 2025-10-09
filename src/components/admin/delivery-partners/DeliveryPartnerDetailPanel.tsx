import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, BarChart, ShoppingBag, Map, FileText, DollarSign, ShieldCheck } from 'lucide-react';
import { deliveryPartnersList } from '../../../utils/mockData';
import PartnerDetailTabs from './PartnerDetailTabs';
import PartnerOverview from './PartnerOverview';
import PartnerPerformance from './PartnerPerformance';
import PartnerOrders from './PartnerOrders';
import PartnerLocation from './PartnerLocation';
import PartnerPayouts from './PartnerPayouts';
import PartnerDocuments from './PartnerDocuments';
import PartnerActivityLog from './PartnerActivityLog';

type Partner = typeof deliveryPartnersList[0];
type PartnerDetailTab = 'overview' | 'performance' | 'orders' | 'location' | 'payouts' | 'documents' | 'logs';

interface DeliveryPartnerDetailPanelProps {
    partner: Partner | null;
    onClose: () => void;
}

const DeliveryPartnerDetailPanel: React.FC<DeliveryPartnerDetailPanelProps> = ({ partner, onClose }) => {
    const [activeTab, setActiveTab] = useState<PartnerDetailTab>('overview');

    const tabs: { id: PartnerDetailTab; name: string; icon: React.ElementType }[] = [
        { id: 'overview', name: 'Overview', icon: User },
        { id: 'performance', name: 'Performance', icon: BarChart },
        { id: 'orders', name: 'Orders', icon: ShoppingBag },
        { id: 'location', name: 'Location', icon: Map },
        { id: 'payouts', name: 'Payouts', icon: DollarSign },
        { id: 'documents', name: 'Documents', icon: ShieldCheck },
        { id: 'logs', name: 'Activity Log', icon: FileText },
    ];

    const renderTabContent = () => {
        if (!partner) return null;
        switch (activeTab) {
            case 'overview': return <PartnerOverview partner={partner} />;
            case 'performance': return <PartnerPerformance partner={partner} />;
            case 'orders': return <PartnerOrders deliveries={partner.deliveryHistory} />;
            case 'location': return <PartnerLocation />;
            case 'payouts': return <PartnerPayouts payouts={partner.payoutHistory} />;
            case 'documents': return <PartnerDocuments documents={partner.documents} />;
            case 'logs': return <PartnerActivityLog logs={partner.activityLog} />;
            default: return null;
        }
    };

    return (
        <AnimatePresence>
            {partner && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-40"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-4xl bg-white z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
                            <div>
                                <h2 className="text-xl font-bold">{partner.name}</h2>
                                <p className="text-sm text-gray-500">Delivery Partner Details</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={24} /></button>
                        </div>
                        <div className="flex-1 flex overflow-hidden">
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
                            <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
                                {renderTabContent()}
                            </main>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DeliveryPartnerDetailPanel;
