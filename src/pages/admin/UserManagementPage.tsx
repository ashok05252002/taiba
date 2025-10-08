import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import UserSummaryCards from '../../components/admin/users/UserSummaryCards';
import UserManagementTabs from '../../components/admin/users/UserManagementTabs';
import UserDataTable from '../../components/admin/users/UserDataTable';
import EditUserPanel from '../../components/admin/users/EditUserPanel';
import AddUserPanel from '../../components/admin/users/AddUserPanel';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import RoleManagement from '../../components/admin/roles/RoleManagement';
import { generateCustomers, generateSubAdmins, generateRoles, adminModules } from '../../utils/mockData';

export type User = ReturnType<typeof generateCustomers>[0] | ReturnType<typeof generateSubAdmins>[0];
export type UserType = 'customers' | 'subAdmins' | 'roles';
export type Role = ReturnType<typeof generateRoles>[0];

const UserManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<UserType>('customers');
    
    const [customers, setCustomers] = useState(() => generateCustomers(25));
    const [subAdmins, setSubAdmins] = useState(() => generateSubAdmins(5));
    const [roles, setRoles] = useState(() => generateRoles());

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isAddPanelOpen, setAddPanelOpen] = useState(false);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const data = useMemo(() => {
        switch (activeTab) {
            case 'customers': return customers;
            case 'subAdmins': return subAdmins;
            default: return [];
        }
    }, [activeTab, customers, subAdmins]);

    const handleEditUser = (user: User) => setEditingUser(user);
    const handleClosePanel = () => {
        setEditingUser(null);
        setAddPanelOpen(false);
    };

    const handleSaveUser = (user: User) => {
        const updateUserList = (setter: React.Dispatch<React.SetStateAction<any[]>>) => {
            setter(prev => prev.map(u => u.id === user.id ? user : u));
        };
        switch(activeTab) {
            case 'customers': updateUserList(setCustomers); break;
            case 'subAdmins': updateUserList(setSubAdmins); break;
        }
        handleClosePanel();
    };

    const handleAddUser = (user: Omit<User, 'id'>) => {
        const newUser = { ...user, id: crypto.randomUUID() } as User;
         const addUserToList = (setter: React.Dispatch<React.SetStateAction<any[]>>) => {
            setter(prev => [newUser, ...prev]);
        };
        switch(activeTab) {
            case 'customers': addUserToList(setCustomers); break;
            case 'subAdmins': addUserToList(setSubAdmins); break;
        }
        handleClosePanel();
    };

    const handleDeleteUser = (user: User) => setDeletingUser(user);
    
    const confirmDelete = () => {
        if (!deletingUser) return;
        const deleteUserFromList = (setter: React.Dispatch<React.SetStateAction<any[]>>) => {
            setter(prev => prev.filter(u => u.id !== deletingUser.id));
        };
        switch(activeTab) {
            case 'customers': deleteUserFromList(setCustomers); break;
            case 'subAdmins': deleteUserFromList(setSubAdmins); break;
        }
        setDeletingUser(null);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'customers':
            case 'subAdmins':
                return (
                    <UserDataTable 
                        data={data} 
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
                <UserSummaryCards />
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
                message={`Are you sure you want to delete the user "${deletingUser && 'name' in deletingUser ? deletingUser.name : ''}"? This action cannot be undone.`}
            />
        </>
    );
};

export default UserManagementPage;
