import React from 'react';
import { motion } from 'framer-motion';
import SummaryCard from './SummaryCard';
import { DollarSign, ShoppingCart, Users, Truck, Archive } from 'lucide-react';
import SalesChart from './dashboard/SalesChart';
import DeliveryPerformance from './dashboard/DeliveryPerformance';
import TopProductsList from './dashboard/TopProductsList';
import RecentOrders from './dashboard/RecentOrders';

const Dashboard: React.FC = () => {
  const summaryData = [
    { title: 'Total Revenue', value: 'OMR 12,450', trend: '+12.5%', icon: DollarSign, color: 'text-green-500' },
    { title: 'Total Orders', value: '345', trend: '+8.2%', icon: ShoppingCart, color: 'text-blue-500' },
    { title: 'Active Customers', value: '89', trend: '+21%', icon: Users, color: 'text-purple-500' },
    { title: 'Delivery Status', value: '23 Pending', trend: '-2.1%', icon: Truck, color: 'text-orange-500' },
    { title: 'Inventory Levels', value: '1,200 Low', trend: '+5 Alerts', icon: Archive, color: 'text-red-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      {/* Main Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <SalesChart />
        </div>
        <div className="lg:col-span-1">
            <DeliveryPerformance />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <TopProductsList />
        </div>
        <div className="lg:col-span-1">
            <RecentOrders />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
