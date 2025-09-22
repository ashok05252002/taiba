import React from 'react';
import { motion } from 'framer-motion';
import { Upload, ShoppingBag, Clock, MapPin, Headphones } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Hero: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const floatingElements = [
    { icon: '💊', delay: 0, x: 100, y: 50 },
    { icon: '❤️', delay: 0.5, x: 200, y: 100 },
    { icon: '🏥', delay: 1, x: 150, y: 150 },
    { icon: '💊', delay: 1.5, x: 300, y: 80 },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      {/* Floating Medical Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'lg:grid-cols-2' : ''}`}>
          
          {/* Content Side */}
          <motion.div
            className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} space-y-8`}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${isRTL ? 'text-right font-arabic' : 'text-left'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-taiba-blue">{t('hero.title').split(' ')[0]}</span>{' '}
              <span className="text-taiba-purple">{t('hero.title').split(' ')[1]}</span>
              <span className="text-gray-900"> — {t('hero.title').split(' — ')[1]}</span>
            </motion.h1>

            <motion.p
              className={`text-lg md:text-xl text-taiba-grey leading-relaxed ${isRTL ? 'text-right font-arabic' : 'text-left'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="bg-taiba-blue text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={24} />
                <span>{t('hero.cta1')}</span>
              </motion.button>

              <motion.button
                className="bg-taiba-purple text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload size={24} />
                <span>{t('hero.cta2')}</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className={`${isRTL ? 'lg:order-1' : 'lg:order-2'} relative`}
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <motion.img
                src="/assets/images/hero/hero-oman-1.jpg"
                alt="Taiba Pharmacy in Oman"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating Info Cards */}
              <motion.div
                className="absolute top-4 left-4 bg-white rounded-2xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-taiba-blue rounded-full flex items-center justify-center">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">24/7 Service</p>
                    <p className="text-xs text-taiba-grey">Always Available</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 right-4 bg-white rounded-2xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-taiba-purple rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">All of Oman</p>
                    <p className="text-xs text-taiba-grey">Fast Delivery</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust Bar */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { icon: Headphones, title: t('trust.support'), desc: "Get help anytime" },
            { icon: MapPin, title: t('trust.stores'), desc: "Nationwide coverage" },
            { icon: Clock, title: t('trust.delivery'), desc: "Within 2 hours" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-taiba-blue to-taiba-purple rounded-2xl flex items-center justify-center">
                <item.icon className="text-white" size={24} />
              </div>
              <div>
                <h3 className={`font-semibold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>{item.title}</h3>
                <p className={`text-taiba-grey text-sm ${isRTL ? 'font-arabic' : ''}`}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
