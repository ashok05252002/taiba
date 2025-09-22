import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';

const WellnessOfferBanner: React.FC = () => {
    return (
        <motion.div
            className="py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <Link to="/products?category=wellness">
                <motion.div
                    className="relative max-w-screen-xl mx-auto rounded-2xl overflow-hidden bg-taiba-purple text-white p-8 md:p-12 shadow-2xl text-center"
                    whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(115, 38, 117, 0.4)' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {/* Abstract background pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" width="100%" height="100%">
                        <defs>
                            <pattern id="wellness-pattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="scale(1) rotate(45)">
                                <path d="M10 10 L50 10 L50 50 L10 50 Z" stroke="#FFFFFF" fill="none" strokeWidth="1"/>
                                <circle cx="30" cy="30" r="5" fill="#FFFFFF"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#wellness-pattern)"/>
                    </svg>

                    <div className="relative z-10">
                        <Leaf size={40} className="mx-auto mb-4" />
                        <h3 className="text-3xl md:text-4xl font-bold mb-3">Embrace Total Wellness</h3>
                        <p className="max-w-2xl mx-auto mb-6">
                            Discover our curated collection of products for a healthy mind, body, and soul.
                        </p>
                        <div className="inline-flex items-center space-x-2 font-bold group">
                            <span>Discover Wellness Products</span>
                            <ArrowRight className="transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

export default WellnessOfferBanner;
