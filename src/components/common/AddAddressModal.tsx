import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useOrder } from '../../contexts/OrderContext';

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose }) => {
  const { addAddress } = useOrder();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddAddress = () => {
    if (name && address && phone) {
      addAddress({
        id: crypto.randomUUID(),
        isDefault: false,
        type: 'Home',
        name,
        address,
        phone,
      });
      onClose();
      // Reset form
      setName('');
      setAddress('');
      setPhone('');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <X size={24} />
            </motion.button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Delivery Address</h2>
            <form className="space-y-4">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address (e.g., Al Khuwair, Muscat)" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
              <motion.button
                type="button"
                onClick={handleAddAddress}
                className="w-full bg-taiba-blue text-white py-3 rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Address
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddAddressModal;
