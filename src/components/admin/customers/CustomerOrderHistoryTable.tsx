import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

type Order = {
    id: string;
    date: string;
    status: string;
    total: string;
    items: { id: string; name: string; image: string; price: number; quantity?: number }[];
};

interface CustomerOrderHistoryTableProps {
    orders: Order[];
}

const CustomerOrderHistoryTable: React.FC<CustomerOrderHistoryTableProps> = ({ orders }) => {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="w-12"></th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => (
                        <React.Fragment key={order.id}>
                            <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                                <td className="px-4 py-4">
                                    {expandedOrder === order.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-taiba-blue">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">OMR {order.total}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                            <AnimatePresence>
                                {expandedOrder === order.id && (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td colSpan={5} className="p-0">
                                            <div className="p-4 bg-gray-50">
                                                <h4 className="font-semibold text-sm mb-2">Items in this order:</h4>
                                                <ul className="space-y-2">
                                                    {order.items.map(item => (
                                                        <li key={item.id} className="flex items-center gap-3 text-sm">
                                                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover"/>
                                                            <span className="flex-1">{item.name}</span>
                                                            <span>Qty: {item.quantity || 1}</span>
                                                            <span className="font-medium">OMR {item.price.toFixed(2)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )}
                            </AnimatePresence>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerOrderHistoryTable;
