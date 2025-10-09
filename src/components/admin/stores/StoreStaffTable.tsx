import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { StaffMember } from '../../../pages/admin/StoreManagementPage';

interface StoreStaffTableProps {
    staff: StaffMember[];
    onRemove: (staffId: string) => void;
    onEdit: (staff: StaffMember) => void;
}

const StoreStaffTable: React.FC<StoreStaffTableProps> = ({ staff, onRemove, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {staff.map(member => (
                        <tr key={member.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button onClick={() => onEdit(member)} className="p-2 text-gray-500 hover:text-taiba-blue rounded-full hover:bg-gray-100"><Edit size={16} /></button>
                                <button onClick={() => onRemove(member.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoreStaffTable;
