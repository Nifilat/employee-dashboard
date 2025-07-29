import React from 'react';
import { StatsCards } from '../components/dashboard/StatsCards';
import { EmployeeGrowthChart } from '../components/charts/EmployeeGrowthChart';
import { DepartmentDistributionChart } from '../components/charts/DepartmentDistributionChart';
import type { DashboardProps } from './types';

export const Dashboard: React.FC<DashboardProps> = ({ employees }) => {
  return (
    <div className="space-y-6">
      <StatsCards employees={employees} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className=" p-6 rounded-lg border border-ring">
          <EmployeeGrowthChart employees={employees} />
        </div>

        <div className=" p-6 rounded-lg border border-ring">
          <h3 className="text-lg font-semibold text-primary mb-4">Department Distribution</h3>
          <DepartmentDistributionChart employees={employees} />
        </div>
      </div>
    </div>
  );
};
