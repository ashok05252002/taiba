import React from 'react';
import { motion } from 'framer-motion';
import { SettingsTab } from '../../../pages/admin/SettingsPage';

interface SettingsTabsProps {
    activeTab: SettingsTab;
    setActiveTab: (tab: SettingsTab) => void;
}

const tabs: { id: SettingsTab; label: string }[] = [
    { id: 'tax-delivery', label: 'Tax & Delivery' },
    { id: 'branches', label: 'Branch Setup' },
    { id: 'roles', label: 'Role-Based Access' },
    { id: 'integrations', label: 'Integrations' },
];

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, setActiveTab }) => {
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
                            layoutId="settings-underline"
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default SettingsTabs;
