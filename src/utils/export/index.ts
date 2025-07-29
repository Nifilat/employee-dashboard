import type { Employee } from '@/types';

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
