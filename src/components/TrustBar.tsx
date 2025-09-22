import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const TrustBar: React.FC = () => {
    const { t, isRTL } = useLanguage();

    const trustItems = [
        { icon: Headphones, title: t('trust.support'), desc: "Get help anytime" },
        { icon: MapPin, title: t('trust.stores'), desc: "Nationwide coverage" },
        { icon: Clock, title: t('trust.delivery'), desc: "Within 2 hours" }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    {trustItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-taiba-blue to-taiba-purple rounded-2xl flex items-center justify-center flex-shrink-0">
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

export default TrustBar;
