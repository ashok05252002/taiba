import React from 'react';
import { motion } from 'framer-motion';
import { CmsTab } from '../../../pages/admin/CmsManagementPage';

interface CmsTabsProps {
    activeTab: CmsTab;
    setActiveTab: (tab: CmsTab) => void;
}

const tabs: { id: CmsTab; label: string }[] = [
    { id: 'pages', label: 'Static Pages' },
    { id: 'banners', label: 'Homepage Banners' },
    { id: 'notifications', label: 'Notification Templates' },
];

const CmsTabs: React.FC<CmsTabsProps> = ({ activeTab, setActiveTab }) => {
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
                            layoutId="cms-underline"
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default CmsTabs;
