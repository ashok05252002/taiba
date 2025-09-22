import React from 'react';
import { motion } from 'framer-motion';
import { Pill, HeartPulse, Shield, Activity, Dna } from 'lucide-react';

const AnimatedBackground: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
    const iconColor = theme === 'light' ? 'text-blue-100' : 'text-gray-700';

    const icons = [
        { icon: Pill, size: 24, pos: { top: '10%', left: '20%' }, color: iconColor },
        { icon: HeartPulse, size: 32, pos: { top: '20%', left: '80%' }, color: 'text-red-300/50' },
        { icon: Shield, size: 28, pos: { top: '50%', left: '10%' }, color: 'text-green-300/50' },
        { icon: Activity, size: 36, pos: { top: '70%', left: '90%' }, color: 'text-purple-300/50' },
        { icon: Dna, size: 30, pos: { top: '90%', left: '30%' }, color: 'text-yellow-300/50' },
        { icon: Pill, size: 20, pos: { top: '35%', left: '40%' }, color: iconColor },
        { icon: Shield, size: 22, pos: { top: '80%', left: '60%' }, color: 'text-pink-300/50' },
    ];

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${item.color} opacity-50`}
                    style={{ ...item.pos }}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{
                        y: ['0%', '5%', '-5%', '0%'],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20 + index * 5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                >
                    <item.icon size={item.size} />
                </motion.div>
            ))}
            <motion.svg
                className="absolute w-full h-full opacity-20"
                width="100%" height="100%"
            >
                <defs>
                    <pattern id="wave" patternUnits="userSpaceOnUse" width="100" height="50" patternTransform="rotate(15)">
                        <path d="M 0 25 C 25 0, 75 50, 100 25" stroke={theme === 'light' ? '#E0F2FE' : '#374151'} strokeWidth="1" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wave)" />
            </motion.svg>
        </div>
    );
};

export default AnimatedBackground;
