import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import ProductCard from './common/ProductCard';
import LoadingLottie from './common/LoadingLottie';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingLottie />
      </div>
    );
  }

  if (products.length === 0) {
      return (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold">No Products Found</h3>
              <p className="text-taiba-grey mt-2">Try adjusting your filters or checking another category.</p>
          </div>
      )
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      layout
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          viewport={{ once: true }}
          layout
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
