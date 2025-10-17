import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UserManagementTabs from '../../components/admin/users/UserManagementTabs';
import UserDataTable from '../../components/admin/users/UserDataTable';
import EditUserPanel from '../../components/admin/users/EditUserPanel';
import AddUserPanel from '../../components/admin/users/AddUserPanel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import RoleManagement from '../../components/admin/roles/RoleManagement';
import { subAdminList, generateRoles, adminModules } from '../../utils/mockData';
import { faker } from '@faker-js/faker';

export type User = typeof subAdminList[0];
export type UserType = 'subAdmins' | 'roles';
export type Role = ReturnType<typeof generateRoles>[0];

const UserManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<UserType>('subAdmins');
    
    const [subAdmins, setSubAdmins] = useState(subAdminList);
    const [roles, setRoles] = useState(() => generateRoles());

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isAddPanelOpen, setAddPanelOpen] = useState(false);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const handleEditUser = (user: User) => setEditingUser(user);
    const handleClosePanel = () => {
        setEditingUser(null);
        setAddPanelOpen(false);
    };

    const handleSaveUser = (user: User) => {
        setSubAdmins(prev => prev.map(u => u.id === user.id ? user : u));
        handleClosePanel();
    };

    const handleAddUser = (user: Omit<User, 'id'>) => {
        const newUser: User = {
            ...user,
            id: crypto.randomUUID(),
            avatar: faker.image.avatar(),
            joinedDate: new Date().toLocaleDateString(),
            lastLogin: new Date().toISOString(),
            activityLog: [],
            permissions: {},
        };
        setSubAdmins(prev => [newUser, ...prev]);
        handleClosePanel();
    };

    const handleDeleteUser = (user: User) => setDeletingUser(user);
    
    const confirmDelete = () => {
        if (!deletingUser) return;
        setSubAdmins(prev => prev.filter(u => u.id !== deletingUser.id));
        setDeletingUser(null);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'subAdmins':
                return (
                    <UserDataTable 
                        data={subAdmins} 
                        onEditUser={handleEditUser} 
                        onDeleteUser={handleDeleteUser}
                        onAddUser={() => setAddPanelOpen(true)}
                        userType={activeTab} 
                    />
                );
            case 'roles':
                return <RoleManagement roles={roles} setRoles={setRoles} modules={adminModules} />;
            default:
                return null;
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
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <UserManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    {renderContent()}
                </div>
                <EditUserPanel user={editingUser} onClose={handleClosePanel} onSave={handleSaveUser} />
                <AddUserPanel isOpen={isAddPanelOpen} onClose={handleClosePanel} userType={activeTab} onAdd={handleAddUser} />
            </motion.div>
            <ConfirmationModal
                isOpen={!!deletingUser}
                onClose={() => setDeletingUser(null)}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete the user "${deletingUser?.name}"? This action cannot be undone.`}
            />
        </>
    );
};

export default UserManagementPage;
