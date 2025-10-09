import React from 'react';
import { Mail, Phone, MapPin, Calendar, Shield, Info } from 'lucide-react';

type Partner = {
    name: string;
    avatar: string;
    email: string;
    status: string;
    joinedDate: string;
    zone: string;
    phone: string;
    licenseNumber: string;
    licenseExpiry: string;
};

interface PartnerOverviewProps {
    partner: Partner;
}

const PartnerOverview: React.FC<PartnerOverviewProps> = ({ partner }) => {
    const getStatusColor = (status: string) => {
        return status === 'On-Duty' ? 'bg-green-100 text-green-800' : status === 'Blocked' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800';
    };

    const isLicenseExpiring = new Date(partner.licenseExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6 p-4 bg-white rounded-lg border">
                <img src={partner.avatar} alt={partner.name} className="w-20 h-20 rounded-full" />
                <div>
                    <h2 className="text-xl font-bold">{partner.name}</h2>
                    <span className={`mt-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(partner.status)}`}>
                        {partner.status}
                    </span>
                </div>
            </div>
            <div className="p-4 bg-white rounded-lg border space-y-3 text-sm">
                <div className="flex items-center gap-3"><Mail size={16} className="text-gray-500"/><span>{partner.email}</span></div>
                <div className="flex items-center gap-3"><Phone size={16} className="text-gray-500"/><span>{partner.phone}</span></div>
                <div className="flex items-center gap-3"><MapPin size={16} className="text-gray-500"/><span>Zone: {partner.zone}</span></div>
                <div className="flex items-center gap-3"><Calendar size={16} className="text-gray-500"/><span>Joined: {partner.joinedDate}</span></div>
                <div className={`flex items-center gap-3 ${isLicenseExpiring ? 'text-red-600' : ''}`}>
                    <Shield size={16} className={isLicenseExpiring ? '' : 'text-gray-500'}/>
                    <span>License: {partner.licenseNumber} (Expires: {partner.licenseExpiry})</span>
                    {isLicenseExpiring && <Info size={16} title="License is expiring soon" />}
                </div>
            </div>
        </div>
    );
};

export default PartnerOverview;
