import React from 'react';
import StatCard from '../shared/StatCard';
import { Truck, Star, CheckCircle, BarChart } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

type Partner = {
    totalDeliveries: number;
    onTimeRate: number;
    rating: number;
};

interface PartnerPerformanceProps {
    partner: Partner;
}

const PartnerPerformance: React.FC<PartnerPerformanceProps> = ({ partner }) => {
    const summaryData = [
        { title: 'Total Deliveries', value: partner.totalDeliveries.toString(), icon: Truck, color: 'text-blue-500' },
        { title: 'On-Time Rate', value: `${partner.onTimeRate}%`, icon: CheckCircle, color: 'text-green-500' },
        { title: 'Average Rating', value: `${partner.rating} ★`, icon: Star, color: 'text-yellow-500' },
    ];

    const weeklyActivityOption = {
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value' },
        series: [{
            name: 'Deliveries',
            data: [5, 8, 6, 10, 7, 12, 9],
            type: 'bar',
            itemStyle: { color: '#732675' }
        }]
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {summaryData.map(data => (
                    <StatCard key={data.title} {...data} />
                ))}
            </div>
            <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2 flex items-center gap-2"><BarChart size={18}/> Weekly Delivery Activity</h4>
                <ReactECharts option={weeklyActivityOption} style={{ height: '250px' }} />
            </div>
        </div>
    );
};

export default PartnerPerformance;
