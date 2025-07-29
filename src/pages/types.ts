import type { Employee } from '@/types';
export interface DashboardProps {
  employees: Employee[];
}

export interface PeoplePageProps {
  employees: Employee[];
  onAddEmployee: (employee: Employee) => void;
  onUpdateEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employeeId: string) => void;
}
