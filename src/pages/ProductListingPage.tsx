import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const ProductListingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select className="appearance-none bg-white border border-gray-300 rounded-full py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-taiba-blue">
                            <option>Sort by: Popularity</option>
                            <option>Sort by: Price Low to High</option>
                            <option>Sort by: Price High to Low</option>
                            <option>Sort by: Newest</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-full py-2 px-4 text-gray-700 hover:bg-gray-100">
                        <SlidersHorizontal size={18} />
                        <span>Filters</span>
                    </button>
                </div>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm self-start">
                    <h3 className="text-xl font-semibold mb-4">Categories</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-taiba-grey hover:text-taiba-blue">Medicines</a></li>
                        <li><a href="#" className="text-taiba-grey hover:text-taiba-blue">Skin Care</a></li>
                        <li><a href="#" className="text-taiba-grey hover:text-taiba-blue">Vitamins</a></li>
                        <li><a href="#" className="text-taiba-grey hover:text-taiba-blue">Baby Care</a></li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Price Range</h3>
                    <input type="range" min="0" max="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-taiba-blue" />
                    <div className="flex justify-between text-sm text-taiba-grey mt-2">
                        <span>OMR 0</span>
                        <span>OMR 100</span>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="lg:col-span-3">
                    <ProductGrid />
                </main>
            </div>
        </div>
    </div>
  );
};

export default ProductListingPage;
