import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Heart, Settings, Award, MapPin, LogOut, Gift } from 'lucide-react';
import OrderHistory from '../components/profile/OrderHistory';
import Wishlist from '../components/profile/Wishlist';
import ProfileSettings from '../components/profile/ProfileSettings';
import LoyaltyPoints from '../components/profile/LoyaltyPoints';
import ManageAddresses from '../components/profile/ManageAddresses';
import MyGiftCards from '../components/profile/MyGiftCards';

type ProfileTab = 'orders' | 'wishlist' | 'settings' | 'addresses' | 'rewards' | 'gift-cards';

const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ProfileTab>('orders');

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return <OrderHistory />;
            case 'wishlist':
                return <Wishlist />;
            case 'settings':
                return <ProfileSettings />;
            case 'addresses':
                return <ManageAddresses />;
            case 'rewards':
                return <LoyaltyPoints />;
            case 'gift-cards':
                return <MyGiftCards />;
            default:
                return null;
        }
    };

    const tabs: { id: ProfileTab; name: string; icon: React.ElementType }[] = [
        { id: 'orders', name: 'My Orders', icon: ShoppingBag },
        { id: 'wishlist', name: 'Wishlist', icon: Heart },
        { id: 'rewards', name: 'Loyalty & Rewards', icon: Award },
        { id: 'gift-cards', name: 'My Gift Cards', icon: Gift },
        { id: 'addresses', name: 'Manage Addresses', icon: MapPin },
        { id: 'settings', name: 'Account Settings', icon: Settings },
    ];

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Account</h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                            <div className="flex items-center space-x-4 mb-8 border-b pb-6">
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
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left font-medium transition-all duration-200 ${
                                            activeTab === tab.id ? 'bg-taiba-purple text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        <tab.icon size={20} />
                                        <span>{tab.name}</span>
                                    </button>
                                ))}
                                <button
                                    className="w-full flex items-center space-x-3 p-3 rounded-lg text-left font-medium text-red-600 hover:bg-red-50 transition-colors mt-4"
                                >
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-2xl shadow-lg p-8 min-h-[500px]"
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
