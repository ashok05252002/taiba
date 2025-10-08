import React from 'react';
import { Search, Bell } from 'lucide-react';

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 rounded-full px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-taiba-blue focus:outline-none"
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
