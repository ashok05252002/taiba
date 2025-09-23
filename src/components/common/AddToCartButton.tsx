import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import PrescriptionUploadModal from './PrescriptionUploadModal';

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { cartItems, addToCart, updateQuantity, triggerAnimation } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const itemInCart = cartItems.find(item => item.product.id === product.id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  const handleInitialAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.prescriptionRequired) {
      setIsModalOpen(true);
    } else {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        triggerAnimation(product.image, rect);
      }
      addToCart(product);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart - 1);
  };

  return (
    <>
      <PrescriptionUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
      />
      <div className="relative h-10 w-28 flex items-center justify-end">
        <AnimatePresence mode="wait">
          {quantityInCart === 0 ? (
            <motion.button
              key="add"
              ref={buttonRef}
              onClick={handleInitialAddToCart}
              disabled={!product.inStock}
              className="absolute inset-0 bg-taiba-blue text-white rounded-full disabled:bg-gray-300 flex items-center justify-center space-x-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={product.inStock ? { scale: 1.1, boxShadow: '0px 4px 10px rgba(16, 139, 250, 0.5)' } : {}}
              whileTap={product.inStock ? { scale: 0.95 } : {}}
            >
              <ShoppingCart size={18} />
              <span className="text-sm font-semibold">Add</span>
            </motion.button>
          ) : (
            <motion.div
              key="stepper"
              className="absolute inset-0 bg-gray-100 rounded-full flex items-center justify-between px-2 shadow-inner"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <motion.button onClick={handleDecrement} className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center" whileTap={{ scale: 0.9 }}>
                <Minus size={14} className="text-taiba-purple" />
              </motion.button>
              <span className="font-bold text-taiba-purple text-lg">{quantityInCart}</span>
              <motion.button onClick={handleIncrement} className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center" whileTap={{ scale: 0.9 }}>
                <Plus size={14} className="text-taiba-purple" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AddToCartButton;
