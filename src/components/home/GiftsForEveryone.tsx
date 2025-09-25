import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import GiftCardCustomizationModal from './GiftCardCustomizationModal';

const giftCategories = [
  { name: 'Colleague', image: '/images/colleague.png', slug: 'colleague' },
  { name: 'Grandfather', image: '/images/grandfather.png', slug: 'grandfather' },
  { name: 'Grandmother', image: '/images/grandmother.png', slug: 'grandmother' },
  { name: 'Dad', image: '/images/uncle.png', slug: 'dad' },
  { name: 'Mom', image: '/images/aunt.png', slug: 'mom' },
  { name: 'Children', image: '/images/children.png', slug: 'children' },
  { name: 'Gift Card', isGiftCard: true, slug: 'gift-card' },
];

const GiftsForEveryone: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<(typeof giftCategories[0]) | null>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const handleCardClick = (category: typeof giftCategories[0]) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    return (
        <>
            <GiftCardCustomizationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={selectedCategory}
            />
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
                            {giftCategories.map((cat) => (
                                <motion.div
                                    key={cat.slug}
                                    className="flex-shrink-0 w-48 text-center cursor-pointer group"
                                    whileHover={{ y: -5 }}
                                    onClick={() => handleCardClick(cat)}
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
                            ))}
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
        </>
    );
};

export default GiftsForEveryone;
