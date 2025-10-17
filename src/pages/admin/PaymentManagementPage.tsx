import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentSummaryCards from '../../components/admin/payments/PaymentSummaryCards';
import PaymentManagementTabs from '../../components/admin/payments/PaymentManagementTabs';
import TransactionDataTable from '../../components/admin/payments/TransactionDataTable';
import RefundDataTable from '../../components/admin/payments/RefundDataTable';
import RefundDetailModal from '../../components/admin/payments/RefundDetailModal';
import { generateTransactions, generateRefunds } from '../../utils/mockData';

export type Transaction = ReturnType<typeof generateTransactions>[0];
export type Refund = ReturnType<typeof generateRefunds>[0];
export type PaymentTab = 'transactions' | 'refunds';

const PaymentManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<PaymentTab>('transactions');
    const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);
    const [refunds, setRefunds] = useState(() => generateRefunds(10));
    const [transactions] = useState(() => generateTransactions(50));

    const handleViewRefund = (refund: Refund) => {
        setSelectedRefund(refund);
    };

    const handleCloseModal = () => {
        setSelectedRefund(null);
    };

    const handleUpdateRefundStatus = (refundId: string, status: 'Approved' | 'Rejected') => {
        setRefunds(prev => prev.map(r => r.id === refundId ? {...r, status} : r));
        handleCloseModal();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <h1 className="text-2xl font-bold text-gray-800">Payment & Transaction Management</h1>
            <PaymentSummaryCards />
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <PaymentManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'transactions' ? (
                    <TransactionDataTable transactions={transactions} />
                ) : (
                    <RefundDataTable refunds={refunds} onViewRefund={handleViewRefund} />
                )}
            </div>
            <RefundDetailModal refund={selectedRefund} onClose={handleCloseModal} onUpdateStatus={handleUpdateRefundStatus} />
        </motion.div>
    );
};

export default PaymentManagementPage;
