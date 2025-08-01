import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '@/services/api';
import type { Employee } from '@/types';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();

      setEmployees(data);
    } catch (error) {
      console.error('[useEmployees] Failed to fetch employees:', error);
      toast({
        title: 'Error',
        description: 'Failed to load employees',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setHasFetched(true);
      console.log('[useEmployees] Done loading.');
    }
  };

  const handleAddEmployee = async (newEmployee: Employee) => {
    try {
      await addEmployee(newEmployee);
      await loadEmployees();
      toast({
        title: 'Success',
        description: 'Employee added successfully',
      });
    } catch (error) {
      console.error('[useEmployees] Failed to add employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to add employee',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateEmployee = async (updatedEmployee: Employee) => {
    try {
      await updateEmployee(updatedEmployee);
      await loadEmployees();
      toast({
        title: 'Success',
        description: 'Employee updated successfully',
      });
    } catch (error) {
      console.error('[useEmployees] Failed to update employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to update employee',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      await deleteEmployee(employeeId);
      await loadEmployees();
      toast({
        title: 'Success',
        description: 'Employee deleted successfully',
      });
    } catch (error) {
      console.error('[useEmployees] Failed to delete employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete employee',
        variant: 'destructive',
      });
    }
  };

  return {
    employees,
    loading,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    refetch: loadEmployees,
    hasFetched,
  };
};
