import React, { useState } from 'react';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import type { Employee } from '../../types';

interface ActionDropdownProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onView: (employee: Employee) => void;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  employee,
  onEdit,
  onDelete,
  onView,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600 p-1 rounded"
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <>
          <div className="fixed top-0 inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-0 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              <button
                onClick={() => {
                  onView(employee);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Eye size={16} />
                View Details
              </button>
              <button
                onClick={() => {
                  onEdit(employee);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(employee);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
