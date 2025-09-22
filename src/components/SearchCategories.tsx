import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const SearchCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { t, isRTL } = useLanguage();

  const categories = [
    { id: 'all', name: 'All', nameAr: 'الكل', color: 'bg-gray-500' },
    { id: 'medicines', name: t('categories.medicines'), nameAr: 'الأدوية', color: 'bg-taiba-blue' },
    { id: 'cosmetics', name: t('categories.cosmetics'), nameAr: 'مستحضرات التجميل', color: 'bg-taiba-purple' },
    { id: 'babycare', name: t('categories.babycare'), nameAr: 'العناية بالأطفال', color: 'bg-taiba-mustard' },
  ];

  return (
    <motion.section
      className="py-16 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('search.placeholder')}
              className={`w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-taiba-blue focus:border-transparent transition-all ${isRTL ? 'pr-16 text-right font-arabic' : 'pl-16'}`}
            />
            <Search className={`absolute top-1/2 transform -translate-y-1/2 text-taiba-grey ${isRTL ? 'right-6' : 'left-6'}`} size={24} />
            <motion.button
              className={`absolute top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-taiba-blue text-white hover:bg-blue-600 transition-colors ${isRTL ? 'left-4' : 'right-4'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Filter size={20} />
            </motion.button>
          </div>

          {/* Search Suggestions */}
          {searchTerm && (
            <motion.div
              className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 space-y-2">
                {['Paracetamol', 'Vitamin D', 'Hand Sanitizer', 'Face Mask'].map((suggestion, index) => (
                  <motion.div
                    key={index}
                    className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center space-x-3"
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <Search size={16} className="text-taiba-grey" />
                    <span>{suggestion}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Category Chips */}
        <motion.div
          className={`flex flex-wrap gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${isRTL ? 'font-arabic' : ''}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Quick Filters */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Prescription Required', color: 'text-red-600 border-red-200' },
            { label: 'On Sale', color: 'text-taiba-mustard border-yellow-200' },
            { label: 'Fast Delivery', color: 'text-green-600 border-green-200' },
            { label: 'In Stock', color: 'text-taiba-blue border-blue-200' }
          ].map((filter, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 border-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors ${filter.color}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SearchCategories;
