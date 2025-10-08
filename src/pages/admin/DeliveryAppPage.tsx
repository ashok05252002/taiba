import React from 'react';
import { motion } from 'framer-motion';
import DeliveryAppOverview from '../../components/admin/app-features/DeliveryAppOverview';

const DeliveryAppPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800">Delivery Partner Application Features Overview</h1>
            <DeliveryAppOverview />
        </motion.div>
    );
};

export default DeliveryAppPage;
