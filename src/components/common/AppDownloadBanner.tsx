import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone } from 'lucide-react';

interface AppDownloadBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

const AppDownloadBanner: React.FC<AppDownloadBannerProps> = ({ isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-1/2 -translate-y-1/2 right-0 z-[100] w-80 bg-white rounded-l-2xl shadow-2xl overflow-hidden border border-gray-200"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
            <div className="absolute top-0 right-0 p-2 z-10">
                <button onClick={onClose} className="w-7 h-7 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/40">
                    <X size={16} />
                </button>
            </div>
          <div className="p-6 text-center">
            <Smartphone className="mx-auto text-taiba-blue mb-3" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Get the Taiba App!</h3>
            <p className="text-taiba-grey mb-4">Scan the QR code to download our mobile app for a faster, more convenient experience.</p>
            <div className="flex justify-center mb-4">
                <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://taibapharmacy.om/app" 
                    alt="Download App QR Code"
                    className="w-36 h-36 rounded-lg border-4 border-taiba-blue p-1"
                />
            </div>
            <p className="text-xs text-gray-400">Available on iOS and Android</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppDownloadBanner;
