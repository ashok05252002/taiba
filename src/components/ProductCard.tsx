import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, AlertCircle, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../hooks/useLanguage';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group h-full flex flex-col relative"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Link to={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {discountPercentage > 0 && (
              <div className="bg-taiba-mustard text-black px-2 py-1 rounded-full text-xs font-bold">
                -{discountPercentage}%
              </div>
            )}
            {product.prescriptionRequired && (
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1" title={t('prescription.required')}>
                <AlertCircle size={12} />
                <span>Rx</span>
              </div>
            )}
          </div>

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col space-y-3">
              <motion.button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Quick view logic here */ }}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={18} />
                <span>Quick View</span>
              </motion.button>
              <motion.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-taiba-blue text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 disabled:bg-gray-400"
                whileHover={product.inStock ? { scale: 1.05 } : {}}
                whileTap={product.inStock ? { scale: 0.95 } : {}}
              >
                <ShoppingCart size={18} />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-taiba-grey text-sm font-medium mb-1">{product.category}</p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-taiba-blue transition-colors flex-grow">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-taiba-grey">({product.rating})</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-taiba-blue">OMR {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">OMR {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
