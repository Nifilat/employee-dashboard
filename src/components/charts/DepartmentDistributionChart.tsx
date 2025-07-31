import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { DepartmentDistributionChartProps } from './types';
import { colors } from './constants';

export const DepartmentDistributionChart: React.FC<DepartmentDistributionChartProps> = ({
  employees,
}) => {
  const data = useMemo(() => {
    const deptCounts: Record<string, number> = {};
    employees.forEach(emp => {
      deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
    });

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
