import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { storeLocations } from '../../utils/mockData';
import { Store, Plus } from 'lucide-react';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import StoreDataTable from '../../components/admin/stores/StoreDataTable';
import StoreDetailPanel from '../../components/admin/stores/StoreDetailPanel';
import AddStoreWizard from '../../components/admin/stores/AddStoreWizard';
import EditStaffModal from '../../components/admin/stores/EditStaffModal';

export type StoreLocation = typeof storeLocations[0];
export type StaffMember = StoreLocation['staff'][0];

const StoreManagementPage: React.FC = () => {
    const [stores, setStores] = useState(storeLocations);
    const [deletingStore, setDeletingStore] = useState<StoreLocation | null>(null);
    const [viewingStore, setViewingStore] = useState<StoreLocation | null>(null);
    const [isAddWizardOpen, setAddWizardOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<{ storeId: string; staff: StaffMember } | null>(null);

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

    const handleAddStore = (newStoreData: Partial<Omit<StoreLocation, 'id'>>) => {
        const newStore: StoreLocation = {
            id: crypto.randomUUID(),
            name: newStoreData.name || 'New Store',
            address: newStoreData.address || 'N/A',
            phone: newStoreData.phone || 'N/A',
            hours: newStoreData.hours || 'N/A',
            stockStatus: 'Low',
            zone: newStoreData.zone || 'N/A',
            totalProducts: 0,
            staffCount: (newStoreData.staff || []).length,
            inventory: [],
            staff: newStoreData.staff || [],
            performance: { revenue: 0, orderCount: 0 },
            documents: [],
            status: 'Open',
            branchCode: `NEW-${crypto.randomUUID().slice(0, 4).toUpperCase()}`,
            dateOpened: new Date().toISOString().split('T')[0],
            orders: [],
        };
        setStores(prev => [newStore, ...prev]);
        setAddWizardOpen(false);
    };

    const handleRemoveStaff = (storeId: string, staffId: string) => {
        setStores(prevStores => {
            const updatedStores = prevStores.map(store => {
                if (store.id === storeId) {
                    const updatedStaff = store.staff.filter(s => s.id !== staffId);
                    return { ...store, staff: updatedStaff, staffCount: updatedStaff.length };
                }
                return store;
            });
            if (viewingStore?.id === storeId) {
                setViewingStore(updatedStores.find(s => s.id === storeId) || null);
            }
            return updatedStores;
        });
    };

    const handleEditStaff = (storeId: string, staff: StaffMember) => {
        setEditingStaff({ storeId, staff });
    };

    const handleSaveStaff = (storeId: string, updatedStaff: StaffMember) => {
        setStores(prevStores => {
            const updatedStores = prevStores.map(store => {
                if (store.id === storeId) {
                    const newStaffList = store.staff.map(s => s.id === updatedStaff.id ? updatedStaff : s);
                    return { ...store, staff: newStaffList };
                }
                return store;
            });
            if (viewingStore?.id === storeId) {
                setViewingStore(updatedStores.find(s => s.id === storeId) || null);
            }
            return updatedStores;
        });
        setEditingStaff(null);
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
                    <button onClick={() => setAddWizardOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">
                        <Plus size={16} /> Add Store
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <StoreDataTable stores={stores} onDelete={handleDelete} onViewDetails={handleViewDetails} />
                </div>
            </motion.div>
            
            <StoreDetailPanel 
                store={viewingStore} 
                onClose={handleClosePanel} 
                onRemoveStaff={handleRemoveStaff}
                onEditStaff={handleEditStaff}
            />
            
            <AddStoreWizard isOpen={isAddWizardOpen} onClose={() => setAddWizardOpen(false)} onAdd={handleAddStore} />

            <EditStaffModal
                isOpen={!!editingStaff}
                onClose={() => setEditingStaff(null)}
                staffMember={editingStaff?.staff || null}
                onSave={(updatedStaff) => editingStaff && handleSaveStaff(editingStaff.storeId, updatedStaff)}
            />

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
