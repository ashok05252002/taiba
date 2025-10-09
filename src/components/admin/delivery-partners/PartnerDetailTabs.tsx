import React from 'react';
import { motion } from 'framer-motion';

type PartnerDetailTab = 'overview' | 'performance' | 'orders' | 'location' | 'payouts' | 'documents' | 'logs';

interface PartnerDetailTabsProps {
    activeTab: PartnerDetailTab;
    setActiveTab: (tab: PartnerDetailTab) => void;
}

const tabs: { id: PartnerDetailTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'orders', label: 'Order History' },
    { id: 'location', label: 'Live Location' },
    { id: 'payouts', label: 'Payouts' },
    { id: 'documents', label: 'Documents' },
    { id: 'logs', label: 'Activity Log' },
];

const PartnerDetailTabs: React.FC<PartnerDetailTabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium relative whitespace-nowrap ${
                        activeTab === tab.id ? 'text-taiba-blue' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-taiba-blue"
                            layoutId="partner-detail-underline"
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default PartnerDetailTabs;
