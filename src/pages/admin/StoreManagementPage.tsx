import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { storeLocations } from '../../utils/mockData';
import { Store, Plus } from 'lucide-react';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import StoreDataTable from '../../components/admin/stores/StoreDataTable';
import StoreDetailPanel from '../../components/admin/stores/StoreDetailPanel';

export type StoreLocation = typeof storeLocations[0];

const StoreManagementPage: React.FC = () => {
    const [stores, setStores] = useState(storeLocations);
    const [deletingStore, setDeletingStore] = useState<StoreLocation | null>(null);
    const [viewingStore, setViewingStore] = useState<StoreLocation | null>(null);

    const handleDelete = (store: StoreLocation) => {
        setDeletingStore(store);
    };

    const confirmDelete = () => {
        if (deletingStore) {
            setStores(prev => prev.filter(s => s.id !== deletingStore.id));
            setDeletingStore(null);
        }
    };
    
    const handleViewDetails = (store: StoreLocation) => {
        setViewingStore(store);
    };

    const handleClosePanel = () => {
        setViewingStore(null);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Store /> Store Management</h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">
                        <Plus size={16} /> Add Store
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <StoreDataTable stores={stores} onDelete={handleDelete} onViewDetails={handleViewDetails} />
                </div>
            </motion.div>
            
            <StoreDetailPanel store={viewingStore} onClose={handleClosePanel} />

            <ConfirmationModal
                isOpen={!!deletingStore}
                onClose={() => setDeletingStore(null)}
                onConfirm={confirmDelete}
                title="Delete Store"
                message={`Are you sure you want to delete the store "${deletingStore?.name}"?`}
            />
        </>
    );
};

export default StoreManagementPage;
