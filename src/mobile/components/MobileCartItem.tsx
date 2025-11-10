import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from '../../types';

interface MobileCartItemProps {
  item: CartItem;
}

const MobileCartItem: React.FC<MobileCartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white p-3 rounded-xl flex items-center gap-4 shadow-sm"
    >
      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-grow">
        <p className="font-semibold text-sm line-clamp-2">{item.product.name}</p>
        <p className="font-bold text-taiba-purple my-1">OMR {item.product.price.toFixed(2)}</p>
        <div className="flex items-center space-x-3 mt-2">
          <motion.button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <Minus size={14} />
          </motion.button>
          <span className="font-bold text-lg">{item.quantity}</span>
          <motion.button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={14} />
          </motion.button>
        </div>
      </div>
      <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 self-start p-1">
        <X size={20} />
      </button>
    </motion.div>
  );
};

export default MobileCartItem;
