import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat: React.FC = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.a
        href="https://wa.me/968XXXXXXXX?text=Hello%20Taiba%20Pharmacy!%20I%20need%20help%20with%20my%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* WhatsApp Button */}
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
            src="/assets/images/icons/whatsapp.png"
            alt="WhatsApp"
            className="w-8 h-8"
          />
        </motion.div>

        {/* Notification Dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold">1</span>
        </motion.div>

        {/* Tooltip */}
        <motion.div
          className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: 10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <span className="text-sm font-medium">Chat with us on WhatsApp</span>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </motion.div>

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full opacity-20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.a>

      {/* Chat Bubble Animation */}
      <motion.div
        className="absolute -top-16 -left-8 bg-white rounded-2xl p-3 shadow-lg border border-gray-200 max-w-48"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          y: [20, 0, 0, -10],
          scale: [0.8, 1, 1, 0.8]
        }}
        transition={{ 
          duration: 4,
          times: [0, 0.2, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 5
        }}
      >
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="text-white" size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Taiba Support</p>
            <p className="text-xs text-gray-600">How can we help you today?</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppFloat;
