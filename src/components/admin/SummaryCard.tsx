import React from 'react';
import { motion } from 'framer-motion';

interface SummaryCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ElementType;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, trend, icon: Icon, color }) => {
  const isPositive = trend.startsWith('+');
  return (
    <motion.div
      className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
          <Icon size={20} className={color} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm font-semibold mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend} vs last month
        </p>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
