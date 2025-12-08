import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Gift, Star, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const RewardsPage: React.FC = () => {
    const { t } = useLanguage();
    const tiers = [
        { name: t('rewards.tier_bronze'), points: '0-999', color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { name: t('rewards.tier_silver'), points: '1000-2999', color: 'text-gray-500', bg: 'bg-gray-200' },
        { name: t('rewards.tier_gold'), points: '3000+', color: 'text-yellow-500', bg: 'bg-yellow-200' },
    ];

    const redeemOptions = [
        { points: 500, reward: t('rewards.redeem_1') },
        { points: 1000, reward: t('rewards.redeem_2') },
        { points: 2500, reward: t('rewards.redeem_3') },
    ];

    return (
        <div className="bg-white py-16">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-taiba-purple mb-4">{t('rewards.title')}</h1>
                    <p className="text-lg text-taiba-grey">{t('rewards.subtitle')}</p>
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
                            <p className="text-lg">{t('rewards.current_balance')}</p>
                            <p className="text-4xl font-bold">2,450 {t('rewards.points')}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg">{t('rewards.your_tier')}</p>
                            <p className="text-4xl font-bold flex items-center space-x-2">
                                <Award className="text-taiba-mustard" />
                                <span>{t('rewards.tier_silver')}</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Redeem Points */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('rewards.redeem_title')}</h2>
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
                                <p className="text-2xl font-bold text-taiba-purple mb-4">{option.points} {t('rewards.pts')}</p>
                                <button className="bg-taiba-mustard text-black font-semibold px-6 py-2 rounded-full">{t('rewards.redeem_cta')}</button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* How to Earn */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('rewards.how_to_earn_title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: '🛒', title: t('rewards.earn_shop'), desc: t('rewards.earn_shop_desc') },
                            { icon: '📝', title: t('rewards.earn_review'), desc: t('rewards.earn_review_desc') },
                            { icon: '👥', title: t('rewards.earn_refer'), desc: t('rewards.earn_refer_desc') },
                            { icon: '🎂', title: t('rewards.earn_birthday'), desc: t('rewards.earn_birthday_desc') }
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
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('rewards.tiers_title')}</h2>
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
                                <p className="font-semibold mb-4">{tier.points} {t('rewards.points')}</p>
                                <ul className="space-y-2 text-left">
                                    <li className="flex items-center space-x-2"><Star size={16} className={tier.color} /> <span>{t('rewards.tier_benefit_1')}</span></li>
                                    {index > 0 && <li className="flex items-center space-x-2"><Gift size={16} className={tier.color} /> <span>{t('rewards.tier_benefit_2')}</span></li>}
                                    {index > 1 && <li className="flex items-center space-x-2"><ShoppingBag size={16} className={tier.color} /> <span>{t('rewards.tier_benefit_3')}</span></li>}
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
