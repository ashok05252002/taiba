import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';

const MobileProfilePage: React.FC = () => {
    const menuItems = [
        { icon: User, label: 'Account Details', path: '#' },
        { icon: ShoppingBag, label: 'My Orders', path: '#' },
        { icon: Heart, label: 'My Wishlist', path: '#' },
        { icon: Settings, label: 'Settings', path: '#' },
    ];

    return (
        <div className="p-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg mb-6">
                <img src="https://i.pravatar.cc/80" alt="User" className="w-16 h-16 rounded-full" />
                <div>
                    <h1 className="text-xl font-bold">Admin User</h1>
                    <p className="text-sm text-gray-500">admin@taiba.com</p>
                </div>
            </div>

            <div className="bg-white rounded-lg">
                {menuItems.map(item => (
                    <Link to={item.path} key={item.label} className="flex justify-between items-center p-4 border-b last:border-b-0">
                        <div className="flex items-center gap-4">
                            <item.icon size={22} className="text-gray-600" />
                            <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                    </Link>
                ))}
            </div>

            <div className="mt-6">
                 <button className="w-full flex justify-between items-center p-4 bg-white rounded-lg">
                    <div className="flex items-center gap-4 text-red-500">
                        <LogOut size={22} />
                        <span className="font-medium">Logout</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default MobileProfilePage;
