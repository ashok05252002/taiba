import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Baby, Sparkles, HeartPulse, Leaf } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const TopCategories: React.FC = () => {
    const { t, isRTL } = useLanguage();
    
    const categories = [
        { name: 'Baby Care', icon: Baby, color: 'from-blue-400 to-blue-600', link: '/products?category=babycare' },
        { name: 'Skin Care', icon: Sparkles, color: 'from-pink-400 to-pink-600', link: '/products?category=skincare' },
        { name: 'Nutrition', icon: HeartPulse, color: 'from-green-400 to-green-600', link: '/products?category=nutrition' },
        { name: 'Wellness', icon: Leaf, color: 'from-purple-400 to-purple-600', link: '/products?category=wellness' }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Categories</h2>
                    <p className="text-lg text-taiba-grey max-w-2xl mx-auto">
                        Find everything you need for your health and wellness.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <Link to={category.link} key={index}>
                            <motion.div
                                className={`relative p-8 rounded-2xl text-white overflow-hidden shadow-xl bg-gradient-to-br ${category.color}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="relative z-10 text-center">
                                    <category.icon className="w-16 h-16 mb-4 mx-auto" />
                                    <h3 className={`text-2xl font-bold ${isRTL ? 'font-arabic' : ''}`}>{category.name}</h3>
                                </div>
                                <div className="absolute -bottom-4 -right-4 opacity-10">
                                    <category.icon className="w-24 h-24" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCategories;
