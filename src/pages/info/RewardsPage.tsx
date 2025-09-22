import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Gift, Star, ShoppingBag } from 'lucide-react';

const RewardsPage: React.FC = () => {
    const tiers = [
        { name: 'Bronze', points: '0-999', color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { name: 'Silver', points: '1000-2999', color: 'text-gray-500', bg: 'bg-gray-200' },
        { name: 'Gold', points: '3000+', color: 'text-yellow-500', bg: 'bg-yellow-200' },
    ];

    const redeemOptions = [
        { points: 500, reward: 'OMR 5 Voucher' },
        { points: 1000, reward: 'Free Delivery for a Month' },
        { points: 2500, reward: '15% Off Total Order' },
    ];

    return (
        <div className="bg-white py-16">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-taiba-purple mb-4">Taiba Rewards Program</h1>
                    <p className="text-lg text-taiba-grey">Earn points, unlock exclusive benefits, and get rewarded for your loyalty.</p>
                </motion.div>

                {/* Current Status */}
                <motion.div 
                    className="bg-gradient-to-r from-taiba-blue to-taiba-purple text-white p-8 rounded-2xl shadow-xl mb-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg">Your Current Balance</p>
                            <p className="text-4xl font-bold">2,450 Points</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg">Your Tier</p>
                            <p className="text-4xl font-bold flex items-center space-x-2">
                                <Crown className="text-taiba-mustard" />
                                <span>Silver Member</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Redeem Points */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Redeem Your Points</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {redeemOptions.map((option, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-50 p-6 rounded-2xl text-center shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h3 className="font-bold text-xl text-taiba-blue mb-2">{option.reward}</h3>
                                <p className="text-2xl font-bold text-taiba-purple mb-4">{option.points} pts</p>
                                <button className="bg-taiba-mustard text-black font-semibold px-6 py-2 rounded-full">Redeem</button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How to Earn */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How to Earn Points</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: '🛒', title: 'Shop Online', desc: '1 point per OMR 1' },
                            { icon: '📝', title: 'Write a Review', desc: '50 points' },
                            { icon: '👥', title: 'Refer a Friend', desc: '200 points' },
                            { icon: '🎂', title: 'Birthday Bonus', desc: '500 points' }
                        ].map((item, index) => (
                             <motion.div 
                                key={index}
                                className="bg-gray-50 p-6 rounded-2xl"
                                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                             >
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="text-taiba-grey">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Tiers */}
                <section>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Membership Tiers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((tier, index) => (
                            <motion.div 
                                key={tier.name} 
                                className={`p-8 rounded-2xl border-2 ${tier.bg.replace('bg-', 'border-')} ${tier.bg}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h3 className={`text-2xl font-bold ${tier.color} mb-2`}>{tier.name}</h3>
                                <p className="font-semibold mb-4">{tier.points} Points</p>
                                <ul className="space-y-2 text-left">
                                    <li className="flex items-center space-x-2"><Star size={16} className={tier.color} /> <span>Base points earning</span></li>
                                    {index > 0 && <li className="flex items-center space-x-2"><Gift size={16} className={tier.color} /> <span>Exclusive offers</span></li>}
                                    {index > 1 && <li className="flex items-center space-x-2"><ShoppingBag size={16} className={tier.color} /> <span>Early access to sales</span></li>}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RewardsPage;
