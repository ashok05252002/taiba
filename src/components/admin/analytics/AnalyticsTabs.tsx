import React from 'react';
import { motion } from 'framer-motion';
import { AnalyticsTab } from '../../../pages/admin/AnalyticsPage';

interface AnalyticsTabsProps {
    activeTab: AnalyticsTab;
    setActiveTab: (tab: AnalyticsTab) => void;
}

const tabs: { id: AnalyticsTab; label: string }[] = [
    { id: 'sales', label: 'Sales' },
    { id: 'customers', label: 'Customers' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'inventory', label: 'Inventory' },
];

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex border-b border-gray-200 mb-6">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium relative ${
                        activeTab === tab.id ? 'text-taiba-blue' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-taiba-blue"
                            layoutId="analytics-underline"
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default AnalyticsTabs;
