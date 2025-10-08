import React from 'react';
import { motion } from 'framer-motion';
import { OrderTab } from '../../../pages/admin/OrderManagementPage';

interface OrderManagementTabsProps {
    activeTab: OrderTab;
    setActiveTab: (tab: OrderTab) => void;
}

const tabs: { id: OrderTab; label: string }[] = [
    { id: 'orders', label: 'All Orders' },
    { id: 'returns', label: 'Returns & Refunds' },
];

const OrderManagementTabs: React.FC<OrderManagementTabsProps> = ({ activeTab, setActiveTab }) => {
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
                            layoutId="order-underline"
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default OrderManagementTabs;
