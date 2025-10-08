import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Role } from '../../../pages/admin/UserManagementPage';
import { Plus, Edit, Trash2 } from 'lucide-react';
import RolePermissionEditor from './RolePermissionEditor';
import ConfirmationModal from '../ConfirmationModal';

interface RoleManagementProps {
    roles: Role[];
    setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
    modules: { id: string; name: string }[];
}

const RoleManagement: React.FC<RoleManagementProps> = ({ roles, setRoles, modules }) => {
    const [isEditorOpen, setEditorOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [deletingRole, setDeletingRole] = useState<Role | null>(null);

    const handleAddRole = () => {
        setEditingRole(null);
        setEditorOpen(true);
    };

    const handleEditRole = (role: Role) => {
        setEditingRole(role);
        setEditorOpen(true);
    };

    const handleDeleteRole = (role: Role) => {
        setDeletingRole(role);
    };

    const confirmDelete = () => {
        if (deletingRole) {
            setRoles(prev => prev.filter(r => r.id !== deletingRole.id));
            setDeletingRole(null);
        }
    };

    const handleSaveRole = (roleData: Omit<Role, 'id'>) => {
        if (editingRole) {
            setRoles(prev => prev.map(r => r.id === editingRole.id ? { ...editingRole, ...roleData } : r));
        } else {
            const newRole: Role = {
                id: crypto.randomUUID(),
                ...roleData
            };
            setRoles(prev => [...prev, newRole]);
        }
        setEditorOpen(false);
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <button onClick={handleAddRole} className="flex items-center gap-2 px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">
                    <Plus size={16} /> Add New Role
                </button>
            </div>
            <div className="space-y-4">
                {roles.map(role => (
                    <motion.div
                        key={role.id}
                        className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="font-semibold text-gray-800">{role.name}</h3>
                        <div className="flex gap-2">
                            <button onClick={() => handleEditRole(role)} className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100"><Edit size={16} /></button>
                            <button onClick={() => handleDeleteRole(role)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"><Trash2 size={16} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>
            <RolePermissionEditor
                isOpen={isEditorOpen}
                onClose={() => setEditorOpen(false)}
                onSave={handleSaveRole}
                roleToEdit={editingRole}
                modules={modules}
            />
            <ConfirmationModal
                isOpen={!!deletingRole}
                onClose={() => setDeletingRole(null)}
                onConfirm={confirmDelete}
                title="Delete Role"
                message={`Are you sure you want to delete the role "${deletingRole?.name}"?`}
            />
        </>
    );
};

export default RoleManagement;
