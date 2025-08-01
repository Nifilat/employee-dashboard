import type { Employee, Department, EmploymentStatus } from '@/types';
export interface EmployeeStats {
  totalEmployees: number;
  newlyHired: Employee[];
  onProbation: Employee[];
  onLeave: Employee[];
  totalPayroll: number;
  departmentCounts: Record<Department, number>;
  statusCounts: Record<EmploymentStatus, number>;
  topDepartments: [string, number][];
}
