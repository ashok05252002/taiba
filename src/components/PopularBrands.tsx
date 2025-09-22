import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  'Nivea', 'Pampers', 'Gillette', 'Oral-B', 'Cetaphil', 'Bioderma', 'Himalaya', 'Johnson & Johnson', 'Dettol', 'Vicks'
];

const PopularBrands: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Popular Brands
        </h2>
        <div className="relative">
          <div className="flex overflow-x-auto space-x-8 py-4" style={{ scrollbarWidth: 'none' }}>
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-40 h-24 bg-white rounded-xl shadow-md flex items-center justify-center border border-gray-100"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              >
                <span className="text-xl font-bold text-taiba-grey">{brand}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
