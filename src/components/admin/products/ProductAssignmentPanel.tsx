import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Warehouse } from '../../../pages/admin/ProductManagementPage';
import { Product } from '../../../types';

interface ProductAssignmentPanelProps {
    isOpen: boolean;
    onClose: () => void;
    warehouse: Warehouse | null;
    products: Product[];
}

const ProductAssignmentPanel: React.FC<ProductAssignmentPanelProps> = ({ isOpen, onClose, warehouse, products }) => {
    return (
        <AnimatePresence>
            {isOpen && warehouse && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Manage Products for {warehouse.name}</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={24} /></button>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <p className="text-sm text-gray-500 mb-4">Select products to assign to this warehouse.</p>
                            <div className="space-y-3">
                                {products.map(p => (
                                    <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" className="h-4 w-4 rounded text-taiba-blue focus:ring-taiba-blue" />
                                            <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover"/>
                                            <span className="text-sm font-medium">{p.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{p.category}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
                            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold">Cancel</button>
                            <button onClick={onClose} className="px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">Save Assignments</button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProductAssignmentPanel;
