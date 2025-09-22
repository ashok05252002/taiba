import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { Product } from '../types';
import ProductCard from './ProductCard';
import LoadingLottie from './LoadingLottie';

const generateProducts = (count: number): Product[] => {
    const categories = ['Medicines', 'Cosmetics', 'Baby Care', 'Vitamins', 'Personal Care'];
    return Array.from({ length: count }, (_, i) => {
      const originalPrice = faker.number.float({ min: 5, max: 50, fractionDigits: 2 });
      const hasDiscount = faker.datatype.boolean({ probability: 0.3 });
      const price = hasDiscount ? originalPrice * 0.8 : originalPrice;
      return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(price.toFixed(2)),
        originalPrice: hasDiscount ? parseFloat(originalPrice.toFixed(2)) : undefined,
        image: `/assets/images/products/product${(i % 6) + 1}.jpg`,
        category: categories[Math.floor(Math.random() * categories.length)],
        prescriptionRequired: faker.datatype.boolean({ probability: 0.2 }),
        inStock: faker.datatype.boolean({ probability: 0.9 }),
        rating: parseFloat(faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }).toFixed(1)),
        description: faker.lorem.paragraphs(3),
        dosage: 'Take one tablet twice a day.'
      };
    });
};

const NewArrivals: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setProducts(generateProducts(4));
            setLoading(false);
        }, 800);
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Discover the Latest Arrivals
                    </h2>
                    <p className="text-lg text-taiba-grey max-w-2xl mx-auto">
                        Check out the newest products in our collection.
                    </p>
                </motion.div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <LoadingLottie size="lg" />
                    </div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                )}
            </div>
        </section>
    );
};

export default NewArrivals;
