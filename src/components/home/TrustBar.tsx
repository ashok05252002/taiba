import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Truck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const TrustBar: React.FC = () => {
    const { t, isRTL } = useLanguage();

    const trustItems = [
        { icon: Truck, title: t('trust.delivery'), desc: "Fast & reliable across Oman" },
        { icon: Headphones, title: t('trust.support'), desc: "24/7 Expert support" },
        { icon: ShieldCheck, title: 'Secure Payments', desc: "100% safe & secure" }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            className={`flex items-center space-x-4 p-6 rounded-2xl ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <div className="w-16 h-16 bg-taiba-pistachio/20 text-taiba-purple rounded-2xl flex items-center justify-center flex-shrink-0">
                                <item.icon size={32} />
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>{item.title}</h3>
                                <p className={`text-taiba-grey ${isRTL ? 'font-arabic' : ''}`}>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustBar;
