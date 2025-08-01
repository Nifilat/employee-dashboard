import type { Employee } from '@/types';
import {
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
  type OnChangeFn,
} from '@tanstack/react-table';

export interface EmployeeTableProps {
  employees: Employee[];
  globalFilter: string;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  rowSelection: RowSelectionState;
  setRowSelection: OnChangeFn<RowSelectionState>;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}
