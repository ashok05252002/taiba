import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, UploadCloud } from 'lucide-react';
import GiftCard from '../giftcard/GiftCard';
import { giftCardThemes } from '../../utils/mockData';

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
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const theme = category ? (giftCardThemes[category.slug] || giftCardThemes.default) : giftCardThemes.default;
    const designsToShow = category ? (themedDesigns[category.slug] || themedDesigns.default) : themedDesigns.default;

    useEffect(() => {
        if (category) {
            setSelectedDesign(designsToShow[0]);
        }
    }, [category, designsToShow]);
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddToCart = () => {
        const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
        console.log('Adding Gift Card to cart:', { 
            category: category?.name, 
            design: selectedDesign, 
            amount, 
            message,
            customImage: uploadedImage,
        });
        handleClose();
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setUploadedImage(null);
            setCustomAmount('');
            setMessage('');
        }, 300);
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
                    onClick={handleClose}
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
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-20"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                        >
                            <X size={24} />
                        </motion.button>
                        
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Gift Card for {category.name}</h2>
                            <p className="text-taiba-grey">Customize your gift of health.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                            {/* Column 1: Preview */}
                            <div className="flex flex-col items-center">
                                <GiftCard 
                                    design={selectedDesign} 
                                    amount={customAmount ? parseFloat(customAmount) : selectedAmount}
                                    customImage={uploadedImage}
                                    themedImage={theme.image}
                                    themedQuote={theme.quote}
                                />
                                <p className="text-xs text-taiba-grey mt-4 text-center">This is a preview. Your final gift card will be emailed.</p>
                            </div>
                            
                            {/* Column 2: Options */}
                            <div className="space-y-4 md:space-y-5 max-h-[60vh] md:max-h-none overflow-y-auto pr-2">
                                <div>
                                    <h3 className="font-semibold mb-2 text-sm">1. Choose a design</h3>
                                    <div className="flex space-x-2">
                                        {designsToShow.map(design => (
                                            <button key={design} onClick={() => setSelectedDesign(design)} className={`w-12 h-8 rounded-md border-2 ${selectedDesign === design ? 'border-taiba-blue' : 'border-transparent'}`}>
                                                <div className={`w-full h-full rounded-sm ${design === 'blue-purple' ? 'bg-gradient-to-r from-taiba-blue to-taiba-purple' : design === 'mustard' ? 'bg-taiba-mustard' : 'bg-gray-700'}`}></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2 text-sm">2. Select amount (OMR)</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[10, 25, 50, 100].map(amount => (
                                            <button key={amount} onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }} className={`p-2 border rounded-lg font-semibold text-sm ${selectedAmount === amount && !customAmount ? 'bg-taiba-blue text-white border-taiba-blue' : 'bg-white'}`}>
                                                {amount}
                                            </button>
                                        ))}
                                    </div>
                                    <input 
                                        type="number" 
                                        placeholder="Or enter custom amount"
                                        value={customAmount}
                                        onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                                        className={`mt-2 w-full p-2 border rounded-lg text-sm ${customAmount ? 'border-taiba-blue' : 'border-gray-300'}`}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2 text-sm">3. Add a personal photo (optional)</h3>
                                    <label 
                                        htmlFor="gift-card-image-upload" 
                                        className="w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <UploadCloud className="w-6 h-6 text-taiba-grey mb-1" />
                                        <span className="text-xs font-semibold text-taiba-blue">
                                            {uploadedImage ? 'Change Photo' : 'Upload Photo'}
                                        </span>
                                    </label>
                                    <input 
                                        id="gift-card-image-upload" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/png, image/jpeg" 
                                        onChange={handleImageUpload} 
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2 text-sm">4. Add a message (optional)</h3>
                                    <textarea 
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={`e.g., Happy Birthday, ${category.name}!`}
                                        rows={2}
                                        className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-taiba-blue focus:border-transparent"
                                    />
                                </div>

                                <motion.button
                                    onClick={handleAddToCart}
                                    className="w-full bg-taiba-purple text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center space-x-2"
                                    whileHover={{ scale: 1.02, boxShadow: '0px 5px 20px rgba(115, 38, 117, 0.4)' }}
                                >
                                    <ShoppingCart />
                                    <span>Add to Cart</span>
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
