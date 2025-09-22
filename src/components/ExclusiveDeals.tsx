import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { faker } from '@faker-js/faker';
import { Product } from '../types';
import ProductCard from './ProductCard';

const generateProducts = (count: number): Product[] => {
    const categories = ['Medicines', 'Cosmetics', 'Baby Care', 'Vitamins', 'Personal Care'];
    return Array.from({ length: count }, (_, i) => {
      const originalPrice = faker.number.float({ min: 10, max: 80, fractionDigits: 2 });
      const price = originalPrice * faker.number.float({ min: 0.5, max: 0.8, fractionDigits: 2 });
      return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(price.toFixed(2)),
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        image: `/assets/images/products/product${(i % 6) + 1}.jpg`,
        category: categories[Math.floor(Math.random() * categories.length)],
        prescriptionRequired: faker.datatype.boolean({ probability: 0.1 }),
        inStock: true,
        rating: parseFloat(faker.number.float({ min: 4.0, max: 5, fractionDigits: 1 }).toFixed(1)),
        description: faker.lorem.paragraphs(2),
        dosage: 'As per product label.'
      };
    });
};

const ExclusiveDeals: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProducts(generateProducts(8));
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (products.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                    Exclusive Deals
                </h2>
                <div className="relative">
                    <motion.button 
                        onClick={() => scroll('left')}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden md:flex"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft />
                    </motion.button>
                    <div ref={scrollRef} className="flex overflow-x-auto space-x-6 py-4" style={{ scrollbarWidth: 'none' }}>
                        {products.map(product => (
                            <div className="flex-shrink-0 w-72" key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    <motion.button 
                        onClick={() => scroll('right')}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden md:flex"
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
