import React from 'react';
import { Search } from 'lucide-react';
import { generateProducts } from '../../utils/mockData';
import HorizontalProductScroller from '../components/HorizontalProductScroller';
import { Link } from 'react-router-dom';

const MobileHomePage: React.FC = () => {
  const bestSellers = generateProducts(6, { isBestSeller: true });
  const newArrivals = generateProducts(6, { isNew: true });
  const recommended = generateProducts(6, { isRecommended: true });

  const categories = [
    { name: 'Medicines', color: 'bg-blue-100', link: '/products?category=medicines' },
    { name: 'Vitamins', color: 'bg-green-100', link: '/products?category=vitamins' },
    { name: 'Skin Care', color: 'bg-pink-100', link: '/products?category=skin-care' },
    { name: 'Baby Care', color: 'bg-yellow-100', link: '/products?category=baby-care' },
  ];

  return (
    <div className="bg-gray-100">
      {/* Search Bar */}
      <div className="p-4 bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-gray-100 rounded-full py-3 pl-10 pr-4 focus:ring-2 focus:ring-taiba-blue"
          />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Banner */}
      <div className="p-4">
        <div className="h-40 bg-gradient-to-r from-taiba-blue to-taiba-purple rounded-2xl p-6 text-white flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Fast Delivery</h1>
            <p className="text-sm">Across all of Oman</p>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 grid grid-cols-4 gap-4">
        {categories.map(cat => (
            <Link to={cat.link} key={cat.name} className={`p-3 rounded-xl text-center ${cat.color}`}>
                <p className="text-xs font-bold text-gray-800">{cat.name}</p>
            </Link>
        ))}
      </div>

      {/* Product Sections */}
      <HorizontalProductScroller title="Best Sellers" products={bestSellers} />
      <HorizontalProductScroller title="New Arrivals" products={newArrivals} />
      <HorizontalProductScroller title="Recommended For You" products={recommended} />
    </div>
  );
};

export default MobileHomePage;
