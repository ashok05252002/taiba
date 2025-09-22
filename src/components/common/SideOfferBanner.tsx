import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SideOfferBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

const SideOfferBanner: React.FC<SideOfferBannerProps> = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-24 left-6 z-[100] w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
            <div className="absolute top-0 right-0 p-2 z-10">
                <button onClick={onClose} className="w-7 h-7 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/40">
                    <X size={16} />
                </button>
            </div>
          <div className="p-6 text-center">
            <Tag className="mx-auto text-taiba-purple mb-3" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">First-Time Shopper?</h3>
            <p className="text-taiba-grey mb-4">Get <span className="font-bold text-taiba-purple">15% OFF</span> your first order with code: <span className="font-bold bg-taiba-mustard/50 px-1 rounded">WELCOME15</span></p>
            <Link to="/products">
                <motion.button 
                    className="w-full bg-taiba-purple text-white py-2 rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Shop Now
                </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideOfferBanner;
