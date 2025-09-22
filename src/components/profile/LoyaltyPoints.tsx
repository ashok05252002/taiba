import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gift } from 'lucide-react';

const LoyaltyPoints = () => {
    const redeemOptions = [
        { points: 500, reward: 'OMR 5 Voucher' },
        { points: 1000, reward: 'Free Delivery for a Month' },
        { points: 2500, reward: '15% Off Total Order' },
    ];
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Loyalty & Rewards</h2>
            <div className="bg-gradient-to-r from-taiba-blue to-taiba-purple text-white p-6 rounded-2xl shadow-xl mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-lg">Your Current Balance</p>
                        <p className="text-4xl font-bold">2,450 Points</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg">Your Tier</p>
                        <p className="text-4xl font-bold flex items-center gap-2">
                            <Award className="text-taiba-mustard" />
                            <span>Silver</span>
                        </p>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Redeem Your Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {redeemOptions.map((option, index) => (
                    <motion.div
                        key={index}
                        className="bg-gray-50 p-4 rounded-xl border text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Gift className="mx-auto text-taiba-purple mb-2" />
                        <p className="font-semibold">{option.reward}</p>
                        <p className="text-lg font-bold text-taiba-blue my-1">{option.points} pts</p>
                        <button className="bg-taiba-mustard text-black text-sm font-semibold px-4 py-1 rounded-full mt-2">Redeem</button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LoyaltyPoints;
