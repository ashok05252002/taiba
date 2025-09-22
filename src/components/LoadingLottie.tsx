import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';

interface LoadingLottieProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingLottie: React.FC<LoadingLottieProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  // Since we can't use actual Lottie file, we'll create a CSS animation that mimics the described effect
  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
      {/* Central stethoscope */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Stethoscope className="w-6 h-6 text-taiba-blue" />
      </motion.div>

      {/* Orbiting pills */}
      {[0, 120, 240].map((rotation, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 bg-taiba-purple rounded-full"
          style={{
            transformOrigin: `${sizeClasses[size].includes('12') ? '24px' : sizeClasses[size].includes('16') ? '32px' : '48px'} center`
          }}
          animate={{ 
            rotate: [rotation, rotation + 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}

      {/* Cross formation effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0.8, 1.1, 0.8]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-4 h-4 relative">
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-taiba-blue"></div>
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-taiba-blue"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingLottie;
