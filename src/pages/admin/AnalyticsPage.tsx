import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnalyticsTabs from '../../components/admin/analytics/AnalyticsTabs';
import SalesAnalytics from '../../components/admin/analytics/SalesAnalytics';
import CustomerAnalytics from '../../components/admin/analytics/CustomerAnalytics';
import DeliveryAnalytics from '../../components/admin/analytics/DeliveryAnalytics';
import InventoryAnalytics from '../../components/admin/analytics/InventoryAnalytics';

export type AnalyticsTab = 'sales' | 'customers' | 'delivery' | 'inventory';

const AnalyticsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AnalyticsTab>('sales');

    const renderContent = () => {
        switch (activeTab) {
            case 'sales':
                return <SalesAnalytics />;
            case 'customers':
                return <CustomerAnalytics />;
            case 'delivery':
                return <DeliveryAnalytics />;
            case 'inventory':
                return <InventoryAnalytics />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800">Analytics & Reporting</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <AnalyticsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {renderContent()}
            </div>
        </motion.div>
    );
};

export default AnalyticsPage;
