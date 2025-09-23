import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X, Globe, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../contexts/CartContext';
import MiniCart from './MiniCart';
import DeliveryModeSelector from './DeliveryModeSelector';
import LocationSelector from './LocationSelector';

interface HeaderProps {
    deliveryMode: 'delivery' | 'takeaway';
    setDeliveryMode: (mode: 'delivery' | 'takeaway') => void;
}

const Header: React.FC<HeaderProps> = ({ deliveryMode, setDeliveryMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toggleLanguage, t, isRTL, currentLanguage } = useLanguage();
  const { cartCount } = useCart();

  return (
    <motion.header
      className="bg-white/80 backdrop-blur-lg shadow-sm w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <motion.div
                className="flex-shrink-0 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png"
                  alt="Taiba Pharmacy"
                  className="h-12 w-auto"
                />
              </motion.div>
            </Link>
            <div className="hidden lg:flex items-center space-x-4">
                <DeliveryModeSelector mode={deliveryMode} setMode={setDeliveryMode} />
                <LocationSelector mode={deliveryMode} />
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className={`w-full px-5 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-taiba-pistachio focus:border-transparent transition-colors ${isRTL ? 'pr-12 text-right' : 'pl-12'}`}
              />
              <Search className={`absolute top-1/2 transform -translate-y-1/2 text-taiba-grey ${isRTL ? 'right-4' : 'left-4'}`} size={22} />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={20} className="text-taiba-grey" />
              <span className="text-sm font-medium text-taiba-grey hidden sm:inline">
                {currentLanguage.code === 'en' ? 'AR' : 'EN'}
              </span>
            </motion.button>
            
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link to="/cart">
                <motion.button
                  className="relative p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="w-6 h-6 text-taiba-grey" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-taiba-mustard text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </motion.button>
              </Link>
              {isCartOpen && <MiniCart />}
            </div>

            <Link to="/profile">
                <motion.button
                className="p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                <User className="w-6 h-6 text-taiba-grey" />
                </motion.button>
            </Link>

            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="relative mb-4">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className={`w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-taiba-pistachio focus:border-transparent ${isRTL ? 'pr-12 text-right' : 'pl-12'}`}
              />
              <Search className={`absolute top-1/2 transform -translate-y-1/2 text-taiba-grey ${isRTL ? 'right-4' : 'left-4'}`} size={20} />
            </div>
            <nav className="flex flex-col space-y-2">
                <Link to="/products" className="text-gray-700 hover:bg-gray-100 p-3 rounded-md font-medium">Products</Link>
                <Link to="/cart" className="text-gray-700 hover:bg-gray-100 p-3 rounded-md font-medium">Cart ({cartCount})</Link>
                <a href="https://wa.me/968XXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:bg-gray-100 p-3 rounded-md font-medium">WhatsApp Support</a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
