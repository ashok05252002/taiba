import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router-dom';

const banners = [
  {
    id: 1,
    image: '/assets/images/banner/banner1.jpg',
    title: 'Fast & Reliable Delivery',
    subtitle: 'Get your medicines delivered to your doorstep within hours.',
  },
  {
    id: 2,
    image: '/assets/images/banner/banner2.jpg',
    title: 'Expert Pharmacist Advice',
    subtitle: 'Consult with our licensed pharmacists for your health needs.',
  },
  {
    id: 3,
    image: '/assets/images/banner/banner3.jpg',
    title: 'Wide Range of Products',
    subtitle: 'From prescription drugs to wellness products, we have it all.',
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const BannerCarousel: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const { t, isRTL } = useLanguage();

  const imageIndex = (page % banners.length + banners.length) % banners.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-gray-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="absolute h-full w-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <img
            src={banners[imageIndex].image}
            alt={banners[imageIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
        <motion.h1
          key={`${page}-title`}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {banners[imageIndex].title}
        </motion.h1>
        <motion.p
          key={`${page}-subtitle`}
          className="text-lg md:text-xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {banners[imageIndex].subtitle}
        </motion.p>
        <motion.div
          key={`${page}-cta`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/products">
            <motion.button
              className="bg-taiba-blue text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={24} />
              <span>{t('hero.cta1')}</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
        <motion.button
          onClick={() => paginate(-1)}
          className="bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={() => paginate(1)}
          className="bg-white bg-opacity-50 hover:bg-opacity-75 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === imageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
