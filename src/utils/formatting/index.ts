import type { Employee } from '@/types';

export const getAvatarUrl = (firstName: string, lastName: string) =>
  `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(`${firstName} ${lastName}`)}`;

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const getUniqueDepartments = (employees: Employee[]): string[] =>
  [...new Set(employees.map(emp => emp.department))].sort();

export const getUniqueJobTitles = (employees: Employee[]): string[] =>
  [...new Set(employees.map(emp => emp.jobTitle))].sort();
