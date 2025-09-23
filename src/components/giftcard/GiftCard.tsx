import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';

interface GiftCardProps {
    design: string;
    amount: number;
}

const GiftCard: React.FC<GiftCardProps> = ({ design, amount }) => {
    const designClasses = {
        'blue-purple': 'from-taiba-blue to-taiba-purple text-white',
        'mustard': 'from-taiba-mustard to-yellow-500 text-black',
        'classic': 'from-gray-800 to-gray-900 text-white',
    };

    return (
        <motion.div 
            className={`relative w-full aspect-[1.586] rounded-2xl p-6 flex flex-col justify-between shadow-2xl bg-gradient-to-br ${designClasses[design]}`}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="flex justify-between items-start">
                <img src="https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png" alt="Logo" className="h-10 invert-0 brightness-0" style={{ filter: design === 'mustard' ? 'none' : 'brightness(0) invert(1)' }} />
                <span className="font-bold text-2xl">OMR {amount.toFixed(2)}</span>
            </div>
            
            <HeartPulse className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" size={120} />

            <div className="text-right">
                <p className="font-semibold text-lg">GIFT CARD</p>
                <p className="text-xs opacity-80">The perfect gift of health</p>
            </div>
        </motion.div>
    );
};

export default GiftCard;
