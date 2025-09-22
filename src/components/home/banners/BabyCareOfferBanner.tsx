import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Baby, ArrowRight } from 'lucide-react';

const BabyCareOfferBanner: React.FC = () => {
    return (
        <motion.div 
            className="py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
                <Link to="/products?category=baby-care" className="md:col-span-2">
                    <motion.div
                        className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-300 to-blue-400 text-white p-8 md:p-12 shadow-2xl flex flex-col justify-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Baby size={160} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-3">For Your Little One</h3>
                            <p className="max-w-md mb-6">
                                Gentle, safe, and effective products for your baby's delicate skin.
                            </p>
                            <div className="inline-flex items-center space-x-2 font-bold group bg-white text-blue-500 px-6 py-3 rounded-full">
                                <span>Explore Baby Care</span>
                                <ArrowRight className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </motion.div>
                </Link>
                <Link to="/products?category=vitamins">
                    <motion.div
                        className="relative h-full rounded-2xl overflow-hidden bg-taiba-mustard text-black p-8 shadow-2xl flex flex-col justify-center items-center text-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <h3 className="text-2xl font-bold mb-2">Vitamins & Supplements</h3>
                        <p className="mb-4">Boost your health from within.</p>
                        <div className="inline-flex items-center space-x-2 font-bold group">
                            <span>Shop Now</span>
                            <ArrowRight className="transition-transform group-hover:translate-x-1" />
                        </div>
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
};
export default BabyCareOfferBanner;
