import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Baby, Sparkles, HeartPulse, Leaf, Pill, SprayCan, Stethoscope } from 'lucide-react';

const HomeTopCategories: React.FC = () => {
    const categories = [
        { name: 'Medicines', icon: Pill, color: 'from-red-400 to-orange-400', link: '/products?category=medicines' },
        { name: 'Skin Care', icon: Sparkles, color: 'from-pink-400 to-rose-400', link: '/products?category=skin-care' },
        { name: 'Cosmetics', icon: SprayCan, color: 'from-purple-400 to-violet-400', link: '/products?category=cosmetics' },
        { name: 'Fragrances', icon: Leaf, color: 'from-teal-400 to-cyan-400', link: '/products?category=fragrances' },
        { name: 'Baby Care', icon: Baby, color: 'from-blue-400 to-cyan-400', link: '/products?category=baby-care' },
        { name: 'Nutrition', icon: HeartPulse, color: 'from-green-400 to-emerald-400', link: '/products?category=nutrition' },
        { name: 'Devices', icon: Stethoscope, color: 'from-gray-500 to-gray-700', link: '/products?category=devices' }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Categories</h2>
                    <p className="text-lg text-taiba-grey max-w-2xl mx-auto">
                        Find everything you need for your health and wellness journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
                    {categories.map((category, index) => (
                        <Link to={category.link} key={index}>
                            <motion.div
                                className={`relative p-6 rounded-2xl text-white overflow-hidden shadow-lg bg-gradient-to-br ${category.color}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
                            >
                                <div className="relative z-10 text-center flex flex-col items-center justify-center h-24">
                                    <category.icon className="w-10 h-10 mb-3" />
                                    <h3 className="text-md font-bold">{category.name}</h3>
                                </div>
                                <div className="absolute -bottom-4 -right-4 opacity-10">
                                    <category.icon className="w-20 h-20" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeTopCategories;
