import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../contexts/CartContext';
import MiniCart from './MiniCart';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toggleLanguage, t, isRTL, currentLanguage } = useLanguage();
  const { cartCount } = useCart();

  return (
    <motion.header
      className="bg-white shadow-md fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="/assets/images/logo-taiba.png"
                alt="Taiba Pharmacy"
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-taiba-blue hidden sm:block">
                Taiba Pharmacy
              </span>
            </motion.div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className={`w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-taiba-blue focus:border-transparent ${isRTL ? 'pr-12 text-right' : 'pl-12'}`}
              />
              <Search className={`absolute top-1/2 transform -translate-y-1/2 text-taiba-grey ${isRTL ? 'right-4' : 'left-4'}`} size={20} />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={16} className="text-taiba-grey" />
              <span className="text-sm font-medium text-taiba-grey hidden sm:inline">
                {currentLanguage.code === 'en' ? 'AR' : 'EN'}
              </span>
            </motion.button>

            {/* Cart */}
            <div
              className="relative"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link to="/cart">
                <motion.button
                  className="relative p-2"
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

            {/* Profile */}
            <motion.button
              className="p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User className="w-6 h-6 text-taiba-grey" />
            </motion.button>

            {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu & Search */}
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
                className={`w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-taiba-blue focus:border-transparent ${isRTL ? 'pr-12 text-right' : 'pl-12'}`}
              />
              <Search className={`absolute top-1/2 transform -translate-y-1/2 text-taiba-grey ${isRTL ? 'right-4' : 'left-4'}`} size={20} />
            </div>
            <nav className="flex flex-col space-y-2">
                <Link to="/products" className="text-gray-700 hover:bg-gray-100 p-2 rounded-md">Products</Link>
                <a href="https://wa.me/968XXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:bg-gray-100 p-2 rounded-md">WhatsApp</a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
