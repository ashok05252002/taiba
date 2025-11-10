import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import MobileProductCard from './MobileProductCard';

interface HorizontalProductScrollerProps {
  title: string;
  products: Product[];
}

const HorizontalProductScroller: React.FC<HorizontalProductScrollerProps> = ({ title, products }) => (
  <div className="py-6">
    <h2 className="text-xl font-bold px-4 mb-3">{title}</h2>
    <div className="flex overflow-x-auto space-x-4 px-4 scrollbar-hide">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          className="flex-shrink-0 w-40"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MobileProductCard product={product} />
        </motion.div>
      ))}
    </div>
  </div>
);

export default HorizontalProductScroller;
