import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Hash, DollarSign, Calendar } from 'lucide-react';
import { Refund } from '../../../pages/admin/PaymentManagementPage';

interface RefundDetailModalProps {
    refund: Refund | null;
    onClose: () => void;
    onUpdateStatus: (refundId: string, status: 'Approved' | 'Rejected') => void;
}

const RefundDetailModal: React.FC<RefundDetailModalProps> = ({ refund, onClose, onUpdateStatus }) => {
    return (
        <AnimatePresence>
            {refund && (
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
                        className="bg-white rounded-2xl w-full max-w-2xl flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Refund Details: {refund.id}</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X /></button>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3"><User size={18} className="text-gray-500"/><div><p className="text-xs text-gray-500">Customer</p><p className="font-medium">{refund.customer.name}</p></div></div>
                                <div className="flex items-center gap-3"><Hash size={18} className="text-gray-500"/><div><p className="text-xs text-gray-500">Order ID</p><p className="font-medium">{refund.orderId}</p></div></div>
                                <div className="flex items-center gap-3"><DollarSign size={18} className="text-gray-500"/><div><p className="text-xs text-gray-500">Amount</p><p className="font-medium text-red-600">OMR {refund.amount}</p></div></div>
                                <div className="flex items-center gap-3"><Calendar size={18} className="text-gray-500"/><div><p className="text-xs text-gray-500">Requested</p><p className="font-medium">{new Date(refund.requestDate).toLocaleString()}</p></div></div>
                            </div>
                            {/* Audit Trail */}
                            <div>
                                <h3 className="font-semibold mb-4">Audit Trail</h3>
                                <div className="relative pl-5">
                                    <div className="absolute left-[9px] top-0 h-full w-0.5 bg-gray-200"></div>
                                    {refund.auditTrail.map((item, index) => (
                                        <div key={index} className="mb-6 relative flex items-start">
                                            <div className={`absolute -left-[2px] top-1 w-4 h-4 rounded-full border-4 border-white ${index === refund.auditTrail.length - 1 ? 'bg-taiba-blue' : 'bg-gray-300'}`}></div>
                                            <div className="ml-6">
                                                <p className="font-semibold text-sm">{item.status}</p>
                                                <p className="text-xs text-gray-500">{item.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
                            {refund.status === 'Pending' ? (
                                <>
                                    <button onClick={() => onUpdateStatus(refund.id, 'Rejected')} className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold">Reject</button>
                                    <button onClick={() => onUpdateStatus(refund.id, 'Approved')} className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-semibold">Approve Refund</button>
                                </>
                            ) : (
                                <p className="text-sm font-medium text-gray-600">This refund has been {refund.status.toLowerCase()}.</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RefundDetailModal;
