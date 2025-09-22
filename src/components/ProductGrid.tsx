import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import ProductCard from './common/ProductCard';
import LoadingLottie from './common/LoadingLottie';
import { generateProducts } from '../utils/mockData';

const ProductGrid: React.FC<{ isFeatured?: boolean }> = ({ isFeatured = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const generated = generateProducts(isFeatured ? 8 : 24, { category: categoryFilter || undefined });
      setProducts(generated);
      setLoading(false);
    }, 1000);
  }, [isFeatured, categoryFilter]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="flex justify-center items-center min-h-96">
          <LoadingLottie />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
      </div>
    </section>
  );
};

export default ProductGrid;
