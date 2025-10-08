import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storeLocations } from '../../utils/mockData';
import { ChevronLeft, Users, Package, Clock } from 'lucide-react';
import StoreDetailHeader from '../../components/admin/stores/StoreDetailHeader';
import StoreInventoryTable from '../../components/admin/stores/StoreInventoryTable';
import StatCard from '../../components/admin/shared/StatCard';
import LiveTrackingMap from '../../components/admin/orders/LiveTrackingMap';

const StoreDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [store, setStore] = useState<(typeof storeLocations)[0] | null>(null);

    useEffect(() => {
        const foundStore = storeLocations.find(s => s.id === id);
        setStore(foundStore || null);
    }, [id]);

    if (!store) {
        return <div>Store not found</div>;
    }

    const summaryData = [
        { title: 'Total Products', value: store.totalProducts.toString(), icon: Package, color: 'text-blue-500' },
        { title: 'Staff Members', value: store.staffCount.toString(), icon: Users, color: 'text-purple-500' },
        { title: 'Opening Hours', value: store.hours, icon: Clock, color: 'text-green-500' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <Link to="/admin/stores" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
                <ChevronLeft size={18} />
                Back to All Stores
            </Link>

            <StoreDetailHeader store={store} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryData.map(data => (
                    <StatCard key={data.title} {...data} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border shadow-sm">
                    <h3 className="font-semibold mb-4">Inventory</h3>
                    <StoreInventoryTable inventory={store.inventory} />
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                     <h3 className="font-semibold mb-4">Location</h3>
                     <div className="h-96 rounded-md overflow-hidden">
                        <LiveTrackingMap />
                     </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StoreDetailPage;
