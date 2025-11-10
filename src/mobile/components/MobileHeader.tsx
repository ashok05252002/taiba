import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, MapPin } from 'lucide-react';

const MobileHeader: React.FC = () => {
  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-taiba-purple" />
        <div>
          <p className="text-xs text-gray-500">Deliver to</p>
          <p className="text-sm font-bold">Muscat, Oman</p>
        </div>
      </div>
      <Link to="/" className="absolute left-1/2 -translate-x-1/2">
        <img
          src="public/images/taiba-pharmacy-new (1).png"
          alt="Taiba Pharmacy"
          className="h-10 w-auto"
        />
      </Link>
      <button className="relative p-2">
        <Bell size={24} className="text-gray-600" />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
    </header>
  );
};

export default MobileHeader;
