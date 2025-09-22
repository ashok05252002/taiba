import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones } from 'lucide-react';

interface PromotionalToastProps {
  isVisible: boolean;
}

const PromotionalToast: React.FC<PromotionalToastProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center space-x-4 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Headphones className="text-taiba-pistachio" />
          <p className="font-medium">24/7 Expert Support Available via WhatsApp!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromotionalToast;
