import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  'Nivea', 'Pampers', 'Gillette', 'Oral-B', 'Cetaphil', 'Bioderma', 'Himalaya', 'J&J', 'Dettol', 'Vicks', 'Panadol', 'Strepsils'
];

const PopularBrands: React.FC = () => {
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Shop by Popular Brands
        </h2>
        <div className="relative overflow-hidden group">
          <motion.div
            className="flex space-x-8"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              ease: 'linear',
              duration: 20,
              repeat: Infinity,
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-28 bg-white rounded-2xl shadow-md flex items-center justify-center border border-gray-100 group-hover:[animation-play-state:paused]"
              >
                <span className="text-2xl font-bold text-taiba-grey tracking-wider">{brand}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
