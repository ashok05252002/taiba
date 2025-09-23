import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CheckCircle } from 'lucide-react';

interface GiftCardRedemptionProps {
    onApplyDiscount: (amount: number) => void;
}

const GiftCardRedemption: React.FC<GiftCardRedemptionProps> = ({ onApplyDiscount }) => {
    const [code, setCode] = useState('');
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState('');

    const handleApply = () => {
        if (code.toUpperCase() === 'TAIBA-GIFT10') {
            onApplyDiscount(10);
            setApplied(true);
            setError('');
        } else {
            setError('Invalid gift card code.');
            setApplied(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Gift size={20} /> Redeem Gift Card
            </h3>
            {!applied ? (
                <div className="space-y-3">
                    <input 
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter gift card code"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-taiba-mustard"
                    />
                    <motion.button
                        onClick={handleApply}
                        className="w-full bg-taiba-mustard text-black py-2 rounded-lg font-semibold"
                        whileHover={{ scale: 1.02 }}
                    >
                        Apply
                    </motion.button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            ) : (
                <div className="text-center py-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="mx-auto text-green-600 mb-2" />
                    <p className="font-semibold text-green-700">OMR 10.00 Applied!</p>
                </div>
            )}
        </div>
    );
};

export default GiftCardRedemption;
