import type { Row } from '@tanstack/react-table';
import type { Employee } from '@/types';

export const globalEmployeeFilter = (
  row: Row<Employee>,
  _columnId: string,
  value: string
): boolean => {
  const employee = row.original;
  const searchValue = value.toLowerCase();

  const firstName = (employee.firstName || '').toLowerCase();
  const lastName = (employee.lastName || '').toLowerCase();
  const email = (employee.email || '').toLowerCase();
  const fullName = `${firstName} ${lastName}`;

  return (
    firstName.includes(searchValue) ||
    lastName.includes(searchValue) ||
    fullName.includes(searchValue) ||
    email.includes(searchValue)
  );
};
