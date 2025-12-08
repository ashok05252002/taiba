import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, CheckCircle, AlertTriangle, Camera } from 'lucide-react';

interface CartPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

const CartPrescriptionModal: React.FC<CartPrescriptionModalProps> = ({ isOpen, onClose, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [crNumber, setCrNumber] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setIsUploading(true);
    
    // Simulate upload API call
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      
      setTimeout(() => {
        onUploadComplete();
        onClose();
        // Reset state
        setFile(null);
        setUploadSuccess(false);
        setCrNumber('');
      }, 1500);
    }, 2000);
  };

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
              <div className="w-16 h-16 bg-taiba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-taiba-blue" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Prescription</h2>
              <p className="text-taiba-grey mb-4">Please upload a valid prescription for the restricted items in your cart.</p>
            </div>

            {!uploadSuccess ? (
              <>
                <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors">
                  <Upload className="mx-auto text-taiba-grey mb-2" size={32} />
                  {file ? (
                    <div className="flex items-center justify-center space-x-2 bg-blue-50 p-2 rounded-lg">
                        <FileText className="text-taiba-blue" size={20} />
                        <span className="font-medium text-taiba-blue truncate max-w-[200px]">{file.name}</span>
                        <button onClick={() => setFile(null)} className="text-red-500 hover:text-red-700 ml-2"><X size={16}/></button>
                    </div>
                  ) : (
                    <>
                        <p className="text-gray-600 mb-2">Drag & drop or click to upload</p>
                        <div className="flex justify-center gap-3">
                            <label htmlFor="cart-prescription-upload" className="bg-taiba-blue text-white px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-600 transition-colors flex items-center gap-2">
                                <Upload size={18} /> Browse
                            </label>
                            <label htmlFor="cart-prescription-camera" className="bg-taiba-purple text-white px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-purple-700 transition-colors flex items-center gap-2">
                                <Camera size={18} /> Camera
                            </label>
                        </div>
                    </>
                  )}
                  <input type="file" className="hidden" id="cart-prescription-upload" onChange={handleFileChange} accept="image/*,.pdf" />
                  <input type="file" className="hidden" id="cart-prescription-camera" onChange={handleFileChange} accept="image/*" capture="environment" />
                </div>

                <div className="mt-4">
                    <label htmlFor="cr-number" className="block text-sm font-medium text-gray-700 mb-1">Civil ID / CR Number</label>
                    <input
                        type="text"
                        id="cr-number"
                        value={crNumber}
                        onChange={(e) => setCrNumber(e.target.value)}
                        placeholder="Enter your Civil ID"
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-taiba-blue focus:border-transparent"
                    />
                </div>

                <div className="mt-4 bg-yellow-50 p-3 rounded-lg flex items-start gap-2 text-sm text-yellow-800">
                    <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                    <p>Your prescription will be verified by our pharmacists before the order is processed.</p>
                </div>

                <motion.button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full bg-taiba-blue text-white py-3 mt-6 rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isUploading ? (
                      <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Uploading...
                      </span>
                  ) : 'Upload Prescription'}
                </motion.button>
              </>
            ) : (
              <div className="text-center mt-6 py-8">
                <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                    <CheckCircle className="text-green-500" size={40} />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900">Uploaded Successfully!</h3>
                <p className="text-taiba-grey mt-2">Your prescription has been attached to the order.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartPrescriptionModal;
