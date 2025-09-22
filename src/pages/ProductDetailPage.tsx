import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../hooks/useLanguage';
import ProductGrid from '../components/ProductGrid';
import LoadingLottie from '../components/common/LoadingLottie';
import PrescriptionUploadModal from '../components/common/PrescriptionUploadModal';
import { Star, ShoppingCart, AlertCircle } from 'lucide-react';
import { generateProducts } from '../utils/mockData';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (id) {
        // Generate a single product. In a real app, you'd fetch by ID.
        const [generatedProduct] = generateProducts(1);
        setProduct({ ...generatedProduct, id });
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.prescriptionRequired) {
      setIsModalOpen(true);
    } else {
      addToCart(product);
    }
  };

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
    <>
      <PrescriptionUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
      />
      <motion.div 
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-2xl shadow-lg" />
            </motion.div>

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
                <span className="text-taiba-grey">({product.rating} reviews)</span>
              </div>

              <p className="text-gray-700 text-lg mb-6">{product.description}</p>
              
              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-4xl font-bold text-taiba-purple">OMR {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">OMR {product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {product.prescriptionRequired && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-3">
                  <AlertCircle size={24} />
                  <span className="font-semibold">{t('prescription.required')}</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Dosage</h3>
                <p className="text-taiba-grey">{product.dosage}</p>
              </div>

              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-taiba-blue text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all disabled:bg-gray-400"
                whileHover={{ scale: 1.02, boxShadow: '0px 5px 15px rgba(16, 139, 250, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart size={22} />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </motion.button>
            </motion.div>
          </div>

          <div className="mt-24">
              <h2 className="text-3xl font-bold text-center mb-12">Related Products</h2>
              <ProductGrid isFeatured={true} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetailPage;
