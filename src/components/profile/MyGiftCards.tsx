import React from 'react';
import { motion } from 'framer-motion';
import { generateGiftCards } from '../../utils/mockData';
import { Gift } from 'lucide-react';

const MyGiftCards = () => {
    const giftCards = generateGiftCards(3);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Gift Cards</h2>
            <div className="space-y-4">
                {giftCards.map((card, index) => (
                    <motion.div 
                        key={card.id}
                        className="bg-gray-50 p-4 rounded-xl border flex flex-wrap justify-between items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-taiba-mustard/20 rounded-lg flex items-center justify-center">
                                <Gift className="text-taiba-mustard" />
                            </div>
                            <div>
                                <p className="font-mono font-bold text-lg text-taiba-purple">{card.code}</p>
                                <p className="text-sm text-taiba-grey">Purchased on {card.purchaseDate}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-taiba-grey">Balance</p>
                            <p className="font-bold text-xl">OMR {card.currentBalance.toFixed(2)}</p>
                            <p className="text-xs text-taiba-grey">Initial: OMR {card.initialValue.toFixed(2)}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MyGiftCards;
