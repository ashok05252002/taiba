import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppFloat: React.FC = () => {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.a
        href="https://wa.me/968XXXXXXXX?text=Hello%20Taiba%20Pharmacy!%20I%20need%20help."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-16 h-16 bg-green-500 rounded-full shadow-lg flex items-center justify-center"
          animate={{ 
            boxShadow: [
              '0 4px 20px rgba(34, 197, 94, 0.4)',
              '0 8px 30px rgba(34, 197, 94, 0.6)',
              '0 4px 20px rgba(34, 197, 94, 0.4)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904"
            alt="WhatsApp"
            className="w-9 h-9"
          />
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppFloat;
