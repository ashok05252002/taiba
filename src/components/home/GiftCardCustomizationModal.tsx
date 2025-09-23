import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, ShoppingCart } from 'lucide-react';
import GiftCard from '../giftcard/GiftCard';

interface GiftCardCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: { name: string; slug: string; isGiftCard?: boolean } | null;
}

const themedDesigns: Record<string, string[]> = {
    dad: ['blue-purple', 'classic'],
    mom: ['mustard', 'blue-purple'],
    colleague: ['classic', 'mustard'],
    default: ['blue-purple', 'mustard', 'classic'],
};

const GiftCardCustomizationModal: React.FC<GiftCardCustomizationModalProps> = ({ isOpen, onClose, category }) => {
    const [selectedDesign, setSelectedDesign] = useState('blue-purple');
    const [selectedAmount, setSelectedAmount] = useState(25);
    const [customAmount, setCustomAmount] = useState('');
    const [message, setMessage] = useState('');

    const designsToShow = category ? (themedDesigns[category.slug] || themedDesigns.default) : themedDesigns.default;

    useEffect(() => {
        if (category) {
            setSelectedDesign(designsToShow[0]);
        }
    }, [category, designsToShow]);
    
    const handleAddToCart = () => {
        const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
        console.log('Adding Gift Card to cart:', { 
            category: category?.name, 
            design: selectedDesign, 
            amount, 
            message 
        });
        // Here you would call a function from CartContext to add the gift card
        // e.g., addGiftCardToCart({ ... });
        onClose();
    };

    if (!category) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                        >
                            <X size={24} />
                        </motion.button>
                        
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Gift Card for {category.name}</h2>
                            <p className="text-taiba-grey">Customize your gift of health.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <GiftCard design={selectedDesign} amount={customAmount ? parseFloat(customAmount) : selectedAmount} />
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-3">1. Choose a design</h3>
                                    <div className="flex space-x-3">
                                        {designsToShow.map(design => (
                                            <button key={design} onClick={() => setSelectedDesign(design)} className={`w-16 h-10 rounded-lg border-4 ${selectedDesign === design ? 'border-taiba-blue' : 'border-transparent'}`}>
                                                <div className={`w-full h-full rounded ${design === 'blue-purple' ? 'bg-gradient-to-r from-taiba-blue to-taiba-purple' : design === 'mustard' ? 'bg-taiba-mustard' : 'bg-gray-700'}`}></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">2. Select amount (OMR)</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[10, 25, 50, 100].map(amount => (
                                            <button key={amount} onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }} className={`p-3 border-2 rounded-lg font-semibold ${selectedAmount === amount && !customAmount ? 'bg-taiba-blue text-white border-taiba-blue' : 'bg-white'}`}>
                                                {amount}
                                            </button>
                                        ))}
                                        <input 
                                            type="number" 
                                            placeholder="Custom Amount"
                                            value={customAmount}
                                            onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                                            className={`p-3 border-2 rounded-lg col-span-2 ${customAmount ? 'border-taiba-blue' : 'border-gray-300'}`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">3. Add a message (optional)</h3>
                                    <textarea 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={`e.g., Happy Birthday, ${category.name}!`}
                                        rows={2}
                                        className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-taiba-blue focus:border-transparent"
                                    />
                                </div>

                                <motion.button
                                    onClick={handleAddToCart}
                                    className="w-full bg-taiba-purple text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center space-x-2"
                                    whileHover={{ scale: 1.02, boxShadow: '0px 5px 20px rgba(115, 38, 117, 0.4)' }}
                                >
                                    <ShoppingCart />
                                    <span>Add Gift Card to Cart</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GiftCardCustomizationModal;
