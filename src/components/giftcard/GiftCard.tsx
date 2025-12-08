import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';

interface GiftCardProps {
    design: string;
    amount: number;
    customImage?: string | null;
    themedImage?: string;
    themedQuote?: string;
}

const GiftCard: React.FC<GiftCardProps> = ({ design, amount, customImage, themedImage, themedQuote }) => {
    const designClasses: Record<string, string> = {
        'blue-purple': 'from-taiba-blue to-taiba-purple text-white',
        'mustard': 'from-taiba-mustard to-yellow-500 text-black',
        'classic': 'from-gray-800 to-gray-900 text-white',
    };

    const backgroundImage = customImage || themedImage;

    return (
        <motion.div 
            className={`relative w-full aspect-[1.586] rounded-2xl p-6 flex flex-col justify-between shadow-2xl bg-gradient-to-br overflow-hidden ${designClasses[design]}`}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {backgroundImage && (
                <motion.div 
                    className="absolute inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <img src={backgroundImage} alt="Gift Card Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                </motion.div>
            )}
            
            <div className="relative z-10 flex justify-between items-start">
                <img src="https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png" alt="Logo" className="h-10" style={{ filter: design === 'mustard' && !backgroundImage ? 'none' : 'brightness(0) invert(1)' }} />
                <span className="font-bold text-2xl">OMR {amount ? amount.toFixed(2) : '0.00'}</span>
            </div>
            
            {!customImage && themedQuote && (
                 <div className="relative z-10 text-center">
                    <p className="font-semibold text-lg italic">"{themedQuote}"</p>
                </div>
            )}

            {!backgroundImage && <HeartPulse className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" size={120} />}

            <div className="relative z-10 text-right">
                <p className="font-semibold text-lg">GIFT CARD</p>
                <p className="text-xs opacity-80">The perfect gift of health</p>
            </div>
        </motion.div>
    );
};

export default GiftCard;
