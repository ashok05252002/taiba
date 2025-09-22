import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Footer: React.FC = () => {
  const { t, isRTL, toggleLanguage, currentLanguage } = useLanguage();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: t('footer.about'), href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'News', href: '/news' },
        { name: t('footer.contact'), href: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Online Pharmacy', href: '/products' },
        { name: 'Health Consultations', href: '/consultations' },
        { name: 'Home Delivery', href: '/delivery' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: t('footer.privacy'), href: '/privacy' },
        { name: t('footer.terms'), href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' }
      ]
    }
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="/assets/images/footer/footer-bg.jpg"
          alt="Taiba Pharmacy Footer Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <motion.div
            className="md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img src="/assets/images/logo-taiba.png" alt="Taiba Pharmacy" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted healthcare partner in Oman, delivering quality and care.
            </p>
          </motion.div>
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-300 hover:text-taiba-blue transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 bg-taiba-blue bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-all mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{currentLanguage.name}</span>
          </motion.button>
          <div className="flex space-x-4">
            {[Facebook, Instagram, Twitter].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-300 hover:text-taiba-blue transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="text-center pt-6 border-t border-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Taiba Pharmacy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
