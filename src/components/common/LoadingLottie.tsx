import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Pill, HeartPulse } from 'lucide-react';

const Capsule: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`w-8 h-4 rounded-full flex items-center overflow-hidden ${className}`}>
        <div className="w-1/2 h-full bg-taiba-blue"></div>
        <div className="w-1/2 h-full bg-white"></div>
    </div>
);

const LoadingLottie: React.FC = () => {
  const icons = [
    { component: Pill, props: { className: 'text-taiba-blue', size: 30 }, angle: 0 },
    { component: Capsule, props: { className: 'transform rotate-45' }, angle: 90 },
    { component: Pill, props: { className: 'text-taiba-purple', size: 28 }, angle: 180 },
    { component: Capsule, props: { className: 'transform -rotate-45' }, angle: 270 },
  ];

  const radius = 90;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[200]">
        <div className="w-64 h-64 relative flex items-center justify-center">
            {/* Heartbeat Pulse Background */}
            <motion.div
                className="absolute text-red-100"
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <HeartPulse size={radius * 1.8} />
            </motion.div>

            {/* Central stethoscope */}
            <motion.div
                className="absolute"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: 'mirror' }}
            >
                <Stethoscope className="w-20 h-20 text-taiba-grey" />
            </motion.div>

            {/* Orbiting Icons */}
            <div className="w-full h-full">
                {icons.map((item, index) => (
                    <motion.div
                        key={index}
                        className="absolute top-1/2 left-1/2"
                        style={{ x: '-50%', y: '-50%' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    >
                        <div
                            style={{
                                transform: `rotate(${item.angle}deg) translateX(${radius}px) rotate(-${item.angle}deg)`
                            }}
                        >
                           <item.component {...item.props} />
                        </div>
                    </motion.div>
                ))}
            </div>
            <p className="absolute bottom-0 text-taiba-grey font-semibold">Loading your health hub...</p>
        </div>
    </div>
  );
};

export default LoadingLottie;
