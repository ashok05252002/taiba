import React from 'react';
import { motion } from 'framer-motion';

const LoadingLottie: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[200]">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <img
            src="https://i0.wp.com/taibahealthcare.com/wp-content/uploads/2023/04/001.jpg?fit=800%2C800&ssl=1"
            alt="Loading..."
            className="w-32 h-32 rounded-full shadow-lg"
          />
        </motion.div>
        <p className="mt-6 text-taiba-grey font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingLottie;
