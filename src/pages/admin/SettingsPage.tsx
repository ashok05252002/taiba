import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SettingsTabs from '../../components/admin/settings/SettingsTabs';
import TaxDeliverySettings from '../../components/admin/settings/TaxDeliverySettings';
import BranchSettings from '../../components/admin/settings/BranchSettings';
import RoleAccessSettings from '../../components/admin/settings/RoleAccessSettings';
import IntegrationSettings from '../../components/admin/settings/IntegrationSettings';
import { storeLocations } from '../../utils/mockData';

export type SettingsTab = 'tax-delivery' | 'branches' | 'roles' | 'integrations';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('tax-delivery');
    const [taxRate, setTaxRate] = useState(5);
    const [deliveryCharges, setDeliveryCharges] = useState({ standard: 2.00, express: 5.00, freeAbove: 20.00 });
    const [branches, setBranches] = useState(storeLocations);

    const handleSaveChanges = () => {
        alert('Settings saved!');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'tax-delivery': 
                return <TaxDeliverySettings 
                            taxRate={taxRate}
                            setTaxRate={setTaxRate}
                            deliveryCharges={deliveryCharges}
                            setDeliveryCharges={setDeliveryCharges}
                            onSave={handleSaveChanges}
                       />;
            case 'branches': 
                return <BranchSettings branches={branches} setBranches={setBranches} />;
            case 'roles': 
                return <RoleAccessSettings />;
            case 'integrations': 
                return <IntegrationSettings />;
            default: return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {renderContent()}
            </div>
        </motion.div>
    );
};

export default SettingsPage;
