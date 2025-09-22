import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, FileText, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const PrescriptionUpload: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'uploaded'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const { t, isRTL } = useLanguage();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadStatus('uploading');
    
    // Simulate upload
    setTimeout(() => {
      setUploadStatus('uploaded');
    }, 2000);
  };

  const handleFileSelect = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('uploaded');
    }, 2000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t('prescription.upload')}
          </h2>
          <p className={`text-lg text-taiba-grey max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            Upload your prescription and our pharmacists will prepare your medicines
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-50 rounded-3xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {uploadStatus === 'idle' && (
            <motion.div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                dragActive 
                  ? 'border-taiba-blue bg-blue-50' 
                  : 'border-gray-300 hover:border-taiba-blue hover:bg-blue-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="w-24 h-24 mx-auto bg-taiba-blue rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Upload className="text-white" size={32} />
                </motion.div>

                <div>
                  <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    Drop your prescription here
                  </h3>
                  <p className={`text-taiba-grey ${isRTL ? 'font-arabic' : ''}`}>
                    or click to browse from your device
                  </p>
                </div>

                <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                  <motion.button
                    onClick={handleFileSelect}
                    className="bg-taiba-blue text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText size={20} />
                    <span>Choose File</span>
                  </motion.button>

                  <motion.button
                    onClick={handleFileSelect}
                    className="bg-taiba-purple text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera size={20} />
                    <span>Take Photo</span>
                  </motion.button>
                </div>

                <p className="text-sm text-taiba-grey">
                  Supported formats: JPG, PNG, PDF • Max size: 10MB
                </p>
              </div>
            </motion.div>
          )}

          {uploadStatus === 'uploading' && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-4 border-taiba-blue border-t-transparent rounded-full"></div>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Uploading prescription...</h3>
              <p className="text-taiba-grey">Please wait while we process your file</p>
            </motion.div>
          )}

          {uploadStatus === 'uploaded' && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <CheckCircle className="text-green-600" size={40} />
              </motion.div>

              <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                Prescription uploaded successfully!
              </h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 text-yellow-700">
                  <Clock size={20} />
                  <span className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>
                    {t('prescription.pending')}
                  </span>
                </div>
                <p className={`text-sm text-yellow-600 mt-2 ${isRTL ? 'font-arabic' : ''}`}>
                  Our pharmacist will review your prescription within 30 minutes
                </p>
              </div>

              {/* Prescription Preview */}
              <motion.div
                className="bg-white border border-gray-200 rounded-xl p-4 max-w-md mx-auto mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="/assets/images/icons/prescription-upload.png"
                  alt="Prescription Preview"
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900">prescription_image.jpg</p>
                  <p className="text-sm text-taiba-grey">Uploaded just now • 2.4 MB</p>
                </div>
              </motion.div>

              <motion.button
                className="bg-taiba-blue text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upload Another Prescription
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            {
              step: '1',
              title: 'Upload Clear Photo',
              desc: 'Take a clear photo of your prescription or upload from gallery'
            },
            {
              step: '2', 
              title: 'Pharmacist Review',
              desc: 'Our licensed pharmacist will verify your prescription'
            },
            {
              step: '3',
              title: 'Order Ready',
              desc: 'Get notification when your medicines are ready for delivery'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-taiba-blue to-taiba-purple rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                {item.step}
              </div>
              <h3 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                {item.title}
              </h3>
              <p className={`text-taiba-grey text-sm ${isRTL ? 'font-arabic' : ''}`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PrescriptionUpload;
