import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { UserType, User } from '../../../pages/admin/UserManagementPage';
import { faker } from '@faker-js/faker';

interface AddUserPanelProps {
    isOpen: boolean;
    onClose: () => void;
    userType: UserType;
    onAdd: (user: Omit<User, 'id'>) => void;
}

const AddUserPanel: React.FC<AddUserPanelProps> = ({ isOpen, onClose, userType, onAdd }) => {
    const title = `Add New ${userType.charAt(0).toUpperCase() + userType.slice(1, -1)}`;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        status: 'Active',
        role: 'Support Staff',
        zone: 'Muscat',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = () => {
        const baseUser = {
            name: formData.name,
            email: formData.email,
            avatar: faker.image.avatar(),
            status: formData.status,
        };

        let newUser: Omit<User, 'id'>;

        if (userType === 'customers') {
            newUser = { ...baseUser, joined: new Date().toLocaleDateString() };
        } else if (userType === 'delivery') {
            newUser = { ...baseUser, zone: formData.zone, rating: 5.0 };
        } else { // subAdmins
            newUser = { ...baseUser, role: formData.role, lastLogin: new Date().toLocaleString() };
        }
        
        onAdd(newUser);
    };
    
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">{title}</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <form className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" className="w-full mt-1 p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" className="w-full mt-1 p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                        <option>Blocked</option>
                                    </select>
                                </div>
                                {userType === 'subAdmins' && (
                                    <div>
                                        <label className="text-sm font-medium">Role</label>
                                        <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md">
                                            <option>Content Manager</option>
                                            <option>Order Processor</option>
                                            <option>Support Staff</option>
                                        </select>
                                    </div>
                                )}
                                {userType === 'delivery' && (
                                     <div>
                                        <label className="text-sm font-medium">Delivery Zone</label>
                                        <input type="text" name="zone" value={formData.zone} onChange={handleChange} placeholder="e.g. Muscat" className="w-full mt-1 p-2 border rounded-md" />
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
                            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold">Cancel</button>
                            <button onClick={handleCreate} className="px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">Create User</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddUserPanel;
