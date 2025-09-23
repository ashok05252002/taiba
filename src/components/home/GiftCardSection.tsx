import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, ArrowRight } from 'lucide-react';

const GiftCardSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/gift-cards">
          <motion.div
            className="relative bg-gradient-to-r from-taiba-mustard to-yellow-500 p-8 rounded-2xl text-black shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
          >
            <Gift size={120} className="absolute -right-8 -bottom-8 opacity-10 text-black" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                  <Gift size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">The Perfect Gift of Health</h3>
                  <p className="opacity-80">Give your loved ones the freedom to choose with a Taiba Gift Card.</p>
                </div>
              </div>
              <div className="inline-flex items-center space-x-2 font-bold group bg-black text-white px-6 py-3 rounded-full">
                <span>Shop Gift Cards</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default GiftCardSection;
