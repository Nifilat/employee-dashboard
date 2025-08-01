import type { Employee } from '@/types';
import { Users, UserCheck, AlertCircle, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '@/utils/statusUtils';

export const getMainStats = (
  totalEmployees: number,
  newlyHired: Employee[],
  onProbation: Employee[],
  onLeave: Employee[],
  totalPayroll: number
) => [
  {
    label: 'Total Employees',
    value: totalEmployees,
    description: totalEmployees > 0 ? 'Active workforce' : 'No employees yet',
    icon: <Users className="w-6 h-6" />,
    iconBgColor: totalEmployees > 0 ? 'bg-blue-100' : 'bg-gray-100',
    iconColor: totalEmployees > 0 ? 'text-blue-600' : 'text-gray-400',
  },
  {
    label: 'Newly Hired',
    value: newlyHired.length,
    description: 'Last 30 days',
    icon: <UserCheck className="w-6 h-6" />,
    iconBgColor: newlyHired.length > 0 ? 'bg-green-100' : 'bg-gray-100',
    iconColor: newlyHired.length > 0 ? 'text-green-600' : 'text-gray-400',
  },
  {
    label: 'On Probation',
    value: onProbation.length,
    description: onProbation.length > 0 ? 'Requires attention' : 'No employees',
    icon: <AlertCircle className="w-6 h-6" />,
    iconBgColor: onProbation.length > 0 ? 'bg-orange-100' : 'bg-gray-100',
    iconColor: onProbation.length > 0 ? 'text-orange-600' : 'text-gray-400',
  },
  {
    label: totalPayroll > 0 ? 'Total Payroll' : 'On Leave',
    value: totalPayroll > 0 ? formatCurrency(totalPayroll) : onLeave.length,
    description:
      totalPayroll > 0 ? 'Monthly estimate' : onLeave.length > 0 ? 'Off-boarding' : 'No employees',
    icon: totalPayroll > 0 ? <DollarSign className="w-6 h-6" /> : <Calendar className="w-6 h-6" />,
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];

export const getInsightSections = (newlyHired: Employee[], onProbation: Employee[]) => {
  const sections = [];

  if (newlyHired.length > 0) {
    sections.push({
      title: 'Recently Hired',
      employees: newlyHired,
      bgColor: 'bg-green-50 dark:bg-green-50/10',
      borderColor: 'border-green-200',
      textColor: 'text-green-900 dark:text-green-200',
      lightTextColor: 'text-green-700 dark:text-green-200/70',
    });
  }

  if (onProbation.length > 0) {
    sections.push({
      title: 'On Probation',
      employees: onProbation,
      bgColor: 'bg-orange-50 dark:bg-orange-50/10',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-900 dark:text-orange-200',
      lightTextColor: 'text-orange-700 dark:text-orange-200/70',
    });
  }

  return sections;
};
