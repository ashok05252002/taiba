import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Palette, Star } from 'lucide-react';

interface UIGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colors = [
    { name: 'taiba-blue', hex: '#108BFA', description: 'Primary CTAs, links, highlights' },
    { name: 'taiba-purple', hex: '#732675', description: 'Secondary CTAs, headers' },
    { name: 'taiba-mustard', hex: '#FFC600', description: 'Badges, special offers' },
    { name: 'taiba-pistachio', hex: '#BCE268', description: 'Accent highlights' },
    { name: 'taiba-grey', hex: '#696969', description: 'Body text, secondary info' },
    { name: 'taiba-wheat', hex: '#F5DEB3', description: 'Subtle backgrounds' },
];

const UIGuideModal: React.FC<UIGuideModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <X size={24} />
            </motion.button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">UI & Branding Guide</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><Palette/> Colors</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {colors.map(color => (
                            <div key={color.name} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg shadow-inner" style={{ backgroundColor: color.hex }}></div>
                                <div>
                                    <p className="font-bold text-sm capitalize">{color.name.split('-')[1]}</p>
                                    <p className="text-xs text-gray-500">{color.hex}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><Type/> Typography</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p><strong className="font-sans">Primary Font:</strong> Montserrat</p>
                        <p className="font-arabic"><strong className="font-sans">Arabic Fallback:</strong> Tajawal (هذا مثال)</p>
                    </div>
                </div>

                 <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><Star/> Icons</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p><strong>Icon Family:</strong> Lucide-React</p>
                        <p className="text-sm text-gray-600">A clean and consistent icon set for a modern look.</p>
                    </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UIGuideModal;
