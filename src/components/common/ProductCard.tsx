import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingBag, Heart, Upload } from 'lucide-react';
import { Product } from '../../types';
import AddToCartButton from './AddToCartButton';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import PrescriptionUploadModal from './PrescriptionUploadModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const { buyNow } = useCart();
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

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.prescriptionRequired) {
        setIsPrescriptionModalOpen(true);
    } else {
        buyNow(product);
    }
  };

  const handlePrescriptionSuccess = () => {
      // After successful upload and add to cart, proceed to checkout
      buyNow(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
        <PrescriptionUploadModal
            isOpen={isPrescriptionModalOpen}
            onClose={() => setIsPrescriptionModalOpen(false)}
            product={product}
            onSuccess={handlePrescriptionSuccess}
        />
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
        <div className="relative">
            <Link to={`/products/${product.id}`} className="block">
            <div className="aspect-square overflow-hidden">
                <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                />
            </div>
            </Link>
            
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {discountPercentage > 0 && (
                <div className="bg-taiba-mustard text-black px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                -{discountPercentage}%
                </div>
            )}
            {product.prescriptionRequired && (
                <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
                    <Upload size={10} /> Rx Required
                </div>
            )}
            {product.tags?.map(tag => (
                <div key={tag} className="bg-taiba-blue text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                    {tag}
                </div>
            ))}
            </div>

            <motion.button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
            <Heart
                size={20}
                className={`transition-colors ${inWishlist ? 'text-red-500 fill-current' : 'text-gray-600'}`}
            />
            </motion.button>
            
            <motion.div 
            className="absolute bottom-3 right-3 flex flex-col space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            >
            <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Quick view logic here */ }} className="bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-md hover:bg-white">
                <Eye size={20} />
            </button>
            <button 
                onClick={handleBuyNow} 
                className="bg-taiba-purple text-white p-2 rounded-full shadow-md hover:bg-taiba-purple/90"
                title={product.prescriptionRequired ? "Upload Prescription & Buy" : "Buy Now"}
            >
                {product.prescriptionRequired ? <Upload size={20} /> : <ShoppingBag size={20} />}
            </button>
            </motion.div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
            <p className="text-taiba-grey text-sm font-medium mb-1">{product.category}</p>
            <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 transition-colors flex-grow hover:text-taiba-blue">
                {product.name}
            </h3>
            </Link>
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
        </motion.div>
    </>
  );
};

export default ProductCard;
