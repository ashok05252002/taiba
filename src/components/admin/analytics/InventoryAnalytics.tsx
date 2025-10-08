import React from 'react';
import SummaryCard from '../SummaryCard';
import { Package, Archive, AlertTriangle, TrendingDown, Download } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const InventoryAnalytics: React.FC = () => {
    const summaryData = [
        { title: 'Total SKUs', value: '2,345', trend: '+50', icon: Package, color: 'text-blue-500' },
        { title: 'Total Items in Stock', value: '45,890', trend: '+1,200', icon: Archive, color: 'text-green-500' },
        { title: 'Low Stock Alerts', value: '32', trend: '+3', icon: AlertTriangle, color: 'text-red-500' },
        { title: 'Out of Stock', value: '12', trend: '-1', icon: TrendingDown, color: 'text-orange-500' },
    ];

    const stockByCategoryOption = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'value', boundaryGap: [0, 0.01] },
        yAxis: {
            type: 'category',
            data: ['Medicines', 'Skin Care', 'Vitamins', 'Baby Care', 'Devices']
        },
        series: [{
            name: 'Stock Level',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744].sort((a,b) => a-b),
            itemStyle: { color: '#108BFA' }
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
            <div className="bg-white p-6 rounded-lg border">
                <h3 className="font-semibold mb-4">Stock Levels by Category</h3>
                <ReactECharts option={stockByCategoryOption} style={{ height: '350px' }} />
            </div>
        </div>
    );
};

export default InventoryAnalytics;
