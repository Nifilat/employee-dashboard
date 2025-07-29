// columns.ts
import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import type { Employee } from '@/types';
import { formatDate, getAvatarUrl } from '../utils';
import { Avatar } from './common/Avatar';
import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export const employeeColumns = (
  handleView: (employee: Employee) => void,
  handleEdit: (employee: Employee) => void,
  handleDelete: (employee: Employee) => void
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
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const emp = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar
            name={`${emp.firstName} ${emp.lastName}`}
            imageUrl={emp.profilePhoto || getAvatarUrl(emp.firstName, emp.lastName)}
            size="sm"
          />
          <div>
            <div className="font-medium text-gray-900">
              {emp.firstName} {emp.lastName}
            </div>
            <div className="text-sm text-gray-500">{emp.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'hireDate',
    header: 'Hire Date',
    cell: ({ row }) => formatDate(row.original.hireDate),
  },
  {
    accessorKey: 'jobTitle',
    header: 'Job Title',
  },
  {
    accessorKey: 'contractType',
    header: 'Employment Type',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => handleView(employee)}>
              <Eye size={16} className="mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(employee)}>
              <Edit size={16} className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(employee)} className="text-red-600">
              <Trash2 size={16} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
