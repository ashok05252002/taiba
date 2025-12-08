import React from 'react';
import { motion } from 'framer-motion';
import { Building, Heart, MapPin, Users } from 'lucide-react';
import MedicalBackground from '../../components/background/MedicalBackground';
import { useLanguage } from '../../hooks/useLanguage';

const AboutUsPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-taiba-blue/10 pt-24 pb-16 overflow-hidden">
                <MedicalBackground theme="about" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-bold text-taiba-purple mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t('about.title')}
                    </motion.h1>
                    <motion.p 
                        className="text-lg text-taiba-grey max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t('about.subtitle')}
                    </motion.p>
                </div>
            </div>

            {/* Our Story */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.story_title')}</h2>
                        <p className="text-taiba-grey leading-relaxed mb-4">
                            {t('about.story_p1')}
                        </p>
                        <p className="text-taiba-grey leading-relaxed">
                            {t('about.story_p2')}
                        </p>
                    </motion.div>
                    <motion.div
                        className="h-80 rounded-2xl overflow-hidden shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src="/assets/images/footer/footer-bg.jpg" alt="taiba Pharmacy Store" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
                    <motion.div 
                        className="bg-white p-8 rounded-2xl shadow-lg"
                        whileHover={{ y: -5 }}
                    >
                        <h3 className="text-2xl font-bold text-taiba-blue mb-3">{t('about.mission_title')}</h3>
                        <p className="text-taiba-grey">{t('about.mission_text')}</p>
                    </motion.div>
                    <motion.div 
                        className="bg-white p-8 rounded-2xl shadow-lg"
                        whileHover={{ y: -5 }}
                    >
                        <h3 className="text-2xl font-bold text-taiba-purple mb-3">{t('about.vision_title')}</h3>
                        <p className="text-taiba-grey">{t('about.vision_text')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('about.values_title')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Heart, title: t('about.value_compassion') },
                            { icon: Users, title: t('about.value_community') },
                            { icon: Building, title: t('about.value_integrity') },
                            { icon: MapPin, title: t('about.value_excellence') }
                        ].map((value, index) => (
                             <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                             >
                                <div className="w-20 h-20 bg-taiba-blue/10 rounded-full mx-auto flex items-center justify-center mb-4">
                                    <value.icon className="text-taiba-blue" size={32} />
                                </div>
                                <h3 className="text-xl font-semibold">{value.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
