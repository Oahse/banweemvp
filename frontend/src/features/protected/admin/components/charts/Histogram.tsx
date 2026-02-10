import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Heading, Body } from '@/components/ui/Text/Text';

interface HistogramProps {
  data: any[];
  dataKey: string;
  title: string;
  xAxisKey: string;
  color?: string;
  height?: number;
}

export const Histogram: React.FC<HistogramProps> = ({
  data,
  dataKey,
  title,
  xAxisKey,
  color = '#61b482',
  height = 300,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg">
        <Body className="text-gray-500 dark:text-gray-400">No data available</Body>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <Heading level={5} className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</Heading>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis dataKey={xAxisKey} type="category" stroke="#6b7280" width={100} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Bar dataKey={dataKey} fill={color} radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Histogram;
