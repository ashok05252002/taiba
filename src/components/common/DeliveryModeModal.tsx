import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, Store, MapPin, PlusCircle } from 'lucide-react';
import { useOrder } from '../../contexts/OrderContext';

interface DeliveryModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'delivery' | 'takeaway') => void;
  onAddNewAddress: () => void;
}

const DeliveryModeModal: React.FC<DeliveryModeModalProps> = ({ isOpen, onClose, onSelectMode, onAddNewAddress }) => {
  const { allAddresses } = useOrder();
  const [view, setView] = useState<'initial' | 'delivery'>('initial');

  const handleSelectDelivery = () => {
    // Simulate getting current location
    alert("Getting your current location... For now, please select from your saved addresses or add a new one.");
    setView('delivery');
  };

  const handleSelectTakeaway = () => {
    onSelectMode('takeaway');
    onClose();
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setView('initial'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
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
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <X size={24} />
            </motion.button>
            
            <AnimatePresence mode="wait">
              {view === 'initial' && (
                <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">How would you like to get your order?</h2>
                  <p className="text-taiba-grey mb-8 text-center">Choose an option for accurate product availability.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.button onClick={handleSelectDelivery} className="p-6 border-2 rounded-xl text-center hover:border-taiba-blue hover:bg-blue-50" whileHover={{ y: -5 }}>
                          <Truck size={40} className="mx-auto text-taiba-blue mb-3" />
                          <h3 className="text-xl font-bold">Delivery</h3>
                      </motion.button>
                      <motion.button onClick={handleSelectTakeaway} className="p-6 border-2 rounded-xl text-center hover:border-taiba-purple hover:bg-purple-50" whileHover={{ y: -5 }}>
                          <Store size={40} className="mx-auto text-taiba-purple mb-3" />
                          <h3 className="text-xl font-bold">Takeaway</h3>
                      </motion.button>
                  </div>
                </motion.div>
              )}
              {view === 'delivery' && (
                <motion.div key="delivery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Delivery Address</h2>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {allAddresses.map(addr => (
                      <button key={addr.id} onClick={() => { onSelectMode('delivery'); onClose(); }} className="w-full text-left p-3 border-2 rounded-lg flex items-start gap-3 hover:bg-gray-50">
                        <MapPin size={18} className="mt-1 text-gray-500" />
                        <div>
                          <p className="font-semibold">{addr.name}</p>
                          <p className="text-sm text-gray-600">{addr.address}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => { onAddNewAddress(); onClose(); }} className="w-full flex items-center justify-center gap-2 text-taiba-blue font-semibold mt-4 p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <PlusCircle size={20} />
                    Add a New Address
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeliveryModeModal;
