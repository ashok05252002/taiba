import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Move } from 'lucide-react';
import { Warehouse } from '../../../pages/admin/ProductManagementPage';
import { Product } from '../../../types';

interface StockTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  warehouses: Warehouse[];
  products: Product[];
  onTransfer: (from: string, to: string, product: string, quantity: number) => void;
}

const StockTransferModal: React.FC<StockTransferModalProps> = ({ isOpen, onClose, warehouses, products, onTransfer }) => {
  const [fromWarehouse, setFromWarehouse] = useState('');
  const [toWarehouse, setToWarehouse] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleTransfer = () => {
    if (!fromWarehouse || !toWarehouse || !product || quantity <= 0) {
        alert('Please fill all fields');
        return;
    }
    onTransfer(fromWarehouse, toWarehouse, product, quantity);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Move /> Initiate Stock Transfer</h2>
            <div className="space-y-4">
                <select value={fromWarehouse} onChange={e => setFromWarehouse(e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="">From Warehouse...</option>
                    {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
                <select value={toWarehouse} onChange={e => setToWarehouse(e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="">To Warehouse...</option>
                    {warehouses.filter(w => w.id !== fromWarehouse).map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
                <select value={product} onChange={e => setProduct(e.target.value)} className="w-full p-2 border rounded-md">
                    <option value="">Select Product...</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" placeholder="Quantity" className="w-full p-2 border rounded-md" />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold">Cancel</button>
              <button onClick={handleTransfer} className="px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">Initiate Transfer</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StockTransferModal;
