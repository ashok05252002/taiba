import React from 'react';
import { motion } from 'framer-motion';
import { generateProducts } from '../../utils/mockData';
import ProductCard from '../common/ProductCard';

const Wishlist = () => {
    const wishlistItems = generateProducts(4);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlistItems.map((product, index) => (
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
                <p className="text-taiba-grey">Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
