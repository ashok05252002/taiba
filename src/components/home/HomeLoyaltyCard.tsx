import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';

const HomeLoyaltyCard: React.FC = () => {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/rewards">
          <motion.div
            className="relative bg-gradient-to-r from-taiba-purple to-taiba-blue p-8 rounded-2xl text-white shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
          >
            <Award size={100} className="absolute -right-5 -bottom-5 opacity-10" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Award size={32} className="text-taiba-mustard" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">You have 2,450 Points!</h3>
                  <p className="opacity-80">You're just 550 points away from your next reward.</p>
                </div>
              </div>
              <div className="inline-flex items-center space-x-2 font-bold group bg-white text-taiba-purple px-6 py-3 rounded-full">
                <span>View Rewards</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default HomeLoyaltyCard;
