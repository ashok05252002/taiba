import React from 'react';
import { motion } from 'framer-motion';
import { generateOrderHistory } from '../../utils/mockData';
import { Package, RefreshCw, Eye } from 'lucide-react';

const OrderHistory = () => {
    const orders = generateOrderHistory(5);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            <div className="space-y-4">
                {orders.map((order, index) => (
                    <motion.div 
                        key={order.id}
                        className="bg-gray-50 p-4 rounded-xl border"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <div>
                                <p className="font-bold text-lg">Order #{order.id}</p>
                                <p className="text-sm text-taiba-grey">Date: {order.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>{order.status}</p>
                                <p className="font-bold text-lg">OMR {order.total}</p>
                                <div className="flex gap-2">
                                    <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"><Eye size={18} /></button>
                                    <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"><RefreshCw size={18} /></button>
                                </div>
                            </div>
                        </div>
                        <div className="border-t my-3"></div>
                        <div className="flex items-center space-x-3">
                            <p className="text-sm font-medium">Items:</p>
                            <div className="flex space-x-2">
                                {order.items.map(item => (
                                    <img key={item.id} src={item.image} alt={item.name} title={item.name} className="w-12 h-12 rounded-md object-cover border" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
