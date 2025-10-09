import React from 'react';
import { User, Mail, Shield, Calendar, Clock } from 'lucide-react';

type SubAdmin = {
    name: string;
    avatar: string;
    email: string;
    role: string;
    status: string;
    joinedDate: string;
    lastLogin: string;
};

interface SubAdminProfileCardProps {
    subAdmin: SubAdmin;
}

const SubAdminProfileCard: React.FC<SubAdminProfileCardProps> = ({ subAdmin }) => {
    const getStatusColor = (status: string) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm h-full">
            <div className="flex flex-col items-center text-center">
                <img src={subAdmin.avatar} alt={subAdmin.name} className="w-24 h-24 rounded-full mb-4" />
                <h2 className="text-xl font-bold">{subAdmin.name}</h2>
                <span className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(subAdmin.status)}`}>
                    {subAdmin.status}
                </span>
            </div>
            <div className="mt-6 space-y-3 text-sm text-gray-600 border-t pt-6">
                <div className="flex items-center gap-3"><Mail size={16} /><a href={`mailto:${subAdmin.email}`} className="hover:underline">{subAdmin.email}</a></div>
                <div className="flex items-center gap-3"><Shield size={16} /><span>{subAdmin.role}</span></div>
                <div className="flex items-center gap-3"><Calendar size={16} /><span>Joined: {subAdmin.joinedDate}</span></div>
                <div className="flex items-center gap-3"><Clock size={16} /><span>Last Login: {subAdmin.lastLogin}</span></div>
            </div>
        </div>
    );
};

export default SubAdminProfileCard;
