import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<'initial' | 'login' | 'signup'>('initial');

  const handleClose = () => {
    onClose();
    // Reset view after a short delay to allow for exit animation
    setTimeout(() => setView('initial'), 300);
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 50 },
    visible: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: 50 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
            
            <AnimatePresence mode="wait">
              {view === 'initial' && (
                <motion.div key="initial" variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                  <div className="text-center">
                    <img src="https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png" alt="Taiba Pharmacy" className="h-16 w-auto mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Taiba Family</h2>
                    <p className="text-taiba-grey mb-6">Sign in or create an account to enjoy exclusive benefits.</p>
                    <div className="space-y-4">
                      <motion.button
                        onClick={() => setView('signup')}
                        className="w-full bg-taiba-purple text-white py-3 rounded-xl font-semibold text-lg"
                        whileHover={{ scale: 1.03, boxShadow: '0px 5px 15px rgba(115, 38, 117, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Create an Account
                      </motion.button>
                      <motion.button
                        onClick={() => setView('login')}
                        className="w-full bg-taiba-blue text-white py-3 rounded-xl font-semibold text-lg"
                        whileHover={{ scale: 1.03, boxShadow: '0px 5px 15px rgba(16, 139, 250, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign In
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {view !== 'initial' && (
                <motion.div key="form" variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                  <button onClick={() => setView('initial')} className="flex items-center space-x-2 text-sm font-medium text-taiba-grey hover:text-taiba-blue mb-4">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  {view === 'login' ? <LoginForm isModal /> : <SignupForm isModal />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
