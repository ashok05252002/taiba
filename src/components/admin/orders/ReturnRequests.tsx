import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { ReturnRequest } from '../../../pages/admin/OrderManagementPage';

interface ReturnRequestsProps {
    requests: ReturnRequest[];
    onUpdate: (returnId: string, status: 'Approved' | 'Rejected') => void;
}

const ReturnRequests: React.FC<ReturnRequestsProps> = ({ requests, onUpdate }) => {
    return (
        <div className="space-y-4">
            {requests.map(req => (
                <motion.div
                    key={req.id}
                    className="bg-gray-50 p-4 rounded-lg border"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{req.product.name}</p>
                            <p className="text-sm text-gray-500">Order: {req.orderId} | By: {req.customer.name}</p>
                            <p className="text-sm mt-2 p-2 bg-yellow-50 rounded-md"><strong>Reason:</strong> {req.reason}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => onUpdate(req.id, 'Rejected')} className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-md text-sm font-semibold">
                                <X size={16} /> Decline
                            </button>
                            <button onClick={() => onUpdate(req.id, 'Approved')} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-md text-sm font-semibold">
                                <Check size={16} /> Approve
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ReturnRequests;
