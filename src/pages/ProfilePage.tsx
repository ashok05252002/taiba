import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShoppingBag, Heart, Settings, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('orders');

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return <div className="p-6 bg-gray-100 rounded-xl">Your past orders will appear here.</div>;
            case 'wishlist':
                return <div className="p-6 bg-gray-100 rounded-xl">Your wishlist is empty.</div>;
            case 'settings':
                return <div className="p-6 bg-gray-100 rounded-xl">Account settings and preferences.</div>;
            default:
                return null;
        }
    };

    const tabs = [
        { id: 'orders', name: 'My Orders', icon: ShoppingBag },
        { id: 'wishlist', name: 'Wishlist', icon: Heart },
        { id: 'settings', name: 'Settings', icon: Settings },
    ];

    return (
        <div className="bg-white py-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Account</h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 bg-taiba-pistachio rounded-full flex items-center justify-center">
                                    <User size={32} className="text-black" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-xl">Ahmed Ali</h2>
                                    <p className="text-sm text-taiba-grey">ahmed.ali@email.com</p>
                                </div>
                            </div>
                            <nav className="space-y-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-medium transition-colors ${
                                            activeTab === tab.id ? 'bg-taiba-pistachio text-black' : 'hover:bg-gray-200'
                                        }`}
                                    >
                                        <tab.icon size={20} />
                                        <span>{tab.name}</span>
                                    </button>
                                ))}
                                <button
                                    className="w-full flex items-center space-x-3 p-3 rounded-lg text-left font-medium text-red-600 hover:bg-red-100 transition-colors"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
