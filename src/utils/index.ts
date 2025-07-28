// utils/index.ts
import type { Employee, EmployeeFilters } from '../types';

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

export const filteredEmployees = (employees: Employee[], filters: EmployeeFilters): Employee[] => {
  let filtered = employees;

  const {
    searchQuery,
    statusFilter,
    departmentFilter,
    employmentTypeFilter,
    jobTitleFilter,
    sortBy,
  } = filters;

  // Search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      emp =>
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.jobTitle.toLowerCase().includes(query)
    );
  }

  // Status
  if (statusFilter && statusFilter !== 'All') {
    filtered = filtered.filter(emp => emp.status === statusFilter);
  }

  // Department
  if (departmentFilter) {
    filtered = filtered.filter(emp => emp.department === departmentFilter);
  }

  // Employment type
  if (employmentTypeFilter) {
    filtered = filtered.filter(emp => emp.contractType === employmentTypeFilter);
  }

  // Job Title
  if (jobTitleFilter) {
    filtered = filtered.filter(emp => emp.jobTitle === jobTitleFilter);
  }

  // Sort
  filtered = filtered.sort((a, b) => {
    if (sortBy === 'name') {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === 'date') {
      return new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime();
    }
    return 0;
  });

  return filtered;
};

export const getUniqueDepartments = (employees: Employee[]): string[] =>
  [...new Set(employees.map(emp => emp.department))].sort();

export const getUniqueJobTitles = (employees: Employee[]): string[] =>
  [...new Set(employees.map(emp => emp.jobTitle))].sort();

export const exportToCSV = (data: Employee[]) => {
  const csvContent = [
    [
      'First Name',
      'Last Name',
      'Email',
      'Job Title',
      'Department',
      'Employment Type',
      'Status',
      'Hire Date',
    ],
    ...data.map(emp => [
      emp.firstName,
      emp.lastName,
      emp.email,
      emp.jobTitle,
      emp.department,
      emp.contractType,
      emp.status,
      emp.hireDate,
    ]),
  ]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'employees.csv';
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (data: Employee[]) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'employees.json';
  link.click();
  URL.revokeObjectURL(url);
};
