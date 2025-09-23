import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
    "Medicine", "Skin Care", "Hair Care", "Vitamins", "Fitness", 
    "Mom & Baby", "Beauty", "Health Devices", "Perfumes", "Gift Cards"
];

const SubHeader: React.FC = () => {
    return (
        <nav className="bg-taiba-purple shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center overflow-x-auto scrollbar-hide py-3">
                    <ul className="flex items-center space-x-6 whitespace-nowrap">
                        {categories.map((category, index) => {
                            const linkPath = category === 'Gift Cards' 
                                ? '/gift-cards' 
                                : `/products?category=${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
                            return (
                                <motion.li key={index}>
                                    <Link 
                                        to={linkPath}
                                        className="text-white font-medium text-sm hover:text-taiba-pistachio transition-colors duration-200"
                                    >
                                        {category}
                                    </Link>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default SubHeader;
