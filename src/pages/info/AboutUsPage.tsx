import React from 'react';
import { motion } from 'framer-motion';
import { Building, Heart, MapPin, Users } from 'lucide-react';
import MedicalBackground from '../../components/background/MedicalBackground';

const AboutUsPage: React.FC = () => {
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
                        About Taiba Pharmacy
                    </motion.h1>
                    <motion.p 
                        className="text-lg text-taiba-grey max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Your trusted healthcare partner, deeply rooted in the heart of Oman.
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                        <p className="text-taiba-grey leading-relaxed mb-4">
                            Founded in 2010, Taiba Pharmacy began as a single community pharmacy in Muscat with a simple mission: to provide accessible, reliable, and compassionate healthcare to the people of Oman.
                        </p>
                        <p className="text-taiba-grey leading-relaxed">
                            Over the years, we've grown into a network of pharmacies across the nation, but our core values remain unchanged. We blend modern technology with a personal touch, ensuring every customer feels cared for.
                        </p>
                    </motion.div>
                    <motion.div
                        className="h-80 rounded-2xl overflow-hidden shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src="/assets/images/footer/footer-bg.jpg" alt="Taiba Pharmacy Store" className="w-full h-full object-cover" />
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
                        <h3 className="text-2xl font-bold text-taiba-blue mb-3">Our Mission</h3>
                        <p className="text-taiba-grey">To be Oman's most trusted pharmacy by providing exceptional service, a wide range of quality products, and expert health advice that empowers our community to live healthier lives.</p>
                    </motion.div>
                    <motion.div 
                        className="bg-white p-8 rounded-2xl shadow-lg"
                        whileHover={{ y: -5 }}
                    >
                        <h3 className="text-2xl font-bold text-taiba-purple mb-3">Our Vision</h3>
                        <p className="text-taiba-grey">To innovate the pharmacy experience in Oman, making healthcare more convenient, personalized, and integrated into the daily lives of our customers.</p>
                    </motion.div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Heart, title: 'Compassion' },
                            { icon: Users, title: 'Community' },
                            { icon: Building, title: 'Integrity' },
                            { icon: MapPin, title: 'Excellence' }
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
