import React from 'react';
import { User, Calendar, MapPin } from 'lucide-react';

type Partner = {
    name: string;
    avatar: string;
    status: string;
    joinedDate: string;
    zone: string;
};

interface PartnerDetailHeaderProps {
    partner: Partner;
}

const PartnerDetailHeader: React.FC<PartnerDetailHeaderProps> = ({ partner }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'on-duty': return 'bg-green-100 text-green-800';
            case 'offline': return 'bg-gray-100 text-gray-800';
            case 'blocked': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <img src={partner.avatar} alt={partner.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-2xl font-bold text-gray-800">{partner.name}</h1>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(partner.status)}`}>
                            {partner.status}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={14} /> Joined: {partner.joinedDate}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> Zone: {partner.zone}</span>
                    </div>
                </div>
                 <button className="px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">Edit Partner</button>
            </div>
        </div>
    );
};

export default PartnerDetailHeader;
