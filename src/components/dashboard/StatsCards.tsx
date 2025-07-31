import React from 'react';
import { Users, Building2 } from 'lucide-react';
import { useEmployeeStats } from '@/hooks/useEmployeeStats';
import { getStatusColor } from '@/utils/statusUtils';
import type { StatsCardsProps } from './types';
import { StatCard } from '../cards/statCard';
import { BreakdownCard } from '@/components/cards/BreakdownCard';
import { InsightsCard } from '../cards/Insightscard';
import { getMainStats, getInsightSections } from './constants';

export const StatsCards: React.FC<StatsCardsProps> = ({ employees = [] }) => {
  const {
    totalEmployees,
    newlyHired,
    onProbation,
    onLeave,
    totalPayroll,
    departmentCounts,
    statusCounts,
    topDepartments,
  } = useEmployeeStats(employees);

  const mainStats = getMainStats(totalEmployees, newlyHired, onProbation, onLeave, totalPayroll);
  const insightSections = getInsightSections(newlyHired, onProbation);

  const departmentItems = topDepartments.map(([department, count]) => ({
    label: department,
    count,
    percentage: (count / totalEmployees) * 100,
  }));

  const statusItems = Object.entries(statusCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([status, count]) => ({
      label: status,
      count,
      percentage: (count / totalEmployees) * 100,
      badgeClassName: getStatusColor(status),
    }));

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Breakdown */}
      {totalEmployees > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BreakdownCard
            title="Department Breakdown"
            icon={<Building2 className="w-5 h-5" />}
            items={departmentItems}
            totalCount={totalEmployees}
            showMoreText={
              Object.keys(departmentCounts).length > 3
                ? `+${Object.keys(departmentCounts).length - 3} more departments`
                : undefined
            }
          />
          <BreakdownCard
            title="Employee Status"
            icon={<Users className="w-5 h-5" />}
            items={statusItems}
            totalCount={totalEmployees}
          />
        </div>
      )}

      {/* Quick Insights */}
      <InsightsCard sections={insightSections} />
    </div>
  );
};
