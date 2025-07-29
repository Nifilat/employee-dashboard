import React, { useState, useMemo } from 'react';
import {
  Plus,
  Filter,
  ArrowUpDown,
  Download,
  Search,
  Users,
  Eye,
  MoreVertical,
  Trash2,
  Edit,
} from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import {
  filteredEmployees as filterEmployeesUtil,
  getUniqueDepartments,
  getUniqueJobTitles,
  getAvatarUrl,
  formatDate,
} from '../utils';
import type { Employee } from '../types';
import { statusTabs } from '../constants';
import { EmployeeModal } from '../components/modals/EmployeeModal';
import { ViewEmployeeModal } from '../components/modals/ViewEmployeeModal';
import { ExportModal } from '../components/modals/ExportModal';
import { Avatar } from '../components/common/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui';
import type { PeoplePageProps } from './types';
import type { EmployeeFilters } from '../types';
import type { SortOption } from '../types';

const EMPLOYEES_PER_PAGE = 5;

export const PeoplePage: React.FC<PeoplePageProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [searchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [sortBy] = useState<SortOption>('date');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const uniqueDepartments = getUniqueDepartments(employees);
  const uniqueJobTitles = getUniqueJobTitles(employees);

  const filters: EmployeeFilters = {
    searchQuery,
    statusFilter,
    departmentFilter,
    employmentTypeFilter,
    jobTitleFilter,
    sortBy,
  };
  const filtered = filterEmployeesUtil(employees, filters);

  // Actions Menu Component
  const ActionsMenu: React.FC<{ employee: Employee }> = ({ employee }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
          <span className="sr-only">Open actions</span>
          <MoreVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onSelect={e => {
            e.preventDefault();
            handleView(employee);
          }}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={e => {
            e.preventDefault();
            handleEdit(employee);
          }}
          className="flex items-center gap-2"
        >
          <Edit size={16} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={e => {
            e.preventDefault();
            handleDelete(employee);
          }}
          className="flex items-center gap-2 text-red-600 focus:text-red-700"
        >
          <Trash2 size={16} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Custom global filter function
  const globalFilterFn = (row: any, _columnId: string, value: string) => {
    const employee = row.original as Employee;
    const searchValue = value.toLowerCase();

    // Search in firstName, lastName, and email
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
                <div className="font-medium text-gray-900">
                  {employee.firstName} {employee.lastName}
                </div>
                <div className="text-sm text-gray-500">{(employee.email || '').toLowerCase()}</div>
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
          <div className="text-sm text-gray-900">{formatDate(row.original.hireDate)}</div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: 'jobTitle',
        header: 'Job Title',
        cell: ({ row }) => <div className="text-sm text-gray-900">{row.original.jobTitle}</div>,
        enableSorting: true,
      },
      {
        accessorKey: 'contractType',
        header: 'Employment Type',
        cell: ({ row }) => <div className="text-sm text-gray-900">{row.original.contractType}</div>,
        enableSorting: true,
        enableGlobalFilter: false,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <ActionsMenu employee={row.original} />,
        enableSorting: false,
        enableGlobalFilter: false,
      },
    ],
    []
  );

  // Initialize TanStack Table
  const table = useReactTable({
    data: filtered,
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
    onGlobalFilterChange: setGlobalFilter,
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

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteDialog(true);
  };

  const handleSaveEmployee = (employeeData: Employee) => {
    if (selectedEmployee) {
      onUpdateEmployee(employeeData);
    } else {
      onAddEmployee(employeeData);
    }
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  };

  const clearFilters = () => {
    setDepartmentFilter('');
    setEmploymentTypeFilter('');
    setJobTitleFilter('');
    setGlobalFilter('');
    setColumnFilters([]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <p className="text-gray-600 text-sm">
            Manage and collaborate within your organization's teams
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </Button>
          <Button
            onClick={() => {
              setSelectedEmployee(null);
              setShowEmployeeModal(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add member
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-8 min-w-max">
          {statusTabs.map(status => (
            <Button
              key={status}
              variant="ghost"
              onClick={() => setStatusFilter(status)}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap rounded-none h-auto ${
                statusFilter === status
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-transparent'
              }`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Sick Leave Banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-1">Sick Leave Policy</h3>
        <p className="text-sm text-gray-600">
          Employees can be enrolled in one sick policy. Make sure that your policy is compliant with
          your state rules.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search employees..."
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department-filter">Department</Label>
                <Select
                  value={departmentFilter || undefined}
                  onValueChange={value => setDepartmentFilter(value || '')}
                >
                  <SelectTrigger id="department-filter">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {uniqueDepartments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment-type-filter">Employment Type</Label>
                <Select
                  value={employmentTypeFilter || undefined}
                  onValueChange={value =>
                    setEmploymentTypeFilter(value === 'all' ? '' : value || '')
                  }
                >
                  <SelectTrigger id="employment-type-filter">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-title-filter">Job Title</Label>
                <Select
                  value={jobTitleFilter || undefined}
                  onValueChange={value => setJobTitleFilter(value === 'all' ? '' : value || '')}
                >
                  <SelectTrigger id="job-title-filter">
                    <SelectValue placeholder="All Titles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Titles</SelectItem>
                    {uniqueJobTitles.map(title => (
                      <SelectItem key={title} value={title}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Employee Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="bg-gray-50">
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                  <TableRow key={row.id} className="hover:bg-gray-50">
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
                    <div className="text-gray-400 mb-2">
                      <Users size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No employees found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-700">
            Showing {table.getState().pagination.pageIndex * EMPLOYEES_PER_PAGE + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * EMPLOYEES_PER_PAGE,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-700">
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

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        employees={table.getFilteredRowModel().rows.map(row => row.original)}
      />

      <ViewEmployeeModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        employee={selectedEmployee}
      />

      <EmployeeModal
        isOpen={showEmployeeModal}
        onClose={() => {
          setShowEmployeeModal(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onSave={handleSaveEmployee}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">
                {selectedEmployee?.firstName} {selectedEmployee?.lastName}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedEmployee) {
                  onDeleteEmployee(selectedEmployee.id);
                }
                setShowDeleteDialog(false);
                setSelectedEmployee(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
