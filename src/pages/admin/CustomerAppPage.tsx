import React from 'react';
import { motion } from 'framer-motion';
import CustomerAppOverview from '../../components/admin/app-features/CustomerAppOverview';

const CustomerAppPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800">Customer Application Features Overview</h1>
            <CustomerAppOverview />
        </motion.div>
    );
};

export default CustomerAppPage;
