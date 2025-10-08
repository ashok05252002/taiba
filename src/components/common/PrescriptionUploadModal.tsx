import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !product) return;
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      // In a real app, you'd wait for a success response before adding to cart
      addToCart(product);
      setTimeout(() => {
        onClose();
        // Reset state for next time
        setFile(null);
        setUploadSuccess(false);
      }, 1500);
    }, 2000);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <X size={24} />
            </motion.button>
            
            <div className="text-center">
              <AlertTriangle className="mx-auto text-taiba-mustard mb-4" size={40} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescription Required</h2>
              <p className="text-taiba-grey mb-4">As per Oman Ministry of Health regulations, a valid prescription is required to purchase "{product.name}".</p>
            </div>

            {!uploadSuccess ? (
              <>
                <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <Upload className="mx-auto text-taiba-grey mb-2" size={32} />
                  {file ? (
                    <div className="flex items-center justify-center space-x-2">
                        <FileText className="text-taiba-blue" />
                        <span className="font-medium">{file.name}</span>
                    </div>
                  ) : (
                    <p>Drag & drop or click to upload</p>
                  )}
                  <input type="file" className="hidden" id="prescription-upload" onChange={handleFileChange} accept="image/*,.pdf" />
                  <label htmlFor="prescription-upload" className="mt-2 text-taiba-blue font-semibold cursor-pointer">
                    Browse File
                  </label>
                </div>

                <div className="mt-4">
                    <label htmlFor="cr-number" className="block text-sm font-medium text-gray-700 mb-1">CR Number (Civil ID)</label>
                    <input
                        type="text"
                        id="cr-number"
                        placeholder="Enter your Civil Registration Number"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-taiba-purple focus:border-transparent"
                    />
                </div>

                <motion.button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full bg-taiba-purple text-white py-3 mt-6 rounded-xl font-semibold disabled:bg-gray-400 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                >
                  {isUploading ? 'Uploading...' : 'Upload & Add to Cart'}
                </motion.button>
              </>
            ) : (
              <div className="text-center mt-6">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={40} />
                <h3 className="text-xl font-semibold">Upload Successful!</h3>
                <p className="text-taiba-grey">"{product.name}" has been added to your cart.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrescriptionUploadModal;
