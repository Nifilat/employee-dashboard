import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type Row,
} from '@tanstack/react-table';
import { ArrowUpDown, Users } from 'lucide-react';
import {
  Checkbox,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import { Avatar } from '@/components/common/Avatar';
import { ActionsDropdown } from './ActionsDropdown';
import { getAvatarUrl, formatDate } from '@/utils/formatting';
import type { Employee } from '@/types';
import type { EmployeeTableProps } from './types';
import { EMPLOYEES_PER_PAGE } from '@/constants/data';

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  globalFilter,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  rowSelection,
  setRowSelection,
  onView,
  onEdit,
  onDelete,
}) => {
  // Custom global filter function
  const globalFilterFn = (row: Row<Employee>, _columnId: string, value: string) => {
    const employee = row.original as Employee;
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

  // Define columns for TanStack Table
  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
          const employee = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar
                name={`${employee.firstName} ${employee.lastName}`}
                imageUrl={
                  employee.profilePhoto || getAvatarUrl(employee.firstName, employee.lastName)
                }
                size="sm"
              />
              <div>
                <div className="font-medium text-primary">
                  {employee.firstName} {employee.lastName}
                </div>
                <div className="text-sm text-primary">{(employee.email || '').toLowerCase()}</div>
              </div>
            </div>
          );
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          const nameA = `${rowA.original.firstName} ${rowA.original.lastName}`;
          const nameB = `${rowB.original.firstName} ${rowB.original.lastName}`;
          return nameA.localeCompare(nameB);
        },
        enableGlobalFilter: true,
        accessorFn: row => `${row.firstName} ${row.lastName} ${row.email}`,
      },
      {
        accessorKey: 'hireDate',
        header: 'Hire Date',
        cell: ({ row }) => (
          <div className="text-sm text-primary">{formatDate(row.original.hireDate)}</div>
        ),
        enableSorting: true,
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'jobTitle',
        header: 'Job Title',
        cell: ({ row }) => <div className="text-sm text-primary">{row.original.jobTitle}</div>,
        enableSorting: true,
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'contractType',
        header: 'Employment Type',
        cell: ({ row }) => <div className="text-sm text-primary">{row.original.contractType}</div>,
        enableSorting: true,
        enableGlobalFilter: false,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <ActionsDropdown
            employee={row.original}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
        enableSorting: false,
        enableGlobalFilter: false,
      },
    ],
    [onView, onEdit, onDelete]
  );

  // Initialize TanStack Table
  const table = useReactTable({
    data: employees,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: globalFilterFn,
    initialState: {
      pagination: {
        pageSize: EMPLOYEES_PER_PAGE,
      },
    },
  });

  return (
    <div className="space-y-4 w-full overflow-auto">
      {/* Employee Table */}
      <div className=" border border-ring rounded-lg overflow-hidden min-w-[500px]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center gap-2'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && (
                            <ArrowUpDown size={14} className="opacity-50" />
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} className="hover:bg-muted">
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="px-6 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-12">
                    <div className="text-primary/80 mb-2">
                      <Users size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-1">No employees found</h3>
                    <p className="text-primary/85">Try adjusting your search or filter criteria.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex md:items-center justify-between flex-col md:flex-row gap-2 items-stretch">
        <div className="flex items-center gap-2">
          <p className="text-sm text-primary/75">
            Showing {table.getState().pagination.pageIndex * EMPLOYEES_PER_PAGE + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * EMPLOYEES_PER_PAGE,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} results
          </p>
        </div>
        <div className="flex items-center gap-2 justify-between md:justify-start">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm text-primary/80">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Selection Info */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            {Object.keys(rowSelection).length} employee(s) selected
          </p>
        </div>
      )}
    </div>
  );
};
