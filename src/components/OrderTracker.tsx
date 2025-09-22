import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, MapPin, CheckCircle } from 'lucide-react';

const OrderTracker: React.FC = () => {
  const orderStatuses = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      desc: 'Your order has been confirmed',
      icon: CheckCircle,
      completed: true,
      timestamp: '2 hours ago'
    },
    {
      id: 'packed',
      title: 'Order Packed',
      desc: 'Your medicines are packed and ready',
      icon: Package,
      completed: true,
      timestamp: '1 hour ago'
    },
    {
      id: 'delivery',
      title: 'Out for Delivery',
      desc: 'Your order is on the way',
      icon: Truck,
      completed: false,
      current: true,
      timestamp: 'Expected in 30 mins'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      desc: 'Order delivered successfully',
      icon: MapPin,
      completed: false,
      timestamp: 'Pending'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h2>
          <p className="text-lg text-taiba-grey max-w-2xl mx-auto">
            Order #TP2024001 - Real-time tracking of your medicine delivery
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          {/* Timeline */}
          <div className="relative">
            {orderStatuses.map((status, index) => (
              <motion.div
                key={status.id}
                className="flex items-start space-x-4 pb-8 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline Line */}
                {index < orderStatuses.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 w-0.5 h-16 ${
                      status.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}

                {/* Status Icon */}
                <motion.div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    status.completed
                      ? 'bg-green-500 text-white'
                      : status.current
                      ? 'bg-taiba-blue text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                  animate={status.current ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <status.icon size={20} />
                </motion.div>

                {/* Status Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold text-lg ${
                        status.completed ? 'text-green-600' : status.current ? 'text-taiba-blue' : 'text-gray-500'
                      }`}>
                        {status.title}
                      </h3>
                      <p className="text-taiba-grey">{status.desc}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      status.completed ? 'text-green-600' : status.current ? 'text-taiba-blue' : 'text-gray-500'
                    }`}>
                      {status.timestamp}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Preview */}
          <motion.div
            className="mt-8 bg-gray-100 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative h-64">
              <img
                src="/assets/images/maps/oman-map-placeholder.png"
                alt="Delivery Route Map"
                className="w-full h-full object-cover"
              />
              
              {/* Delivery Pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-8 h-8 bg-taiba-blue rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Truck className="text-white" size={14} />
                </div>
              </motion.div>

              {/* Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Delivery Driver: Ahmed Ali</p>
                    <p className="text-sm text-taiba-grey">Phone: +968 9XXX XXXX</p>
                  </div>
                  <motion.button
                    className="bg-taiba-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Call Driver
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-sm text-taiba-grey mb-1">Estimated Delivery</p>
              <p className="font-bold text-taiba-blue">30 minutes</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-taiba-grey mb-1">Order Total</p>
              <p className="font-bold text-green-600">$23.75</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-sm text-taiba-grey mb-1">Items Count</p>
              <p className="font-bold text-taiba-purple">3 items</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrderTracker;
