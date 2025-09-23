import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import MedicalBackground from '../components/background/MedicalBackground';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center relative overflow-hidden bg-white py-16">
        <MedicalBackground theme="default" />
        <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AlertTriangle className="mx-auto h-16 w-16 text-taiba-mustard" />
            <h1 className="mt-4 text-6xl font-extrabold text-taiba-purple tracking-tight sm:text-7xl">404</h1>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">Page Not Found</h2>
            <p className="mt-2 text-base text-taiba-grey">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-6">
                <Link to="/">
                    <motion.button
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-taiba-blue hover:bg-taiba-purple"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Go back home
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    </div>
  );
};

export default NotFoundPage;
