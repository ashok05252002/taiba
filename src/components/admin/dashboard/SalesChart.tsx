import React from 'react';
import ReactECharts from 'echarts-for-react';
import { faker } from '@faker-js/faker';

const SalesChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: 'OMR {value}'
      }
    },
    series: [
      {
        name: 'Sales',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: Array.from({ length: 7 }, () => faker.number.int({ min: 1000, max: 5000 })),
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'rgba(16, 139, 250, 0.5)' // taiba-blue
            }, {
                offset: 1, color: 'rgba(16, 139, 250, 0.1)'
            }]
          }
        },
        itemStyle: {
          color: '#108BFA'
        },
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
      <h3 className="font-semibold text-gray-800 mb-4">Sales Trends</h3>
      <ReactECharts option={option} style={{ height: '350px' }} />
    </div>
  );
};

export default SalesChart;
