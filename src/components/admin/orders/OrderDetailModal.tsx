import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, CreditCard, Package, Bike } from 'lucide-react';
import { AdminOrder } from '../../../pages/admin/OrderManagementPage';
import LiveTrackingMap from './LiveTrackingMap';
import { storeLocations, deliveryPartnersList } from '../../../utils/mockData';

interface OrderDetailModalProps {
    order: AdminOrder | null;
    onClose: () => void;
    onUpdate: (order: AdminOrder) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose, onUpdate }) => {
    const [selectedBranchId, setSelectedBranchId] = useState('');
    const [selectedPartnerId, setSelectedPartnerId] = useState('');

    useEffect(() => {
        if (order) {
            setSelectedBranchId(order.branch.id);
            setSelectedPartnerId(order.deliveryPartner?.id || 'unassigned');
        }
    }, [order]);
    
    const handleConfirm = () => {
        if (!order) return;
        const updatedOrder = {
            ...order,
            branch: storeLocations.find(s => s.id === selectedBranchId) || order.branch,
            deliveryPartner: deliveryPartnersList.find(p => p.id === selectedPartnerId) || order.deliveryPartner,
            status: 'Processing',
        };
        onUpdate(updatedOrder as AdminOrder);
    };

    return (
        <AnimatePresence>
            {order && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-50 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
                            <h2 className="text-xl font-bold">Order Details: {order.id}</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column: Order Info */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2"><User size={18}/> Customer Details</h3>
                                    <p className="text-sm">{order.customer.name}</p>
                                    <p className="text-sm text-gray-500">{order.customer.email}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin size={18}/> Shipping Address</h3>
                                    <p className="text-sm text-gray-500">{order.shippingAddress}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2"><CreditCard size={18}/> Payment</h3>
                                    <p className="text-sm">Method: {order.paymentMethod}</p>
                                    <p className="text-sm font-bold">Total: OMR {order.total}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2"><Package size={18}/> Items Ordered</h3>
                                    <ul className="space-y-2 text-sm">
                                        {order.items.map(item => (
                                            <li key={item.id} className="flex justify-between">
                                                <span>{item.name} x{item.quantity || 1}</span>
                                                <span className="font-medium">OMR {item.price.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Right Column: Actions & Tracking */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white p-4 rounded-lg border grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium">Assign Branch</label>
                                        <select
                                            value={selectedBranchId}
                                            onChange={(e) => setSelectedBranchId(e.target.value)}
                                            className="w-full mt-1 p-2 border rounded-md text-sm"
                                        >
                                            {storeLocations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Assign Delivery Partner</label>
                                        <select
                                            value={selectedPartnerId}
                                            onChange={(e) => setSelectedPartnerId(e.target.value)}
                                            className="w-full mt-1 p-2 border rounded-md text-sm"
                                        >
                                            {deliveryPartnersList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <button onClick={handleConfirm} className="w-full bg-taiba-blue text-white py-2 rounded-lg font-semibold">Confirm & Reserve Stock</button>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border h-96">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2"><Bike size={18}/> Live Tracking</h3>
                                    <LiveTrackingMap />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OrderDetailModal;
