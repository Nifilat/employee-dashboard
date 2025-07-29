import React from 'react';
import { X } from 'lucide-react';
import type { Employee } from '../../types';
import { getAvatarUrl, formatDate } from '../../utils';
import { Avatar } from '../common/Avatar';

interface ViewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const ViewEmployeeModal: React.FC<ViewEmployeeModalProps> = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/10">
      <div className="bg-card rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary/85">Employee Details</h2>
            <button onClick={onClose} className="text-primary/75 hover:text-primary/80">
              <X size={24} />
            </button>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;
