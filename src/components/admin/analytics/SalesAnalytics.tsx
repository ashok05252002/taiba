import React from 'react';
import SummaryCard from '../SummaryCard';
import SalesChart from '../dashboard/SalesChart';
import { DollarSign, ShoppingCart, BarChart, TrendingUp, Download } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const SalesAnalytics: React.FC = () => {
    const summaryData = [
        { title: 'Total Revenue', value: 'OMR 12,450', trend: '+12.5%', icon: DollarSign, color: 'text-green-500' },
        { title: 'Total Orders', value: '345', trend: '+8.2%', icon: ShoppingCart, color: 'text-blue-500' },
        { title: 'Avg. Order Value', value: 'OMR 36.08', trend: '+4.1%', icon: BarChart, color: 'text-purple-500' },
        { title: 'Conversion Rate', value: '3.4%', trend: '+0.5%', icon: TrendingUp, color: 'text-orange-500' },
    ];

    const categorySalesOption = {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [{
            name: 'Sales by Category',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
            label: { show: false, position: 'center' },
            emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } },
            data: [
                { value: 1048, name: 'Medicines' },
                { value: 735, name: 'Skin Care' },
                { value: 580, name: 'Vitamins' },
                { value: 484, name: 'Baby Care' },
                { value: 300, name: 'Devices' }
            ]
        }]
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-semibold">
                    <Download size={16} /> Export Report
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryData.map((data, index) => (
                    <SummaryCard key={index} {...data} />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2"><SalesChart /></div>
                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="font-semibold mb-4">Sales by Category</h3>
                    <ReactECharts option={categorySalesOption} style={{ height: '350px' }} />
                </div>
            </div>
        </div>
    );
};

export default SalesAnalytics;
