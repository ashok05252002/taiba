import React from 'react';
import { BarChart, Edit, Trash2 } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

type LogEntry = {
    action: string;
};

interface SubAdminSummaryStatsProps {
    activityLog: LogEntry[];
}

const SubAdminSummaryStats: React.FC<SubAdminSummaryStatsProps> = ({ activityLog }) => {
    const totalChanges = activityLog.length;
    const updates = activityLog.filter(log => log.action.includes('Updated')).length;
    const deletions = activityLog.filter(log => log.action.includes('Deleted')).length;

    const activityChartOption = {
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value' },
        series: [{
            data: [12, 20, 15, 8, 7, 11, 13],
            type: 'bar',
            itemStyle: { color: '#732675' }
        }]
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg border shadow-sm text-center">
                <BarChart className="mx-auto text-taiba-blue" size={28}/>
                <p className="text-3xl font-bold mt-2">{totalChanges}</p>
                <p className="text-sm text-gray-500">Total Actions (30d)</p>
            </div>
            <div className="p-4 bg-white rounded-lg border shadow-sm text-center">
                <Edit className="mx-auto text-taiba-blue" size={28}/>
                <p className="text-3xl font-bold mt-2">{updates}</p>
                <p className="text-sm text-gray-500">Updates Made</p>
            </div>
            <div className="p-4 bg-white rounded-lg border shadow-sm text-center">
                <Trash2 className="mx-auto text-taiba-blue" size={28}/>
                <p className="text-3xl font-bold mt-2">{deletions}</p>
                <p className="text-sm text-gray-500">Deletions Made</p>
            </div>
            <div className="md:col-span-3 bg-white p-4 rounded-lg border shadow-sm">
                 <h4 className="font-semibold text-sm mb-2">Activity This Week</h4>
                 <ReactECharts option={activityChartOption} style={{ height: '150px' }} />
            </div>
        </div>
    );
};

export default SubAdminSummaryStats;
