import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../../contexts/NotificationContext';
import { CheckCircle } from 'lucide-react';

const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-24 right-4 z-[9999] w-80 space-y-3">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-start space-x-4"
          >
            {notification.product ? (
              <>
                <img src={notification.product.image} alt={notification.product.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 line-clamp-2">{notification.product.name}</p>
                  <div className="flex items-center space-x-2 text-green-600 mt-1">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">{notification.message}</span>
                  </div>
                </div>
              </>
            ) : (
                <div className="flex items-center space-x-2 text-green-600 mt-1">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">{notification.message}</span>
                </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
