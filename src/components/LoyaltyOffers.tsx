import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star, Percent, Crown } from 'lucide-react';

const LoyaltyOffers: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: '20% OFF on Vitamins',
      description: 'Get 20% discount on all vitamin supplements',
      discount: '20%',
      validUntil: 'Valid until Dec 31',
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 2,
      title: 'Free Delivery',
      description: 'Free delivery on orders above $25',
      discount: 'FREE',
      validUntil: 'Valid until Dec 25',
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 3,
      title: 'Buy 2 Get 1 Free',
      description: 'On selected personal care items',
      discount: 'B2G1',
      validUntil: 'Valid until Jan 15',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-taiba-blue to-taiba-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Loyalty Rewards & Offers
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Earn points with every purchase and enjoy exclusive discounts
          </p>
        </motion.div>

        {/* Loyalty Card */}
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 mb-12 border border-white border-opacity-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Points Balance */}
            <div className="text-center lg:text-left">
              <motion.div
                className="inline-flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-taiba-mustard rounded-full flex items-center justify-center">
                  <Crown className="text-black" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Gold Member</h3>
                  <p className="text-blue-100">Ahmed Al-Rashid</p>
                </div>
              </motion.div>
            </div>

            {/* Points Display */}
            <div className="text-center">
              <motion.div
                className="mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-4xl font-bold text-white mb-2">2,450</div>
                <div className="text-blue-100">Reward Points</div>
              </motion.div>
              <div className="flex items-center justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${i < 4 ? 'text-taiba-mustard fill-current' : 'text-blue-300'}`}
                  />
                ))}
              </div>
            </div>

            {/* Next Reward */}
            <div className="text-center lg:text-right">
              <div className="mb-4">
                <div className="text-lg font-semibold text-white mb-2">Next Reward</div>
                <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-taiba-mustard h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="text-blue-100 text-sm">550 points to $10 voucher</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Offers Carousel */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Offer Header */}
              <div className={`h-32 bg-gradient-to-r ${offer.color} relative overflow-hidden`}>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">{offer.discount}</div>
                    <div className="text-white text-sm">OFF</div>
                  </div>
                </motion.div>
                
                {/* Floating icons */}
                <motion.div
                  className="absolute top-4 right-4 text-white opacity-30"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Gift size={24} />
                </motion.div>
              </div>

              {/* Offer Content */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-taiba-grey text-sm mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{offer.validUntil}</span>
                  <motion.button
                    className="bg-taiba-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Claim Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Earn Points */}
        <motion.div
          className="mt-16 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">How to Earn Points</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🛒', title: 'Shop', desc: '1 point per $1 spent' },
              { icon: '📝', title: 'Review', desc: '50 points per review' },
              { icon: '👥', title: 'Refer', desc: '100 points per referral' },
              { icon: '🎂', title: 'Birthday', desc: '200 bonus points' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoyaltyOffers;
