import React from 'react';
import { deliveryPartnersList } from '../../../utils/mockData';
import { MapPin } from 'lucide-react';

const DeliveryAssignmentMonitor: React.FC = () => {
    const activePartners = deliveryPartnersList.filter(p => p.status === 'On-Duty').slice(0, 4);

    return (
        <div className="p-4">
            <h3 className="font-semibold text-lg mb-4">Delivery Assignment Monitor</h3>
            <div className="space-y-3">
                {activePartners.map(partner => (
                    <div key={partner.id} className="p-3 bg-white rounded-lg border flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img src={partner.avatar} alt={partner.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-medium text-sm">{partner.name}</p>
                                <p className="text-xs text-gray-500">Delivering Order #TP12345</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                            <MapPin size={14} />
                            Live
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeliveryAssignmentMonitor;
