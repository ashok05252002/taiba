import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { Link } from 'react-router-dom';

const banners = [
  {
    id: 1,
    image: 'https://static.vecteezy.com/system/resources/previews/001/937/762/non_2x/digital-online-healthcare-transport-doctor-delivery-on-scooter-with-map-and-location-pin-on-mobile-phone-concept-for-emergency-health-medical-vector.jpg',
    title: 'Your Health, Our Priority',
    subtitle: 'Get your medicines delivered to your doorstep within hours, anywhere in Oman.',
    cta: 'Shop Medicines Now'
  },
  {
    id: 2,
    image: 'https://png.pngtree.com/png-clipart/20220511/original/pngtree-pharmacy-delivery-banner-medicine-online-png-image_7711772.png',
    title: 'Unbeatable Seasonal Offers',
    subtitle: 'Up to 50% off on wellness and skincare products. Limited time only!',
    cta: 'Explore Deals'
  },
  {
    id: 3,
    image: 'https://www.asclepiuswellness.com/img/slide/3-Sniss-Herbal.jpg',
    title: 'Consult with Experts',
    subtitle: 'Our licensed pharmacists are available 24/7 for your health needs.',
    cta: 'Ask a Pharmacist'
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
  const { isRTL } = useLanguage();

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
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-gray-900 rounded-3xl shadow-2xl">
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
            opacity: { duration: 0.3 },
          }}
        >
          <img
            src={banners[imageIndex].image}
            alt={banners[imageIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className={`absolute inset-0 flex flex-col justify-end items-center text-center text-white p-8 md:p-12 ${isRTL ? 'text-right items-end' : 'text-left items-start'}`}>
        <motion.h1
          key={`${page}-title`}
          className="text-3xl md:text-5xl font-bold mb-4 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {banners[imageIndex].title}
        </motion.h1>
        <motion.p
          key={`${page}-subtitle`}
          className="text-lg md:text-xl max-w-xl mb-8"
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
              className="bg-taiba-pistachio text-black px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05, boxShadow: '0px 5px 20px rgba(188, 226, 104, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={24} />
              <span>{banners[imageIndex].cta}</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
        <motion.button
          onClick={() => paginate(-1)}
          className="bg-white/50 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={28} />
        </motion.button>
        <motion.button
          onClick={() => paginate(1)}
          className="bg-white/50 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={28} />
        </motion.button>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === imageIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
