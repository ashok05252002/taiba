import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Plus, Minus, X } from 'lucide-react';

const MiniCart: React.FC = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shopping Cart</h3>
        
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2">
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
                  <div className="flex items-center space-x-1">
                    <motion.button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus size={10} />
                    </motion.button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <motion.button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus size={10} />
                    </motion.button>
                  </div>
                   <motion.button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500" whileTap={{ scale: 0.9 }}>
                    <X size={16} />
                  </motion.button>
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
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MiniCart;
