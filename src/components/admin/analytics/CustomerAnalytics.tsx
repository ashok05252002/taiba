import React from 'react';
import SummaryCard from '../SummaryCard';
import { Users, UserPlus, Repeat, UserCheck, Download } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const CustomerAnalytics: React.FC = () => {
    const summaryData = [
        { title: 'Total Customers', value: '1,280', trend: '+15%', icon: Users, color: 'text-blue-500' },
        { title: 'New Customers (30d)', value: '89', trend: '+21%', icon: UserPlus, color: 'text-green-500' },
        { title: 'Returning Customers', value: '65%', trend: '+3%', icon: Repeat, color: 'text-purple-500' },
        { title: 'Active Now', value: '12', trend: '', icon: UserCheck, color: 'text-orange-500' },
    ];

    const newVsReturningOption = {
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [{
            name: 'Customer Type',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 89, name: 'New Customers' },
                { value: 256, name: 'Returning Customers' }
            ],
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
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
                <h3 className="font-semibold mb-4">New vs. Returning Customers (Last 30 days)</h3>
                <ReactECharts option={newVsReturningOption} style={{ height: '350px' }} />
            </div>
        </div>
    );
};

export default CustomerAnalytics;
