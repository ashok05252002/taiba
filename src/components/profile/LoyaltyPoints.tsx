import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, Star } from 'lucide-react';

const LoyaltyPoints = () => {
    const pointsHistory = [
        { date: '2025-07-15', description: 'Order #TP12345', points: '+150' },
        { date: '2025-07-10', description: 'Birthday Bonus', points: '+500' },
        { date: '2025-07-05', description: 'Redeemed Voucher', points: '-1000' },
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
                <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Silver</span>
                        <span>Gold</span>
                    </div>
                    <div className="bg-white/30 rounded-full h-2.5">
                        <motion.div 
                            className="bg-taiba-mustard h-2.5 rounded-full" 
                            style={{ width: '65%' }}
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                    <p className="text-xs text-center mt-1">550 points to Gold Tier</p>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Points History</h3>
            <div className="space-y-3">
                {pointsHistory.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div>
                            <p className="font-medium">{item.description}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                        <p className={`font-bold ${item.points.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{item.points}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoyaltyPoints;
