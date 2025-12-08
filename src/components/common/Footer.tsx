import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const Footer: React.FC = () => {
  const { t, isRTL, toggleLanguage, currentLanguage } = useLanguage();

  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'Medicines', href: '/products?category=medicines' },
        { name: 'Best Sellers', href: '/products' },
        { name: 'New Arrivals', href: '/products' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: t('footer.about'), href: '/about' },
        { name: t('footer.contact'), href: '/contact' },
        { name: 'FAQs', href: '/faq' },
      ]
    },
    {
      title: 'My Account',
      links: [
        { name: 'Profile', href: '/profile' },
        { name: 'My Orders', href: '/profile' },
        { name: 'Rewards Program', href: '/rewards' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Live Chat', href: '/support' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Refund Policy', href: '/refund-policy' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <motion.div
            className="col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="inline-block mb-6">
              <img src="https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png" alt="Taiba Pharmacy" className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
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
              <h4 className="font-bold text-lg mb-4 text-gray-200">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-400 hover:text-taiba-blue transition-colors">
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
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-all mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{currentLanguage.name}</span>
          </motion.button>
          <div className="flex space-x-6">
            {[Facebook, Instagram, Twitter].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-taiba-blue transition-colors"
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
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Taiba Pharmacy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
