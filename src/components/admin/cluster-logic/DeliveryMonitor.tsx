import React from 'react';
import { Bike } from 'lucide-react';
import { deliveryPartnersList } from '../../../utils/mockData';

const DeliveryMonitor: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Bike /> Delivery Partner Monitor</h3>
            <div className="space-y-3 text-sm">
                {deliveryPartnersList.slice(0, 3).map(partner => (
                    <div key={partner.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <img src={partner.avatar} alt={partner.name} className="w-8 h-8 rounded-full" />
                            <span>{partner.name}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${partner.status === 'On-Duty' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {partner.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeliveryMonitor;
