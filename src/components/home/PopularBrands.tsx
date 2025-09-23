import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const brands = [
  { name: 'J&J', logo: 'https://page-online.de/app/uploads/2023/09/JohnsonJohnson_Logo.png', slug: 'johnson-johnson' },
  { name: 'Dettol', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Dettol-Logo-2019-present.jpg', slug: 'dettol' },
  { name: 'Vicks', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/VicksLogo.png/500px-VicksLogo.png', slug: 'vicks' },
  { name: 'Panadol', logo: 'https://i.scdn.co/image/ab6761610000e5eb507a8eb52e6ae42c204b46d8', slug: 'panadol' },
  { name: 'Nivea', logo: 'https://images.seeklogo.com/logo-png/24/1/nivea-logo-png_seeklogo-241923.png', slug: 'nivea' },
  { name: 'Pampers', logo: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/6d01bf9840733.560db0b5e841c.jpg', slug: 'pampers' },
  { name: 'Gillette', logo: 'https://i.pinimg.com/1200x/98/ea/63/98ea631d494346c274ee45cab4096ea7.jpg', slug: 'gillette' },
  { name: 'Oral-B', logo: 'https://cdn.worldvectorlogo.com/logos/oral-b.svg', slug: 'oral-b' },
  { name: 'Cetaphil', logo: 'https://images.seeklogo.com/logo-png/48/1/cetaphil-logo-png_seeklogo-483868.png', slug: 'cetaphil' },
  { name: 'Bioderma', logo: 'https://exclusivebeautyclub.com/cdn/shop/collections/bioderma-593395.jpg?v=1748016322', slug: 'bioderma' },
  { name: 'Himalaya', logo: 'https://zerocreativity0.wordpress.com/wp-content/uploads/2017/01/himalaya-logo.jpg', slug: 'himalaya' },
  { name: 'Strepsils', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Strepsils_logo.svg/1200px-Strepsils_logo.svg.png', slug: 'strepsils' }
];

const PopularBrands: React.FC = () => {
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Shop by Popular Brands
        </h2>
        <div className="relative overflow-hidden group">
          <motion.div
            className="flex space-x-8"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              ease: 'linear',
              duration: 30,
              repeat: Infinity,
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <Link to={`/products?brand=${brand.slug}`} key={index}>
                <div
                  className="flex-shrink-0 w-48 h-28 bg-white rounded-2xl shadow-md flex items-center justify-center border border-gray-100 group-hover:[animation-play-state:paused] p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <img src={brand.logo} alt={`${brand.name} logo`} className="max-h-full max-w-full object-contain" />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
