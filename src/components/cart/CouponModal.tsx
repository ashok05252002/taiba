import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, CheckCircle } from 'lucide-react';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (code: string) => void;
}

const CouponModal: React.FC<CouponModalProps> = ({ isOpen, onClose, onApply }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onApply(code);
      setCode('');
      onClose();
    }
  };

  const availableCoupons = [
    { code: 'WELCOME15', desc: '15% off on your first order', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { code: 'TAIBA20', desc: 'Flat 20% off on orders above OMR 50', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { code: 'FREESHIP', desc: 'Free shipping on all orders', color: 'bg-green-50 text-green-700 border-green-200' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <Tag className="w-5 h-5 text-taiba-blue" />
                Apply Coupon
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder="e.g., TAIBA20"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-taiba-blue focus:border-transparent outline-none transition-all text-lg tracking-wide uppercase"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!code.trim()}
                        className="px-6 bg-taiba-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        Apply
                    </button>
                  </div>
                </div>
              </form>

              {/* Available Coupons List */}
              <div className="mt-8">
                <p className="text-xs text-gray-500 font-bold mb-3 uppercase tracking-wider">
                  Available Offers for You
                </p>
                <div className="space-y-3">
                  {availableCoupons.map((coupon) => (
                    <button
                        key={coupon.code}
                        onClick={() => setCode(coupon.code)}
                        className={`w-full text-left p-4 border rounded-xl transition-all hover:shadow-md group ${coupon.color}`}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <Tag size={14} className="opacity-70" />
                                </div>
                                <div>
                                    <span className="font-bold block">{coupon.code}</span>
                                    <span className="text-xs opacity-80">{coupon.desc}</span>
                                </div>
                            </div>
                            <span className="text-xs font-bold bg-white px-3 py-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                Use
                            </span>
                        </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CouponModal;
