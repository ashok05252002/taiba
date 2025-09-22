import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SeasonalOffers: React.FC = () => {
    const offers = [
        {
            title: 'Summer Essentials',
            subtitle: 'Up to 40% Off',
            description: 'Get ready for the sun with our range of sunscreens, after-sun care, and travel kits.',
            image: '/assets/images/banner/banner2.jpg',
            link: '/products?category=sun-care',
            bg: 'bg-gradient-to-r from-yellow-300 to-orange-400'
        },
        {
            title: 'Immunity Boosters',
            subtitle: 'Buy 1 Get 1 Free',
            description: 'Strengthen your defenses with our selection of vitamins and supplements.',
            image: '/assets/images/banner/banner3.jpg',
            link: '/products?category=vitamins',
            bg: 'bg-gradient-to-r from-green-300 to-cyan-400'
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={index}
                            className={`relative rounded-3xl text-white overflow-hidden shadow-2xl ${offer.bg}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <img src={offer.image} alt={offer.title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
                            <div className="relative z-10 p-8 md:p-12 flex flex-col justify-between h-80">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">{offer.title}</h3>
                                    <p className="text-xl font-semibold text-black bg-taiba-pistachio inline-block px-3 py-1 rounded-lg mb-4">{offer.subtitle}</p>
                                    <p className="max-w-sm">{offer.description}</p>
                                </div>
                                <Link to={offer.link}>
                                    <motion.div
                                        className="flex items-center space-x-2 font-bold group"
                                        whileHover="hover"
                                    >
                                        <span>Shop Now</span>
                                        <motion.div variants={{ hover: { x: 5 } }}>
                                            <ArrowRight />
                                        </motion.div>
                                    </motion.div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SeasonalOffers;
