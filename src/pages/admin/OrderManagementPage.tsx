import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderSummaryCards from '../../components/admin/orders/OrderSummaryCards';
import OrderManagementTabs from '../../components/admin/orders/OrderManagementTabs';
import OrderDataTable from '../../components/admin/orders/OrderDataTable';
import ReturnRequests from '../../components/admin/orders/ReturnRequests';
import OrderDetailModal from '../../components/admin/orders/OrderDetailModal';
import { generateAdminOrders, generateReturnRequests } from '../../utils/mockData';

export type AdminOrder = ReturnType<typeof generateAdminOrders>[0];
export type ReturnRequest = ReturnType<typeof generateReturnRequests>[0];
export type OrderTab = 'orders' | 'returns';

const OrderManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<OrderTab>('orders');
    const [orders, setOrders] = useState(() => generateAdminOrders(30));
    const [returns, setReturns] = useState(() => generateReturnRequests(5));
    const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

    const handleViewOrder = (order: AdminOrder) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleUpdateOrder = (updatedOrder: AdminOrder) => {
        setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
        setSelectedOrder(updatedOrder); 
    };

    const handleUpdateReturn = (returnId: string, status: 'Approved' | 'Rejected') => {
        alert(`Return ${returnId} has been ${status}.`);
        setReturns(prev => prev.filter(r => r.id !== returnId));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800">Order & Delivery Management</h1>
            <OrderSummaryCards />
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <OrderManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'orders' ? (
                    <OrderDataTable orders={orders} onViewOrder={handleViewOrder} />
                ) : (
                    <ReturnRequests requests={returns} onUpdate={handleUpdateReturn} />
                )}
            </div>
            <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} onUpdate={handleUpdateOrder} />
        </motion.div>
    );
};

export default OrderManagementPage;
