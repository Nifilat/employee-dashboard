import type { Employee } from '@/types';
export interface EmployeeFiltersProps {
  employees: Employee[];
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (value: string) => void;
  employmentTypeFilter: string;
  setEmploymentTypeFilter: (value: string) => void;
  jobTitleFilter: string;
  setJobTitleFilter: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  onClearFilters: () => void;
}

export interface StatusTabsProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}
