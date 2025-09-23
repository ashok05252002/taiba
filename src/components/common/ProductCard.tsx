import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col relative border border-transparent hover:border-taiba-blue hover:shadow-xl transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {discountPercentage > 0 && (
              <div className="bg-taiba-mustard text-black px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                -{discountPercentage}%
              </div>
            )}
            {product.prescriptionRequired && (
                <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                    Rx Required
                </div>
            )}
            {product.tags?.map(tag => (
                <div key={tag} className="bg-taiba-blue text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                    {tag}
                </div>
            ))}
          </div>
          
          <motion.div 
            className="absolute bottom-3 right-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Quick view logic here */ }} className="bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-md hover:bg-white">
                <Eye size={20} />
            </button>
          </motion.div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-taiba-grey text-sm font-medium mb-1">{product.category}</p>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 transition-colors flex-grow">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-taiba-grey">({product.rating})</span>
          </div>
          <div className="flex items-baseline justify-between mt-auto">
            <div>
                <span className="text-xl font-bold text-taiba-purple">OMR {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">OMR {product.originalPrice.toFixed(2)}</span>
                )}
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
