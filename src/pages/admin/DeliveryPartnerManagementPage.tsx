import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { deliveryPartnersList } from '../../utils/mockData';
import UserDataTable from '../../components/admin/users/UserDataTable';
import { Bike } from 'lucide-react';
import EditUserPanel from '../../components/admin/users/EditUserPanel';
import AddUserPanel from '../../components/admin/users/AddUserPanel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { User } from './UserManagementPage';
import DeliveryPartnerDetailPanel from '../../components/admin/delivery-partners/DeliveryPartnerDetailPanel';

const DeliveryPartnerManagementPage: React.FC = () => {
    const [partners, setPartners] = useState(deliveryPartnersList);
    const [editingPartner, setEditingPartner] = useState<User | null>(null);
    const [isAddPanelOpen, setAddPanelOpen] = useState(false);
    const [deletingPartner, setDeletingPartner] = useState<User | null>(null);
    const [viewingPartner, setViewingPartner] = useState<User | null>(null);

    const handleEdit = (partner: User) => setEditingPartner(partner);
    const handleAdd = () => setAddPanelOpen(true);
    const handleDelete = (partner: User) => setDeletingPartner(partner);
    const handleView = (partner: User) => setViewingPartner(partner);

    const handleClosePanel = () => {
        setEditingPartner(null);
        setAddPanelOpen(false);
        setViewingPartner(null);
    };

    const handleSave = (updatedPartner: User) => {
        setPartners(prev => prev.map(p => p.id === updatedPartner.id ? updatedPartner : p));
        handleClosePanel();
    };

    const handleAddUser = (partner: Omit<User, 'id'>) => {
        const newPartner = { ...partner, id: crypto.randomUUID() } as User;
        setPartners(prev => [newPartner, ...prev]);
        handleClosePanel();
    };

    const confirmDelete = () => {
        if (deletingPartner) {
            setPartners(prev => prev.filter(p => p.id !== deletingPartner.id));
            setDeletingPartner(null);
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><Bike /> Delivery Partner Management</h1>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <UserDataTable 
                        data={partners} 
                        onEditUser={handleEdit}
                        onDeleteUser={handleDelete}
                        onAddUser={handleAdd}
                        userType="delivery"
                        onViewDetails={handleView}
                    />
                </div>
            </motion.div>
            <EditUserPanel user={editingPartner} onClose={handleClosePanel} onSave={handleSave} />
            <AddUserPanel isOpen={isAddPanelOpen} onClose={handleClosePanel} onAdd={handleAddUser} userType="delivery" />
            <DeliveryPartnerDetailPanel partner={viewingPartner} onClose={handleClosePanel} />
            <ConfirmationModal
                isOpen={!!deletingPartner}
                onClose={() => setDeletingPartner(null)}
                onConfirm={confirmDelete}
                title="Delete Delivery Partner"
                message={`Are you sure you want to delete this partner?`}
            />
        </>
    );
};

export default DeliveryPartnerManagementPage;
