import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const SkincareOfferBanner: React.FC = () => {
    return (
        <motion.div 
            className="py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <Link to="/products?category=skin-care">
                <motion.div
                    className="relative max-w-screen-xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-r from-pink-400 to-rose-500 text-white p-8 md:p-12 shadow-2xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {/* Diagonal shape */}
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-white/10 skew-x-[-20deg] -mr-16"></div>

                    <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <Sparkles size={32} />
                                <span className="text-xl font-semibold">Skincare Specials</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-3">Up to 50% Off</h3>
                            <p className="max-w-md mb-6">
                                Rejuvenate your skin with our premium collection of serums, moisturizers, and cleansers.
                            </p>
                            <div className="inline-flex items-center space-x-2 font-bold group bg-white text-rose-500 px-6 py-3 rounded-full">
                                <span>Shop Skincare</span>
                                <ArrowRight className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                        <div className="hidden md:block relative h-48">
                            {/* Floating product mockups - can use icons */}
                            <motion.div className="absolute top-0 left-10" animate={{ y: [-5, 5], rotate: -5 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}>
                                <div className="w-24 h-32 bg-white/20 rounded-lg backdrop-blur-sm p-2"><p className="text-xs">Serum</p></div>
                            </motion.div>
                            <motion.div className="absolute bottom-0 right-10" animate={{ y: [5, -5], rotate: 5 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.5 }}>
                                <div className="w-28 h-20 bg-white/20 rounded-lg backdrop-blur-sm p-2"><p className="text-xs">Cream</p></div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

export default SkincareOfferBanner;
