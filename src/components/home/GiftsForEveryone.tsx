import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const giftCategories = [
  { name: 'Colleague', image: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=600', slug: 'colleague' },
  { name: 'Grandfather', image: 'https://images.pexels.com/photos/1519192/pexels-photo-1519192.jpeg?auto=compress&cs=tinysrgb&w=600', slug: 'grandfather' },
  { name: 'Grandmother', image: 'https://images.pexels.com/photos/5617830/pexels-photo-5617830.jpeg?auto=compress&cs=tinysrgb&w=600', slug: 'grandmother' },
  { name: 'Uncle', image: 'https://images.pexels.com/photos/7533320/pexels-photo-7533320.jpeg?auto=compress&cs=tinysrgb&w=600', slug: 'uncle' },
  { name: 'Aunt', image: 'https://images.pexels.com/photos/18440384/pexels-photo-18440384.jpeg?auto=compress&cs=tinysrgb&w=600', slug: 'aunt' },
  { name: 'Children', image: 'https://images.pexels.com/photos/1556706/pexels-photo-1556706.jpeg?auto=compress&cs=tinysrgb&w=600', slug: 'children' },
  { name: 'Gift Card', isGiftCard: true, slug: 'gift-card' },
];

const GiftsForEveryone: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-taiba-purple mb-4">Gifts for Everyone</h2>
                    <p className="text-lg text-taiba-grey max-w-2xl mx-auto">
                        Find the perfect gift of health for your loved ones.
                    </p>
                </motion.div>

                <div className="relative">
                    <motion.button 
                        onClick={() => scroll('left')}
                        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden md:flex"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft />
                    </motion.button>
                    <div ref={scrollRef} className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide">
                        {giftCategories.map((cat) => {
                            const cardContent = (
                                <motion.div
                                    className="flex-shrink-0 w-48 text-center cursor-pointer group"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="relative w-40 h-48 mx-auto">
                                        <div className="absolute inset-x-0 top-0 h-40 bg-taiba-wheat/30 rounded-full"></div>
                                        <div className="relative w-40 h-48 mt-2 overflow-hidden rounded-t-[80px] transition-all duration-300 group-hover:scale-105">
                                            {cat.isGiftCard ? (
                                                <div className="w-full h-full bg-gradient-to-br from-taiba-blue to-taiba-purple flex flex-col items-center justify-center text-white p-4">
                                                    <Gift size={48} />
                                                    <p className="font-bold mt-2">Gift Card</p>
                                                </div>
                                            ) : (
                                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover object-top" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-3 font-semibold text-taiba-grey group-hover:text-taiba-purple transition-colors">
                                        {cat.name}
                                    </p>
                                </motion.div>
                            );

                            if (cat.isGiftCard) {
                                return <Link to="/gift-cards" key={cat.slug}>{cardContent}</Link>;
                            } else {
                                return <Link to={`/products?category=gifts-for-${cat.slug}`} key={cat.slug}>{cardContent}</Link>;
                            }
                        })}
                    </div>
                    <motion.button 
                        onClick={() => scroll('right')}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 hidden md:flex"
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

export default GiftsForEveryone;
