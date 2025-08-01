import type { Row } from '@tanstack/react-table';
import type { Employee } from '@/types';

export const sortByFullName = (rowA: Row<Employee>, rowB: Row<Employee>) => {
  const nameA = `${rowA.original.firstName} ${rowA.original.lastName}`;
  const nameB = `${rowB.original.firstName} ${rowB.original.lastName}`;
  return nameA.localeCompare(nameB);
};
