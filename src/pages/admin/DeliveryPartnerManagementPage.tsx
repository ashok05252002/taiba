import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateDeliveryPartners } from '../../utils/mockData';
import UserDataTable from '../../components/admin/users/UserDataTable';
import { Bike } from 'lucide-react';
import EditUserPanel from '../../components/admin/users/EditUserPanel';
import AddUserPanel from '../../components/admin/users/AddUserPanel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { User } from './UserManagementPage';

const DeliveryPartnerManagementPage: React.FC = () => {
    const [partners, setPartners] = useState(() => generateDeliveryPartners(15));
    const [editingPartner, setEditingPartner] = useState<User | null>(null);
    const [isAddPanelOpen, setAddPanelOpen] = useState(false);
    const [deletingPartner, setDeletingPartner] = useState<User | null>(null);

    const handleEdit = (partner: User) => setEditingPartner(partner);
    const handleAdd = () => setAddPanelOpen(true);
    const handleDelete = (partner: User) => setDeletingPartner(partner);
    const handleClosePanel = () => {
        setEditingPartner(null);
        setAddPanelOpen(false);
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
                    />
                </div>
            </motion.div>
            <EditUserPanel user={editingPartner} onClose={handleClosePanel} onSave={handleSave} />
            <AddUserPanel isOpen={isAddPanelOpen} onClose={handleClosePanel} onAdd={handleAddUser} userType="delivery" />
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
