import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import ProductCard from '../common/ProductCard';
import { generateProducts } from '../../utils/mockData';

const RecommendedForYou: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(generateProducts(4, { isRecommended: true, tags: ['Recommended'] }));
    }, []);

    return (
        <section>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Recommended For You
                    </h2>
                    <p className="text-lg text-taiba-grey max-w-2xl mx-auto">
                        Handpicked products we think you'll love.
                    </p>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default RecommendedForYou;
