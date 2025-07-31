import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ArrowUpDown, Users } from 'lucide-react';
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import type { EmployeeTableProps } from './types';
import { EMPLOYEES_PER_PAGE } from '@/constants/data';
import { globalEmployeeFilter } from '@/utils/filters';
import { getEmployeeColumns } from './employeeColumns';

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
  // Define columns for TanStack Table
  const columns = useMemo(
    () => getEmployeeColumns(onView, onEdit, onDelete),
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
    globalFilterFn: globalEmployeeFilter,
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
