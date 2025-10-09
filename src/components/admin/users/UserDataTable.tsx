import React, { useState } from 'react';
import { User, UserType } from '../../../pages/admin/UserManagementPage';
import UserTableFilters from './UserTableFilters';
import { MoreVertical, Eye, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface UserDataTableProps {
    data: User[];
    onEditUser: (user: User) => void;
    onDeleteUser: (user: User) => void;
    onAddUser: () => void;
    userType: UserType | 'delivery' | 'customers';
    onViewDetails?: (user: User) => void;
}

const UserDataTable: React.FC<UserDataTableProps> = ({ data, onEditUser, onDeleteUser, onAddUser, userType, onViewDetails }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [actionMenu, setActionMenu] = useState<string | null>(null);

    const filteredData = data.filter(user => {
        const name = 'name' in user ? user.name.toLowerCase() : '';
        const email = 'email' in user ? user.email.toLowerCase() : '';
        const matchesSearch = name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || ('status' in user && user.status.toLowerCase() === statusFilter);
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'on-duty':
                return 'bg-green-100 text-green-800';
            case 'blocked':
            case 'inactive':
                return 'bg-red-100 text-red-800';
            case 'offline':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getColumns = () => {
        const base = [
            { header: 'User', accessor: 'name' },
            { header: 'Status', accessor: 'status' },
        ];
        if (userType === 'delivery') {
            base.push({ header: 'Zone', accessor: 'zone' });
            base.push({ header: 'Rating', accessor: 'rating' });
        }
        if (userType === 'subAdmins') {
            base.push({ header: 'Role', accessor: 'role' });
        }
        if (userType === 'customers') {
            base.push({ header: 'Joined Date', accessor: 'joined' });
        }
        base.push({ header: 'Actions', accessor: 'actions' });
        return base;
    }

    const columns = getColumns();

    return (
        <div>
            <UserTableFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onAddUser={onAddUser}
            />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map(col => (
                                <th key={col.header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {user.avatar ? (
                                                <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <UserIcon size={20} className="text-gray-500" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{'name' in user && user.name}</div>
                                            <div className="text-sm text-gray-500">{'email' in user && user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {'status' in user && (
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    )}
                                </td>
                                {userType === 'delivery' && 'zone' in user && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.zone}</td>
                                )}
                                 {userType === 'delivery' && 'rating' in user && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.rating} ★</td>
                                )}
                                {userType === 'subAdmins' && 'role' in user && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                )}
                                {userType === 'customers' && 'joined' in user && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                    <button onClick={() => onViewDetails && onViewDetails(user)} className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100 inline-block">
                                        <Eye size={16} />
                                    </button>
                                    <button onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full">
                                        <MoreVertical size={20} />
                                    </button>
                                    <AnimatePresence>
                                        {actionMenu === user.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border"
                                            >
                                                <div className="py-1">
                                                    <button onClick={() => { onEditUser(user); setActionMenu(null); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</button>
                                                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{'status' in user && user.status.toLowerCase() !== 'blocked' ? 'Block' : 'Unblock'}</button>
                                                    <button onClick={() => { onDeleteUser(user); setActionMenu(null); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDataTable;
