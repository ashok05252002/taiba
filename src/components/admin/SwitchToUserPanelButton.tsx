import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';

const SwitchToUserPanelButton: React.FC = () => {
  return (
    <Link to="/">
      <motion.div
        className="fixed bottom-8 right-8 z-[999] group"
        whileHover="hover"
      >
        <div className="relative">
            <motion.button
              className="w-16 h-16 bg-taiba-purple rounded-full shadow-lg flex items-center justify-center text-white"
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeftRight size={24} />
            </motion.button>
            <motion.span
                className="absolute bottom-1/2 translate-y-1/2 right-full mr-4 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-md whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                variants={{ hover: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.2 }}
            >
                Switch to User Panel
            </motion.span>
        </div>
      </motion.div>
    </Link>
  );
};

export default SwitchToUserPanelButton;
