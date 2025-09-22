import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from '../common/ProductCard';
import { generateProducts } from '../../utils/mockData';

const ExclusiveDeals: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProducts(generateProducts(8, { isDeal: true, tags: ['Exclusive Deal'] }));
        const interval = setInterval(() => {
            scroll('right');
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
            let scrollTo;
            if (direction === 'left') {
                scrollTo = scrollLeft - clientWidth;
            } else {
                // If at the end, scroll back to the beginning
                if (scrollLeft + clientWidth >= scrollWidth - 1) {
                    scrollTo = 0;
                } else {
                    scrollTo = scrollLeft + clientWidth;
                }
            }
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (products.length === 0) return null;

    return (
        <section>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                    Exclusive Deals For You
                </h2>
                <div className="relative">
                    <motion.button 
                        onClick={() => scroll('left')}
                        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 hidden md:flex"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft />
                    </motion.button>
                    <div ref={scrollRef} className="flex overflow-x-auto space-x-6 py-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                        {products.map(product => (
                            <div className="flex-shrink-0 w-80 snap-center" key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    <motion.button 
                        onClick={() => scroll('right')}
                        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 hidden md:flex"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronRight />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default ExclusiveDeals;
