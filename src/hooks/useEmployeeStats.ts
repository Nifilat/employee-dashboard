import { useMemo } from 'react';
import type { Employee, Department, EmploymentStatus } from '@/types';
import type { EmployeeStats } from './types';

export const useEmployeeStats = (employees: Employee[] = []): EmployeeStats => {
  return useMemo(() => {
    if (!employees || employees.length === 0) {
      return {
        totalEmployees: 0,
        newlyHired: [],
        onProbation: [],
        onLeave: [],
        totalPayroll: 0,
        departmentCounts: {} as Record<Department, number>,
        statusCounts: {} as Record<EmploymentStatus, number>,
        topDepartments: [],
      };
    }

    const totalEmployees = employees.length;

    // Get employees hired in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newlyHired = employees.filter(emp => {
      const hireDate = new Date(emp.hireDate);
      return hireDate >= thirtyDaysAgo;
    });

    // Get employees on probation
    const onProbation = employees.filter(
      emp => emp.status === 'Probation' || emp.probationStatus === 'In Probation'
    );

    // Get employees on leave (off-boarding status)
    const onLeave = employees.filter(emp => emp.status === 'Off-boarding');

    // Calculate total payroll (if salary data exists)
    const totalPayroll = employees.reduce((sum, emp) => {
      return sum + (emp.salary || 0);
    }, 0);

    // Department breakdown
    const departmentCounts = employees.reduce(
      (acc, emp) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      },
      {} as Record<Department, number>
    );

    // Status breakdown
    const statusCounts = employees.reduce(
      (acc, emp) => {
        acc[emp.status] = (acc[emp.status] || 0) + 1;
        return acc;
      },
      {} as Record<EmploymentStatus, number>
    );

    // Get top departments
    const topDepartments = Object.entries(departmentCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return {
      totalEmployees,
      newlyHired,
      onProbation,
      onLeave,
      totalPayroll,
      departmentCounts,
      statusCounts,
      topDepartments,
    };
  }, [employees]);
};
