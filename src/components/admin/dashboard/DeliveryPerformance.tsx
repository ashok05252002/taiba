import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const DeliveryPerformance: React.FC = () => {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 100,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          show: false
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 20
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: function (value: number) {
            return Math.round(value) + '%';
          },
          color: 'auto'
        },
        data: [
          {
            value: 96.5,
            name: 'Success Rate'
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full">
      <h3 className="font-semibold text-gray-800 mb-4">Delivery Performance</h3>
      <ReactECharts option={option} style={{ height: '200px' }} />
      <div className="mt-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-gray-600"><Clock size={16}/> Average Speed</span>
            <span className="font-semibold">45 mins</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-gray-600"><CheckCircle size={16}/> Delivered</span>
            <span className="font-semibold text-green-600">332</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2 text-gray-600"><XCircle size={16}/> Failed</span>
            <span className="font-semibold text-red-600">13</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPerformance;
