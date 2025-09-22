import React from 'react';
import { motion } from 'framer-motion';
import { Pill, HeartPulse, Shield, Activity, Dna } from 'lucide-react';

const BackgroundPattern: React.FC = () => {
    const icons = [
        { icon: Pill, size: 24, pos: { top: '10%', left: '20%' }, color: 'text-blue-200' },
        { icon: HeartPulse, size: 32, pos: { top: '20%', left: '80%' }, color: 'text-red-200' },
        { icon: Shield, size: 28, pos: { top: '50%', left: '10%' }, color: 'text-green-200' },
        { icon: Activity, size: 36, pos: { top: '70%', left: '90%' }, color: 'text-purple-200' },
        { icon: Dna, size: 30, pos: { top: '90%', left: '30%' }, color: 'text-yellow-200' },
        { icon: Pill, size: 20, pos: { top: '35%', left: '40%' }, color: 'text-indigo-200' },
        { icon: Shield, size: 22, pos: { top: '80%', left: '60%' }, color: 'text-pink-200' },
    ];

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${item.color} opacity-50`}
                    style={{ ...item.pos }}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'linear',
                        delay: index * 2
                    }}
                >
                    <motion.div
                        animate={{
                            y: ['0%', '10%', '-10%', '0%'],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 1.5
                        }}
                    >
                        <item.icon size={item.size} />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default BackgroundPattern;
