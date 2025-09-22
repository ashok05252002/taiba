import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
    const locations = [
        { name: 'Muscat Grand Mall', address: 'Al Khuwair, Muscat', hours: '10am - 10pm' },
        { name: 'Salalah Gardens Mall', address: 'Salalah', hours: '10am - 10pm' },
        { name: 'Sohar City Centre', address: 'Sohar', hours: '10am - 10pm' },
    ];

    return (
        <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-taiba-purple mb-4">Get In Touch</h1>
                    <p className="text-lg text-taiba-grey">We're here to help. Contact us with any questions or concerns.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Contact Form */}
                    <motion.div 
                        className="bg-gray-50 p-8 rounded-2xl shadow-lg"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
                            <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
                            <input type="text" placeholder="Subject" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue" />
                            <textarea placeholder="Your Message" rows={5} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-blue"></textarea>
                            <motion.button 
                                type="submit" 
                                className="w-full bg-taiba-blue text-white py-3 rounded-xl font-semibold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div 
                        className="space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-taiba-blue/10 p-3 rounded-full"><Phone className="text-taiba-blue" /></div>
                                <div>
                                    <h3 className="font-semibold">Phone & WhatsApp</h3>
                                    <p className="text-taiba-grey">+968 9876 5432</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-taiba-blue/10 p-3 rounded-full"><Mail className="text-taiba-blue" /></div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-taiba-grey">support@taibapharmacy.om</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 bg-gray-200 rounded-2xl mt-8 overflow-hidden">
                            <img src="/assets/images/maps/oman-map-placeholder.png" alt="Map of Oman" className="w-full h-full object-cover" />
                        </div>
                    </motion.div>
                </div>

                {/* Store Locations */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Locations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {locations.map((loc, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-50 p-6 rounded-2xl shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="font-bold text-xl text-taiba-purple mb-2">{loc.name}</h3>
                                <p className="text-taiba-grey flex items-start gap-2"><MapPin size={18} className="mt-1 shrink-0"/> {loc.address}</p>
                                <p className="text-taiba-grey mt-2"><strong>Hours:</strong> {loc.hours}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
