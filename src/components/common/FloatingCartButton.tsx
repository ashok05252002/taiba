import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import FloatingMiniCart from './FloatingMiniCart';

const FloatingCartButton: React.FC = () => {
  const { cartCount, isShaking } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const shakeAnimation = {
    shake: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FloatingMiniCart isVisible={isHovered && cartCount > 0} />
      <Link to="/cart">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          variants={shakeAnimation}
          animate={isShaking ? "shake" : ""}
        >
          <div className="w-16 h-16 bg-taiba-purple rounded-full shadow-lg flex items-center justify-center">
            <ShoppingCart className="text-white" size={28} />
          </div>
          {cartCount > 0 && (
            <motion.div
              key={cartCount}
              className="absolute -top-2 -right-2 w-7 h-7 bg-taiba-mustard text-black text-sm font-bold rounded-full flex items-center justify-center border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              {cartCount}
            </motion.div>
          )}
        </motion.div>
      </Link>
    </div>
  );
};

export default FloatingCartButton;
