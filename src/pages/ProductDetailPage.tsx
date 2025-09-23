import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import ProductGrid from '../components/ProductGrid';
import LoadingLottie from '../components/common/LoadingLottie';
import { Star, AlertCircle } from 'lucide-react';
import { generateProducts, generateReviews } from '../utils/mockData';
import AddToCartButton from '../components/common/AddToCartButton';
import ProductInfoSection from '../components/product/ProductInfoSection';
import CustomerReviews from '../components/product/CustomerReviews';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (id) {
        const [generatedProduct] = generateProducts(1);
        setProduct({ ...generatedProduct, id });
        setReviews(generateReviews(5));
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <LoadingLottie />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <motion.div 
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-2xl shadow-lg" />
          </motion.div>

          {/* Main Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-taiba-blue font-semibold mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-taiba-grey">({reviews.length} reviews)</span>
            </div>
            
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-4xl font-bold text-taiba-purple">OMR {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">OMR {product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-taiba-grey leading-relaxed my-6">{product.description}</p>
            
            {product.prescriptionRequired && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-3">
                <AlertCircle size={24} />
                <span className="font-semibold">{t('prescription.required')}</span>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <AddToCartButton product={product} />
            </div>
          </motion.div>
        </div>

        {/* Details & Reviews Section */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <ProductInfoSection product={product} />
                <CustomerReviews reviews={reviews} averageRating={product.rating} />
            </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">Related Products</h2>
            <ProductGrid isFeatured={true} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
