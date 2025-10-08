import React from 'react';
import { StoreLocation } from '../../../pages/admin/StoreManagementPage';
import { MapPin, Phone } from 'lucide-react';

interface StoreDetailHeaderProps {
    store: StoreLocation;
}

const StoreDetailHeader: React.FC<StoreDetailHeaderProps> = ({ store }) => {
    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{store.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={14}/> {store.address}</span>
                        <span className="flex items-center gap-1"><Phone size={14}/> {store.phone}</span>
                    </div>
                </div>
                <button className="px-4 py-2 bg-taiba-blue text-white rounded-full text-sm font-semibold">Edit Store Details</button>
            </div>
        </div>
    );
};

export default StoreDetailHeader;
