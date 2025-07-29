import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { EmployeeGrowthChartProps } from './types';

export const EmployeeGrowthChart: React.FC<EmployeeGrowthChartProps> = ({ employees }) => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    employees.forEach(emp => {
      if (emp.hireDate) {
        const year = new Date(emp.hireDate).getFullYear();
        years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [employees]);

  const employeeGrowthData = useMemo(() => {
    const growth: Record<string, number> = {};
    employees.forEach(emp => {
      if (!emp.hireDate) return;
      const date = new Date(emp.hireDate);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'short' });
      if (year === selectedYear) {
        growth[month] = (growth[month] || 0) + 1;
      }
    });

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months.map(month => ({
      month,
      employees: growth[month] || 0,
    }));
  }, [employees, selectedYear]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Employee Growth - {selectedYear}</h2>
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
          className="border px-3 py-1 rounded-md text-sm"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={employeeGrowthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="employees" stroke="#8B5CF6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
