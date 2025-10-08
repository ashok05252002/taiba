import React from 'react';
import { motion } from 'framer-motion';
import { Package, Map, CheckCircle, BarChart, ShieldCheck, ArrowUp, ArrowDown } from 'lucide-react';

const FeatureSection: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center gap-3 mb-3">
            <Icon className="text-taiba-purple" size={20} />
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
        </div>
        <div className="pl-8">{children}</div>
    </div>
);

const DeliveryAppOverview: React.FC = () => {
    return (
        <motion.div 
            className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <FeatureSection icon={Package} title="Order Assignment">
                <div className="flex items-center justify-between text-sm">
                    <p><strong>Assigned Partners:</strong> 35 / 45</p>
                    <p className="flex items-center gap-1 text-green-600"><CheckCircle size={14}/> Notifications Sent</p>
                </div>
            </FeatureSection>
            
            <FeatureSection icon={CheckCircle} title="Status Updates">
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2"><div className="w-20 text-right">Picked Up:</div><div className="flex-1 bg-gray-200 rounded-full h-4"><div className="bg-blue-400 h-4 rounded-full" style={{width: '80%'}}></div></div></div>
                    <div className="flex items-center gap-2"><div className="w-20 text-right">In-Transit:</div><div className="flex-1 bg-gray-200 rounded-full h-4"><div className="bg-purple-400 h-4 rounded-full" style={{width: '60%'}}></div></div></div>
                    <div className="flex items-center gap-2"><div className="w-20 text-right">Delivered:</div><div className="flex-1 bg-gray-200 rounded-full h-4"><div className="bg-green-400 h-4 rounded-full" style={{width: '95%'}}></div></div></div>
                </div>
            </FeatureSection>

            <FeatureSection icon={Map} title="Route Navigation">
                <div className="flex items-center justify-between text-sm">
                    <p><strong>Routes Initiated Today:</strong> 128</p>
                    <p className="text-red-600 font-semibold">1 Live Incident</p>
                </div>
            </FeatureSection>

            <FeatureSection icon={BarChart} title="Earnings Tracking">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><strong>This Week:</strong> OMR 450.00 <ArrowUp className="inline text-green-500" size={14}/></p>
                    <p><strong>This Month:</strong> OMR 1,820.00 <ArrowDown className="inline text-red-500" size={14}/></p>
                </div>
            </FeatureSection>

            <FeatureSection icon={ShieldCheck} title="Compliance Management">
                <div className="flex items-center justify-between text-sm">
                    <p><strong>Verified Partners:</strong> 45 / 45</p>
                    <p className="text-orange-500 font-semibold">2 licenses expiring soon</p>
                </div>
            </FeatureSection>
        </motion.div>
    );
};

export default DeliveryAppOverview;
