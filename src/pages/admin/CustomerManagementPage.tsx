import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UserDataTable from '../../components/admin/users/UserDataTable';
import { customerList } from '../../utils/mockData';
import { User } from './UserManagementPage';
import ConfirmationModal from '../../components/admin/ConfirmationModal';

const CustomerManagementPage: React.FC = () => {
    const [customers, setCustomers] = useState(customerList);
    const [deletingCustomer, setDeletingCustomer] = useState<User | null>(null);

    const handleDelete = (customer: User) => {
        setDeletingCustomer(customer);
    };

    const confirmDelete = () => {
        if (deletingCustomer) {
            setCustomers(prev => prev.filter(c => c.id !== deletingCustomer.id));
            setDeletingCustomer(null);
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
                <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <UserDataTable
                        data={customers}
                        onEditUser={() => {}} // No direct edit from this table, view details instead
                        onDeleteUser={handleDelete}
                        onAddUser={() => {}} // Add customer flow might be different
                        userType="customers"
                    />
                </div>
            </motion.div>
            <ConfirmationModal
                isOpen={!!deletingCustomer}
                onClose={() => setDeletingCustomer(null)}
                onConfirm={confirmDelete}
                title="Delete Customer"
                message={`Are you sure you want to delete this customer?`}
            />
        </>
    );
};

export default CustomerManagementPage;
