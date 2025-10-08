import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Role } from '../../../pages/admin/UserManagementPage';

interface RolePermissionEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (role: Omit<Role, 'id'>) => void;
    roleToEdit: Role | null;
    modules: { id: string; name: string }[];
}

const permissions = ['view', 'add', 'edit', 'delete'];

const RolePermissionEditor: React.FC<RolePermissionEditorProps> = ({ isOpen, onClose, onSave, roleToEdit, modules }) => {
    const [roleName, setRoleName] = useState('');
    const [rolePermissions, setRolePermissions] = useState<Record<string, Record<string, boolean>>>({});

    useEffect(() => {
        if (isOpen) {
            if (roleToEdit) {
                setRoleName(roleToEdit.name);
                setRolePermissions(roleToEdit.permissions);
            } else {
                // Initialize new role with all permissions false
                setRoleName('');
                const newPermissions = modules.reduce((acc, module) => {
                    acc[module.id] = { view: false, add: false, edit: false, delete: false };
                    return acc;
                }, {} as Record<string, Record<string, boolean>>);
                setRolePermissions(newPermissions);
            }
        }
    }, [isOpen, roleToEdit, modules]);

    const handlePermissionChange = (moduleId: string, permission: string) => {
        setRolePermissions(prev => ({
            ...prev,
            [moduleId]: {
                ...prev[moduleId],
                [permission]: !prev[moduleId]?.[permission],
            }
        }));
    };

    const handleSaveClick = () => {
        onSave({ name: roleName, permissions: rolePermissions });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-40"
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">{roleToEdit ? 'Edit Role' : 'Create New Role'}</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={24} /></button>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="mb-6">
                                <label className="text-sm font-medium">Role Name</label>
                                <input
                                    type="text"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    placeholder="e.g., Content Manager"
                                    className="w-full mt-1 p-2 border rounded-md"
                                />
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="py-2 px-4 text-left font-semibold">Module</th>
                                            {permissions.map(p => <th key={p} className="py-2 px-4 font-semibold capitalize">{p}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modules.map(module => (
                                            <tr key={module.id} className="border-b">
                                                <td className="py-3 px-4 font-medium">{module.name}</td>
                                                {permissions.map(perm => (
                                                    <td key={perm} className="py-3 px-4 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="h-5 w-5 text-taiba-blue rounded focus:ring-taiba-blue"
                                                            checked={rolePermissions[module.id]?.[perm] || false}
                                                            onChange={() => handlePermissionChange(module.id, perm)}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
                            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold">Cancel</button>
                            <button onClick={handleSaveClick} className="px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">Save Role</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RolePermissionEditor;
