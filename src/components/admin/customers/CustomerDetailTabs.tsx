import React from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, CreditCard, RotateCcw, FileText } from 'lucide-react';

type CustomerDetailTab = 'overview' | 'orders' | 'payments' | 'returns' | 'logs';

interface CustomerDetailTabsProps {
    activeTab: CustomerDetailTab;
    setActiveTab: (tab: CustomerDetailTab) => void;
}

const tabs: { id: CustomerDetailTab; label: string, icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'payments', label: 'Payment History', icon: CreditCard },
    { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
    { id: 'logs', label: 'Activity Log', icon: FileText },
];

const CustomerDetailTabs: React.FC<CustomerDetailTabsProps> = ({ activeTab, setActiveTab }) => {
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
                    <tab.icon size={16} />
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-taiba-blue"
                            layoutId="customer-detail-underline"
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default CustomerDetailTabs;
