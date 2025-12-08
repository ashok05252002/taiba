import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

interface MobileProductCardProps {
  product: Product;
}

const MobileProductCard: React.FC<MobileProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/mobile/products/${product.id}`} className="block">
      <motion.div
        className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col"
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-taiba-mustard text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          <motion.button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm p-1.5 rounded-full"
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} className={`transition-colors ${inWishlist ? 'text-red-500 fill-current' : 'text-gray-500'}`}/>
          </motion.button>
        </div>
        
        <div className="p-3 flex flex-col flex-grow">
          <p className="text-xs text-gray-500 mb-1 line-clamp-1">{product.category}</p>
          <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 flex-grow">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-md font-bold text-taiba-purple">OMR {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-1">OMR {product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="w-8 h-8 bg-taiba-blue text-white rounded-full flex items-center justify-center shadow-md"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default MobileProductCard;
