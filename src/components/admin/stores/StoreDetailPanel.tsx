import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Package, ShoppingBag, BarChart, FileText, MapPin, Phone, Clock } from 'lucide-react';
import { StoreLocation } from '../../../pages/admin/StoreManagementPage';
import StoreInventoryTable from './StoreInventoryTable';
import ReactECharts from 'echarts-for-react';

interface StoreDetailPanelProps {
    store: StoreLocation | null;
    onClose: () => void;
}

type StoreDetailTab = 'overview' | 'staff' | 'inventory' | 'orders' | 'performance' | 'documents';

const StoreDetailPanel: React.FC<StoreDetailPanelProps> = ({ store, onClose }) => {
    const [activeTab, setActiveTab] = useState<StoreDetailTab>('overview');

    const tabs: { id: StoreDetailTab; name: string; icon: React.ElementType }[] = [
        { id: 'overview', name: 'Overview', icon: MapPin },
        { id: 'staff', name: 'Staff', icon: Users },
        { id: 'inventory', name: 'Inventory', icon: Package },
        { id: 'orders', name: 'Orders', icon: ShoppingBag },
        { id: 'performance', name: 'Performance', icon: BarChart },
        { id: 'documents', name: 'Documents', icon: FileText },
    ];
    
    const performanceChartOption = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value' },
        series: [{ data: [820, 932, 901, 934, 1290, 1330, 1320], type: 'line', smooth: true }]
    };

    const renderTabContent = () => {
        if (!store) return null;
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3"><Phone size={16} className="text-gray-500"/><span>{store.phone}</span></div>
                            <div className="flex items-center gap-3"><Clock size={16} className="text-gray-500"/><span>{store.hours}</span></div>
                            <div className="flex items-center gap-3"><span className="font-semibold">Branch Code:</span><span>{store.branchCode}</span></div>
                            <div className="flex items-center gap-3"><span className="font-semibold">Opened:</span><span>{store.dateOpened}</span></div>
                        </div>
                        <div className="h-48 bg-gray-200 rounded-md overflow-hidden">
                             <img src="/assets/images/maps/oman-map-placeholder.png" alt="Map" className="w-full h-full object-cover opacity-70" />
                        </div>
                    </div>
                );
            case 'staff':
                return (
                    <ul className="space-y-3">
                        {store.staff.map(member => (
                            <li key={member.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-xs text-gray-500">{member.role}</p>
                                </div>
                                <p className="text-sm text-gray-600">{member.phone}</p>
                            </li>
                        ))}
                    </ul>
                );
            case 'inventory':
                return <StoreInventoryTable inventory={store.inventory} />;
            case 'orders':
                return (
                    <ul className="space-y-3">
                        {store.orders.slice(0, 5).map(order => (
                            <li key={order.id} className="p-3 bg-gray-50 rounded-md text-sm">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-taiba-blue">{order.id}</span>
                                    <span>OMR {order.total}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>{order.customer.name}</span>
                                    <span>{new Date(order.date).toLocaleDateString()}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                );
            case 'performance':
                return <ReactECharts option={performanceChartOption} style={{ height: '300px' }} />;
            case 'documents':
                 return (
                    <ul className="space-y-3">
                        {store.documents.map(doc => (
                            <li key={doc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-xs text-gray-500">Expires: {doc.expiry}</p>
                                </div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${doc.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{doc.status}</span>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {store && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-40"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-4xl bg-white z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
                            <div>
                                <h2 className="text-xl font-bold">{store.name}</h2>
                                <p className="text-sm text-gray-500">{store.address}</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={24} /></button>
                        </div>
                        <div className="flex-1 flex overflow-hidden">
                            <nav className="w-48 border-r p-4">
                                <ul className="space-y-1">
                                    {tabs.map(tab => (
                                        <li key={tab.id}>
                                            <button
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center gap-3 p-2 rounded-md text-sm font-medium ${activeTab === tab.id ? 'bg-blue-100 text-taiba-blue' : 'hover:bg-gray-100'}`}
                                            >
                                                <tab.icon size={16} />
                                                {tab.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <main className="flex-1 p-6 overflow-y-auto">
                                {renderTabContent()}
                            </main>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StoreDetailPanel;
