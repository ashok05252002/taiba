import React from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, ShoppingCart, Tag, CreditCard, Truck, User, BarChart } from 'lucide-react';

const FeatureSection: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center gap-3 mb-3">
            <Icon className="text-taiba-blue" size={20} />
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        </div>
        {children}
    </div>
);

const CustomerAppOverview: React.FC = () => {
    return (
        <motion.div 
            className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FeatureSection icon={Search} title="Product Browsing">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <p className="text-sm"><strong>2,345</strong> Products Available</p>
                    <div className="w-1/2 h-8 bg-white border rounded-full flex items-center px-3">
                        <Search size={14} className="text-gray-400 mr-2"/>
                        <span className="text-xs text-gray-400">Search products...</span>
                    </div>
                </div>
            </FeatureSection>

            <FeatureSection icon={Upload} title="Prescription Uploads">
                <div className="flex gap-4">
                    <div className="flex-1 p-3 bg-yellow-50 rounded-md text-center">
                        <p className="font-bold text-xl text-yellow-700">12</p>
                        <p className="text-xs text-yellow-600">Pending Approval</p>
                    </div>
                    <div className="flex-1 p-3 bg-green-50 rounded-md text-center">
                        <p className="font-bold text-xl text-green-700">128</p>
                        <p className="text-xs text-green-600">Approved (Last 7d)</p>
                    </div>
                </div>
            </FeatureSection>

            <FeatureSection icon={ShoppingCart} title="Shopping Cart">
                 <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 bg-gray-50 rounded-md"><p className="font-bold">89</p><p className="text-xs">Active Carts</p></div>
                    <div className="p-2 bg-gray-50 rounded-md"><p className="font-bold">45</p><p className="text-xs">Abandoned Carts</p></div>
                    <div className="p-2 bg-gray-50 rounded-md"><p className="font-bold">345</p><p className="text-xs">Completed (24h)</p></div>
                </div>
            </FeatureSection>

            <FeatureSection icon={Tag} title="Promotion Application">
                <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">15% OFF (Active)</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Free Delivery (Active)</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">BOGO (Active)</span>
                </div>
            </FeatureSection>

            <FeatureSection icon={CreditCard} title="Payment Options">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <span className="text-xs font-semibold border px-2 py-1 rounded-md">Card</span>
                        <span className="text-xs font-semibold border px-2 py-1 rounded-md">Wallet</span>
                        <span className="text-xs font-semibold border px-2 py-1 rounded-md">COD</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Card: 75%</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">COD: 25%</span>
                    </div>
                </div>
            </FeatureSection>

            <FeatureSection icon={Truck} title="Order Tracking">
                <div className="flex items-center text-xs text-center">
                    <div className="flex-1"><p className="font-bold">5</p><p>Placed</p></div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                    <div className="flex-1"><p className="font-bold">12</p><p>Processing</p></div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                    <div className="flex-1"><p className="font-bold">34</p><p>Dispatched</p></div>
                    <div className="flex-1 h-0.5 bg-gray-200"></div>
                    <div className="flex-1"><p className="font-bold">280</p><p>Delivered</p></div>
                </div>
            </FeatureSection>

            <FeatureSection icon={User} title="Profile Management">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><strong>Recent Profile Changes:</strong> 15 (last 24h)</p>
                    <p><strong>Address Updates:</strong> 8 (last 24h)</p>
                </div>
            </FeatureSection>
        </motion.div>
    );
};

export default CustomerAppOverview;
