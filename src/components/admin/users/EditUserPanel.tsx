import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { User } from '../../../pages/admin/UserManagementPage';

interface EditUserPanelProps {
    user: User | null;
    onClose: () => void;
    onSave: (user: User) => void;
}

const EditUserPanel: React.FC<EditUserPanelProps> = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState<User | null>(null);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (formData) {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSave = () => {
        if (formData) {
            onSave(formData);
        }
    };

    return (
        <AnimatePresence>
            {user && formData && (
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
                            <h2 className="text-xl font-bold">Edit User</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="text-center mb-6">
                                <img src={formData.avatar} alt="avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
                                <h3 className="text-lg font-semibold">{'name' in formData && formData.name}</h3>
                                <p className="text-sm text-gray-500">{'email' in formData && formData.email}</p>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Name</label>
                                    <input type="text" name="name" value={'name' in formData ? formData.name : ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <select name="status" value={'status' in formData ? formData.status : ''} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md">
                                        <option>Active</option>
                                        <option>Blocked</option>
                                        <option>On-Duty</option>
                                        <option>Offline</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                                {'role' in formData && (
                                    <div>
                                        <label className="text-sm font-medium">Role</label>
                                        <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md">
                                            <option>Content Manager</option>
                                            <option>Order Processor</option>
                                            <option>Support Staff</option>
                                        </select>
                                    </div>
                                )}
                                {'zone' in formData && (
                                     <div>
                                        <label className="text-sm font-medium">Delivery Zone</label>
                                        <input type="text" name="zone" value={formData.zone} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
                            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold">Cancel</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">Save Changes</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditUserPanel;
