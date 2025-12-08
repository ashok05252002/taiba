import React from 'react';
import { motion } from 'framer-motion';
import { generateProducts } from '../../utils/mockData';
import ProductCard from '../common/ProductCard';
import { useWishlist } from '../../contexts/WishlistContext';

const Wishlist = () => {
    const { wishlistItems } = useWishlist();
    // In a real app, you'd fetch product details for the IDs in wishlistItems
    const wishlistProducts = generateProducts(10).filter(p => wishlistItems.includes(p.id));

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlistProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-taiba-grey">Your wishlist is empty. Add items by clicking the heart icon!</p>
            )}
        </div>
    );
};

export default Wishlist;
