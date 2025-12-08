import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  FileText, 
  Check, 
  Tag,
  ChevronRight,
  Award 
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import PrescriptionUploadModal from '../components/common/PrescriptionUploadModal';
import CouponModal from '../components/cart/CouponModal';

const CartPage = () => {
  const { 
    cartItems,
    removeFromCart, 
    updateQuantity, 
    applyCoupon, 
    coupon, 
    discount,
    clearCart 
  } = useCart();
  
  const navigate = useNavigate();
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  
  // --- Rewards System State ---
  const [useRewards, setUseRewards] = useState(false);
  const userPoints = 2450; // Mocked user balance
  const pointConversionRate = 0.001; // 1 Point = 0.001 OMR (1000 Points = 1 OMR)

  // State for item selection (checkboxes)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Update selected items when cartItems changes (e.g. on initial load)
  useEffect(() => {
      if (cartItems.length > 0 && selectedItems.length === 0) {
          setSelectedItems(cartItems.map(item => item.product.id));
      }
  }, [cartItems]);

  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleAllSelection = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.product.id));
    }
  };

  const handlePrescriptionSuccess = () => {
    setPrescriptionUploaded(true);
    setIsPrescriptionModalOpen(false);
  };

  const handleApplyCoupon = (code: string) => {
    applyCoupon(code);
  };

  // --- Calculations ---
  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.product.id));
  
  const selectedSubtotal = selectedCartItems.reduce((total, item) => {
    const price = item.product.price; 
    return total + (price * item.quantity);
  }, 0);
  
  const deliveryFee = selectedSubtotal > 20 ? 0 : 2.500;
  const tax = selectedSubtotal * 0.05; // 5% VAT
  
  // Rewards Calculation Logic
  const subtotalAfterCoupon = Math.max(0, selectedSubtotal - discount);
  const maxRedemptionValue = subtotalAfterCoupon * 0.5; 
  const availableRewardsValue = userPoints * pointConversionRate;
  const applicableRewardsValue = Math.min(availableRewardsValue, maxRedemptionValue);
  const pointsNeeded = Math.ceil(applicableRewardsValue / pointConversionRate);
  const finalRewardsDiscount = useRewards ? applicableRewardsValue : 0;

  const finalTotal = selectedSubtotal + deliveryFee + tax - discount - finalRewardsDiscount;

  const requiresPrescription = selectedCartItems.some(item => item.product.prescriptionRequired);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full"
        >
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-taiba-blue" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any medicines or products yet.</p>
          <Link 
            to="/products" 
            className="block w-full bg-taiba-blue text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-200"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-taiba-blue" />
          Shopping Cart 
          <span className="text-lg font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
            {cartItems.length} Items
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Cart Items */}
          <div className="flex-1 space-y-6">
            
            {/* Prescription Alert/Upload Section */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 border-l-4 shadow-sm ${
                prescriptionUploaded 
                  ? 'bg-green-50 border-green-500' 
                  : requiresPrescription 
                    ? 'bg-amber-50 border-amber-500'
                    : 'bg-blue-50 border-taiba-blue'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl ${
                    prescriptionUploaded ? 'bg-green-100' : requiresPrescription ? 'bg-amber-100' : 'bg-blue-100'
                  }`}>
                    {prescriptionUploaded ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <FileText className={`w-6 h-6 ${requiresPrescription ? 'text-amber-600' : 'text-taiba-blue'}`} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {prescriptionUploaded 
                        ? "Prescription Uploaded" 
                        : requiresPrescription 
                          ? "Prescription Required" 
                          : "Have a Prescription?"}
                    </h3>
                    <p className="text-gray-600 mt-1 max-w-md">
                      {prescriptionUploaded 
                        ? "Your prescription has been attached securely. Our pharmacists will review it."
                        : requiresPrescription
                          ? "Some items in your cart require a valid medical prescription."
                          : "Upload your prescription now for faster processing by our pharmacists."}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                    prescriptionUploaded
                      ? 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
                      : 'bg-taiba-blue text-white hover:bg-blue-600 shadow-blue-200'
                  }`}
                >
                  {prescriptionUploaded ? 'View / Update' : 'Upload Now'}
                </button>
              </div>
            </motion.div>

            {/* Cart Header / Select All */}
            <div className="bg-white rounded-t-2xl p-4 border-b border-gray-100 flex items-center gap-4 shadow-sm">
              <input 
                type="checkbox" 
                checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                onChange={toggleAllSelection}
                className="w-5 h-5 rounded border-gray-300 text-taiba-blue focus:ring-taiba-blue"
              />
              <span className="font-semibold text-gray-700">Select All ({cartItems.length} Items)</span>
              <button 
                onClick={clearCart}
                className="ml-auto text-red-500 text-sm font-medium hover:text-red-600 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Remove All
              </button>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-b-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-6 flex gap-6 transition-colors ${selectedItems.includes(item.product.id) ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    {/* Checkbox */}
                    <div className="pt-8">
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(item.product.id)}
                        onChange={() => toggleItemSelection(item.product.id)}
                        className="w-5 h-5 rounded border-gray-300 text-taiba-blue focus:ring-taiba-blue"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="w-28 h-28 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{item.product.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>
                            {item.product.prescriptionRequired && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
                                <FileText className="w-3 h-3" /> Rx Required
                              </span>
                            )}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        {/* Price */}
                        <div className="flex flex-col">
                          {item.product.originalPrice ? (
                            <>
                              <span className="text-gray-400 text-sm line-through">OMR {item.product.originalPrice.toFixed(3)}</span>
                              <span className="text-xl font-bold text-taiba-blue">OMR {item.product.price.toFixed(3)}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-taiba-blue">OMR {item.product.price.toFixed(3)}</span>
                          )}
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1">
                          <button 
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-taiba-blue disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-taiba-blue"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:w-96 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Coupon Code Trigger */}
              <div className="mb-4">
                <button
                  onClick={() => setIsCouponModalOpen(true)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-taiba-blue hover:bg-blue-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-taiba-blue group-hover:scale-110 transition-transform">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900 text-sm">Apply Coupon</p>
                      {coupon ? (
                        <p className="text-xs text-green-600 font-medium">Code {coupon} applied</p>
                      ) : (
                        <p className="text-xs text-gray-500">Get discount with code</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-taiba-blue transition-colors" />
                </button>
              </div>

              {/* Rewards System Section */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-taiba-purple" />
                        <span className="font-bold text-gray-900 text-sm">Rewards Points</span>
                    </div>
                    <span className="text-xs font-semibold bg-white px-2 py-1 rounded border border-purple-100 text-taiba-purple">
                        Bal: {userPoints}
                    </span>
                </div>
                
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                    <div className="relative flex items-center mt-1">
                        <input 
                            type="checkbox" 
                            checked={useRewards}
                            onChange={(e) => setUseRewards(e.target.checked)}
                            disabled={applicableRewardsValue <= 0}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm transition-all checked:border-taiba-purple checked:bg-taiba-purple hover:border-taiba-purple disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={3} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-700 font-medium">
                            Redeem <span className="text-taiba-purple font-bold">{pointsNeeded} points</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            Save <span className="text-green-600 font-bold">OMR {applicableRewardsValue.toFixed(3)}</span> on this order
                        </p>
                        {applicableRewardsValue < availableRewardsValue && applicableRewardsValue > 0 && (
                            <p className="text-[10px] text-gray-400 mt-1">
                                *Max redemption limited to 50% of order value
                            </p>
                        )}
                        {applicableRewardsValue <= 0 && (
                            <p className="text-[10px] text-red-400 mt-1">
                                *Order value too low to redeem points
                            </p>
                        )}
                    </div>
                </label>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span>OMR {selectedSubtotal.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span>OMR {deliveryFee.toFixed(3)}</span>
                  )}
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (5%)</span>
                  <span>OMR {tax.toFixed(3)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>- OMR {discount.toFixed(3)}</span>
                  </div>
                )}
                {useRewards && finalRewardsDiscount > 0 && (
                  <div className="flex justify-between text-taiba-purple font-medium">
                    <span>Rewards Discount</span>
                    <span>- OMR {finalRewardsDiscount.toFixed(3)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-end mb-8">
                <span className="text-gray-900 font-bold text-lg">Total Amount</span>
                <span className="text-3xl font-bold text-taiba-blue">OMR {Math.max(0, finalTotal).toFixed(3)}</span>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => navigate('/checkout')}
                disabled={selectedItems.length === 0}
                className="w-full bg-taiba-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">Genuine Products</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PrescriptionUploadModal 
        isOpen={isPrescriptionModalOpen} 
        onClose={() => setIsPrescriptionModalOpen(false)} 
        onSuccess={handlePrescriptionSuccess}
        product={null} // Passing null as generic upload
      />
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onApply={handleApplyCoupon}
      />
    </div>
  );
};

export default CartPage;
