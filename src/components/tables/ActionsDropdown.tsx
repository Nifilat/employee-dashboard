import React from 'react';
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import type { Employee } from '@/types';

interface ActionsDropdownProps {
  employee: Employee;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  employee,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
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
            onView(employee);
          }}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={e => {
            e.preventDefault();
            onEdit(employee);
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
            onDelete(employee);
          }}
          className="flex items-center gap-2 text-red-600 focus:text-red-700"
        >
          <Trash2 size={16} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
