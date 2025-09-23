import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, ShoppingCart } from 'lucide-react';
import GiftCard from '../components/giftcard/GiftCard';

const GiftCardPage: React.FC = () => {
    const designs = ['blue-purple', 'mustard', 'classic'];
    const amounts = [10, 25, 50, 100];

    const [selectedDesign, setSelectedDesign] = useState(designs[0]);
    const [selectedAmount, setSelectedAmount] = useState(amounts[1]);
    const [customAmount, setCustomAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleAddToCart = () => {
        const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
        console.log('Added to cart:', { design: selectedDesign, amount, message });
        // Add to cart logic here
    };

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-taiba-purple mb-4">Taiba Pharmacy Gift Cards</h1>
                    <p className="text-lg text-taiba-grey">The perfect gift for any occasion.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Gift Card Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <GiftCard design={selectedDesign} amount={customAmount ? parseFloat(customAmount) : selectedAmount} />
                    </motion.div>

                    {/* Customization Options */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-semibold mb-3">1. Choose a design</h3>
                            <div className="flex space-x-3">
                                {designs.map(design => (
                                    <button key={design} onClick={() => setSelectedDesign(design)} className={`w-16 h-10 rounded-lg border-4 ${selectedDesign === design ? 'border-taiba-blue' : 'border-transparent'}`}>
                                        <div className={`w-full h-full rounded ${design === 'blue-purple' ? 'bg-gradient-to-r from-taiba-blue to-taiba-purple' : design === 'mustard' ? 'bg-taiba-mustard' : 'bg-gray-700'}`}></div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">2. Select amount (OMR)</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {amounts.map(amount => (
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
                            <h3 className="font-semibold mb-3">3. Add a message</h3>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="e.g., Happy Birthday!"
                                rows={3}
                                className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-taiba-blue focus:border-transparent"
                            />
                        </div>

                        <motion.button
                            onClick={handleAddToCart}
                            className="w-full bg-taiba-purple text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2"
                            whileHover={{ scale: 1.02, boxShadow: '0px 5px 20px rgba(115, 38, 117, 0.4)' }}
                        >
                            <ShoppingCart />
                            <span>Add to Cart</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCardPage;
