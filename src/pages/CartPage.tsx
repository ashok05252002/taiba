import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Plus, Minus, X, ShoppingCart, Tag, AlertTriangle } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const shippingCost = useMemo(() => (cartTotal > 20 ? 0 : 5), [cartTotal]);
  const taxAmount = useMemo(() => cartTotal * 0.05, [cartTotal]);
  const finalTotal = useMemo(() => cartTotal + shippingCost + taxAmount - discount, [cartTotal, shippingCost, taxAmount, discount]);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOME15') {
      setDiscount(cartTotal * 0.15);
    } else {
        alert('Invalid coupon code');
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            Your Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-20 bg-white rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ShoppingCart size={64} className="mx-auto text-taiba-grey mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-taiba-grey mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products">
              <motion.button
                className="bg-taiba-blue text-white px-8 py-3 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div 
                  key={item.product.id} 
                  className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-sm text-taiba-grey">{item.product.category}</p>
                    {item.product.prescriptionRequired && (
                        <div className="flex items-center text-xs text-red-600 mt-1 gap-1">
                            <AlertTriangle size={14}/>
                            <span>Prescription needed</span>
                        </div>
                    )}
                    <p className="font-bold text-taiba-purple mt-1">OMR {item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200" whileTap={{ scale: 0.9 }}>
                      <Minus size={16} />
                    </motion.button>
                    <span className="font-medium w-6 text-center">{item.quantity}</span>
                    <motion.button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200" whileTap={{ scale: 0.9 }}>
                      <Plus size={16} />
                    </motion.button>
                  </div>
                  <motion.button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500" whileTap={{ scale: 0.9 }}>
                    <X size={20} />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4 border-b pb-3">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>OMR {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost > 0 ? `OMR ${shippingCost.toFixed(2)}` : <span className="text-green-600">FREE</span>}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (5%)</span>
                  <span>OMR {taxAmount.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-OMR {discount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>OMR {finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="coupon" className="font-semibold text-sm mb-2 flex items-center gap-2"><Tag size={16}/> Apply Coupon</label>
                <div className="flex gap-2">
                    <input type="text" id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Enter coupon code" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
                    <button onClick={handleApplyCoupon} className="bg-taiba-mustard text-black px-4 rounded-lg font-semibold">Apply</button>
                </div>
              </div>
              <Link to="/checkout">
                <motion.button 
                    className="w-full bg-taiba-blue text-white py-3 mt-6 rounded-xl font-semibold animate-glow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Proceed to Checkout
                </motion.button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
