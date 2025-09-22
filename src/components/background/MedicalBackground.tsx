import React from 'react';
import { motion } from 'framer-motion';
import { Pill, HeartPulse, Stethoscope, Syringe, Plus } from 'lucide-react';

const Capsule: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`w-8 h-4 rounded-full flex items-center overflow-hidden ${className}`}>
        <div className="w-1/2 h-full bg-taiba-blue/50"></div>
        <div className="w-1/2 h-full bg-white/50"></div>
    </div>
);

const themes = {
    default: [
        { icon: Pill, color: 'text-blue-200', size: 24, pos: { top: '10%', left: '20%' } },
        { icon: HeartPulse, color: 'text-red-200', size: 32, pos: { top: '20%', left: '80%' } },
        { icon: Capsule, color: '', size: 0, pos: { top: '50%', left: '10%' } },
        { icon: Stethoscope, color: 'text-gray-300', size: 36, pos: { top: '70%', left: '90%' } },
        { icon: Plus, color: 'text-green-200', size: 30, pos: { top: '90%', left: '30%' } },
    ],
    dynamic: [
        { icon: Pill, color: 'text-blue-400', size: 30, pos: { top: '10%', left: '15%' }, duration: 22 },
        { icon: HeartPulse, color: 'text-red-400', size: 40, pos: { top: '25%', left: '85%' }, duration: 25 },
        { icon: Capsule, color: '', size: 0, pos: { top: '50%', left: '5%' }, duration: 28 },
        { icon: Stethoscope, color: 'text-gray-500', size: 45, pos: { top: '70%', left: '95%' }, duration: 20 },
        { icon: Plus, color: 'text-green-400', size: 35, pos: { top: '90%', left: '25%' }, duration: 30 },
        { icon: Syringe, color: 'text-purple-400', size: 30, pos: { top: '5%', left: '60%' }, duration: 26 },
        { icon: Pill, color: 'text-yellow-400', size: 25, pos: { top: '80%', left: '50%' }, duration: 24 },
    ],
    shop: [
        { icon: Capsule, color: '', size: 0, pos: { top: '15%', left: '10%' } },
        { icon: Pill, color: 'text-purple-200', size: 28, pos: { top: '30%', left: '90%' } },
        { icon: Plus, color: 'text-blue-200', size: 22, pos: { top: '60%', left: '5%' } },
        { icon: Pill, color: 'text-yellow-200', size: 24, pos: { top: '85%', left: '85%' } },
    ],
    about: [
        { icon: Stethoscope, color: 'text-gray-300', size: 40, pos: { top: '20%', left: '15%' } },
        { icon: HeartPulse, color: 'text-red-200', size: 36, pos: { top: '70%', left: '80%' } },
    ],
    checkout: [
        { icon: Syringe, color: 'text-blue-200', size: 30, pos: { top: '25%', left: '25%' } },
        { icon: HeartPulse, color: 'text-red-200', size: 28, pos: { top: '75%', left: '75%' } },
    ],
    confirmation: [
        { icon: Pill, color: 'text-green-200', size: 24, pos: { top: '10%', left: '20%' } },
        { icon: Plus, color: 'text-green-200', size: 32, pos: { top: '20%', left: '80%' } },
        { icon: Capsule, color: '', size: 0, pos: { top: '50%', left: '10%' } },
    ],
};

interface MedicalBackgroundProps {
    theme?: keyof typeof themes;
}

const MedicalBackground: React.FC<MedicalBackgroundProps> = ({ theme = 'default' }) => {
    const icons = themes[theme] || themes.default;

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${item.color} opacity-30`}
                    style={{ ...item.pos }}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{
                        y: ['0%', '5%', '-5%', '0%'],
                        x: ['0%', '-3%', '3%', '0%'],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: item.duration || 20 + index * 5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                >
                    <item.icon size={item.size} />
                </motion.div>
            ))}
        </div>
    );
};

export default MedicalBackground;
