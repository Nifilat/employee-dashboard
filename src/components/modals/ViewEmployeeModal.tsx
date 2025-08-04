import React from 'react';
import type { ViewEmployeeModalProps } from './types';
import { getAvatarUrl, formatDate } from '../../utils';
import { Avatar } from '../common/Avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

const ViewEmployeeModal: React.FC<ViewEmployeeModalProps> = ({ isOpen, onClose, employee }) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader className="flex justify-between items-center mb-2">
          <DialogTitle className="text-xl font-semibold text-primary/85">
            Employee Details
          </DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar
              name={`${employee.firstName} ${employee.lastName}`}
              imageUrl={
                employee.profilePhoto || getAvatarUrl(employee.firstName, employee.lastName)
              }
              size="lg"
            />
            <div>
              <h3 className="text-lg font-semibold text-primary/85">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-primary/80">{employee.jobTitle}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-primary/78">Email</label>
              <p className="text-primary/85">{employee.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/78">Department</label>
              <p className="text-primary/85">{employee.department}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/78">Employment Type</label>
              <p className="text-primary/85">{employee.contractType}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/78">Status</label>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  employee.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : employee.status === 'Onboarding'
                      ? 'bg-blue-100 text-blue-800'
                      : employee.status === 'Off-boarding'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                }`}
              >
                {employee.status}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/78">Hire Date</label>
              <p className="text-primary/85">{formatDate(employee.hireDate)}</p>
            </div>

            {employee.salary && (
              <div>
                <label className="block text-sm font-medium text-primary/78">Salary</label>
                <p className="text-primary/85">${employee.salary.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEmployeeModal;
