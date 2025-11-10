import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MobileCartItem from '../components/MobileCartItem';

const MobileCartPage: React.FC = () => {
  const { cartItems, cartTotal } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            <AnimatePresence>
              {cartItems.map(item => (
                <MobileCartItem key={item.product.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md sticky bottom-20">
            <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>OMR {cartTotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
                <button className="w-full mt-4 bg-taiba-blue text-white py-3 rounded-lg font-bold">
                    Proceed to Checkout
                </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileCartPage;
