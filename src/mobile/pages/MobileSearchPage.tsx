import React from 'react';
import { Search } from 'lucide-react';

const MobileSearchPage: React.FC = () => {
  return (
    <div className="p-4">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for medicines, health products..."
          className="w-full bg-white rounded-full py-3 pl-10 pr-4 focus:ring-2 focus:ring-taiba-blue border"
        />
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="text-center text-gray-500 mt-20">
        <p>Search for your favorite products.</p>
      </div>
    </div>
  );
};

export default MobileSearchPage;
