// // hooks/useEmployees.ts
// import { useState, useMemo } from 'react';
// import type { Employee, EmployeeFilters } from '../types';
// import { filterEmployees } from '../utils';

// export const useEmployees = (initialEmployees: Employee[]) => {
//   const [employees] = useState<Employee[]>(initialEmployees);
//   const [filters, setFilters] = useState<EmployeeFilters>({
//     searchQuery: '',
//     statusFilter: 'Active',
//     departmentFilter: '',
//     employmentTypeFilter: '',
//     sortBy: 'name'
//   });

//   const filteredEmployees = useMemo(() => {
//     return filterEmployees(employees, filters);
//   }, [employees, filters]);

//   const updateFilters = (newFilters: Partial<EmployeeFilters>) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//   };

//   return {
//     employees,
//     filteredEmployees,
//     filters,
//     updateFilters
//   };
// };

import { useState } from 'react';
import type { Employee } from '../types';
import { toast } from './use-toast';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const addEmployee = async (employee: Omit<Employee, 'id'>) => {
    setLoading(true);
    try {
      // In real app, this would be an API call
      const newEmployee = {
        ...employee,
        id: Date.now().toString(),
      };

      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add employee',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: string, employee: Partial<Employee>) => {
    setLoading(true);
    try {
      setEmployees(prev => prev.map(emp => (emp.id === id ? { ...emp, ...employee } : emp)));
      return true;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update employee',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    loading,
    addEmployee,
    updateEmployee,
  };
}
