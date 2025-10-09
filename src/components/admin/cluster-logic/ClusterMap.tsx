import React from 'react';
import { MapPin } from 'lucide-react';
import { storeLocations } from '../../../utils/mockData';

const clusterColors: Record<string, string> = {
    'Muscat Central': 'text-taiba-blue',
    'Dhofar': 'text-taiba-purple',
    'Al Batinah North': 'text-green-500',
    'Ad Dakhiliyah': 'text-orange-500',
};

const ClusterMap: React.FC = () => {
    const positions = [
        { top: '33%', left: '50%' },
        { top: '75%', left: '25%' },
        { top: '25%', left: '33%' },
        { top: '50%', left: '70%' },
    ];

    return (
        <div className="w-full h-96 bg-gray-200 rounded-md relative overflow-hidden">
            <img src="/assets/images/maps/oman-map-placeholder.png" alt="Oman Map" className="w-full h-full object-cover rounded-md opacity-50" />
            {storeLocations.map((store, index) => (
                <div key={store.id} className="absolute text-center cursor-pointer group" style={positions[index]}>
                    <MapPin className={`${clusterColors[store.zone] || 'text-gray-600'} group-hover:scale-125 transition-transform`} size={32}/>
                    <span className="text-xs font-bold bg-white/80 px-2 py-1 rounded-md shadow-md whitespace-nowrap">{store.name}</span>
                </div>
            ))}
        </div>
    );
};

export default ClusterMap;
