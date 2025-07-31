import type { ColumnDef } from '@tanstack/react-table';
import { formatDate, getAvatarUrl } from '@/utils/formatting';
import { Avatar } from '@/components/common/Avatar';
import { ActionsDropdown } from '@/components/tables/ActionsDropdown';
import { Checkbox } from '@/components/ui';
import type { Employee } from '@/types';
import { sortByFullName } from '@/utils/sorting';

export const getEmployeeColumns = (
  onView: (employee: Employee) => void,
  onEdit: (employee: Employee) => void,
  onDelete: (employee: Employee) => void
): ColumnDef<Employee>[] => [
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
            imageUrl={employee.profilePhoto || getAvatarUrl(employee.firstName, employee.lastName)}
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
    sortingFn: sortByFullName,
    enableSorting: true,
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
];
