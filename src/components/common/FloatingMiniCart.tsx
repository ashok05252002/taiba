import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

interface FloatingMiniCartProps {
    isVisible: boolean;
}

const FloatingMiniCart: React.FC<FloatingMiniCartProps> = ({ isVisible }) => {
  const { cartItems, cartTotal } = useCart();

  return (
    <AnimatePresence>
        {isVisible && (
            <motion.div
            className="absolute right-0 bottom-full mb-4 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            >
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shopping Cart</h3>
                    
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="flex items-center space-x-3">
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{item.product.name}</h4>
                            <p className="text-taiba-blue font-semibold">OMR {item.product.price.toFixed(2)}</p>
                        </div>
                        <span className="text-sm font-medium bg-gray-100 px-2 rounded-full">{item.quantity}x</span>
                        </div>
                    ))}
                    </div>
                    
                    <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-taiba-blue">OMR {cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <Link to="/cart">
                        <motion.button
                        className="w-full bg-taiba-blue text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        >
                        View Cart & Checkout
                        </motion.button>
                    </Link>
                    </div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
  );
};

export default FloatingMiniCart;
