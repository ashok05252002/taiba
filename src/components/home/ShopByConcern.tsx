import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Shield, Bone, Brain, Sun } from 'lucide-react';

const ShopByConcern: React.FC = () => {
    const concerns = [
        { name: 'Heart Health', icon: Heart, link: '/products?concern=heart' },
        { name: 'Immunity', icon: Shield, link: '/products?concern=immunity' },
        { name: 'Bone & Joint', icon: Bone, link: '/products?concern=bone' },
        { name: 'Cognitive Health', icon: Brain, link: '/products?concern=cognitive' },
        { name: 'Sun Care', icon: Sun, link: '/products?concern=sun' },
    ];

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
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Concern</h2>
                    <p className="text-lg text-taiba-grey max-w-2xl mx-auto">
                        Targeted solutions for your specific health need.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {concerns.map((concern, index) => (
                        <Link to={concern.link} key={index}>
                            <motion.div
                                className="p-6 rounded-2xl text-center bg-white/90 hover:bg-white transition-all duration-300 shadow-md border border-gray-100"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
                            >
                                <concern.icon className="w-12 h-12 mb-4 mx-auto text-taiba-purple" />
                                <h3 className="text-lg font-semibold text-gray-800">{concern.name}</h3>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopByConcern;
