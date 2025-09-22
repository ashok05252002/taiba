import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
    "Medicine", "Skin Care", "Hair Care", "Vitamins", "Fitness", 
    "Mom & Baby", "Women", "Men", "Oral Care", "Beauty", 
    "Health Devices", "Optics", "Perfumes", "Skin Analysis"
];

const SubHeader: React.FC = () => {
    return (
        <nav className="bg-taiba-purple shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center overflow-x-auto scrollbar-hide py-3">
                    <ul className="flex items-center space-x-6 whitespace-nowrap">
                        {categories.map((category, index) => (
                            <motion.li key={index}>
                                <Link 
                                    to={`/products?category=${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                    className="text-white font-medium text-sm hover:text-taiba-pistachio transition-colors duration-200"
                                >
                                    {category}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SubHeader;
