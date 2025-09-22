import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleLanguage, t, isRTL, currentLanguage } = useLanguage();

  return (
    <motion.header
      className="bg-white/80 backdrop-blur-lg shadow-sm w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
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
            {/* Language Toggle */}
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
            
            {/* Profile */}
            <Link to="/profile">
                <motion.button
                className="p-2 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                <User className="w-6 h-6 text-taiba-grey" />
                </motion.button>
            </Link>

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
                className={`w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-taiba-pistachio focus:border-transparent ${isRTL ? 'pr-12 text-right' : 'pl-12'}`}
              />
              <Search className={`absolute top-1/2 transform -translate-y-1/2 text-taiba-grey ${isRTL ? 'right-4' : 'left-4'}`} size={20} />
            </div>
            <nav className="flex flex-col space-y-2">
                <Link to="/products" className="text-gray-700 hover:bg-gray-100 p-3 rounded-md font-medium">Products</Link>
                <a href="https://wa.me/968XXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:bg-gray-100 p-3 rounded-md font-medium">WhatsApp Support</a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
