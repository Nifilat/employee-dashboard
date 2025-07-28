import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { DepartmentDistributionChartProps } from './types';

export const DepartmentDistributionChart: React.FC<DepartmentDistributionChartProps> = ({
  employees,
}) => {
  const data = useMemo(() => {
    const deptCounts: Record<string, number> = {};
    employees.forEach(emp => {
      deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
    });

    const colors = [
      '#8B5CF6',
      '#06B6D4',
      '#10B981',
      '#F59E0B',
      '#EF4444',
      '#6366F1',
      '#F472B6',
      '#FACC15',
      '#34D399',
      '#60A5FA',
      '#A78BFA',
    ];

    return Object.entries(deptCounts).map(([name, value], i) => ({
      name,
      value,
      color: colors[i % colors.length],
    }));
  }, [employees]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed()}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
