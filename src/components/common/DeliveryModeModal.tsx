import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, Store } from 'lucide-react';

interface DeliveryModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'delivery' | 'takeaway') => void;
}

const DeliveryModeModal: React.FC<DeliveryModeModalProps> = ({ isOpen, onClose, onSelectMode }) => {
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
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative text-center"
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
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How would you like to get your order?</h2>
            <p className="text-taiba-grey mb-8">Choose an option to get the most accurate product availability and delivery times.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.button
                    onClick={() => onSelectMode('delivery')}
                    className="p-6 border-2 border-gray-200 rounded-xl text-center hover:border-taiba-blue hover:bg-blue-50 transition-all"
                    whileHover={{ y: -5 }}
                >
                    <Truck size={40} className="mx-auto text-taiba-blue mb-3" />
                    <h3 className="text-xl font-bold">Delivery</h3>
                    <p className="text-sm text-taiba-grey">Get items delivered to your doorstep.</p>
                </motion.button>
                <motion.button
                    onClick={() => onSelectMode('takeaway')}
                    className="p-6 border-2 border-gray-200 rounded-xl text-center hover:border-taiba-purple hover:bg-purple-50 transition-all"
                    whileHover={{ y: -5 }}
                >
                    <Store size={40} className="mx-auto text-taiba-purple mb-3" />
                    <h3 className="text-xl font-bold">Takeaway</h3>
                    <p className="text-sm text-taiba-grey">Pick up from your nearest store.</p>
                </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeliveryModeModal;
