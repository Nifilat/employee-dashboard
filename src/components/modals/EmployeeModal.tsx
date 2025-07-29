import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui';
import { useEmployeeModal } from '@/hooks/useEmployeeModal';
import { EmployeeForm } from '../forms/EmployeeForm';
import type { EmployeeModalProps } from './types';

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, employee, onSave }) => {
  const { formData, loading, handleSubmit, updateField, handleFileChange } = useEmployeeModal({
    employee,
    onSave,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-popover rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
        <div className="p-6 pb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {employee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          <EmployeeForm
            formData={formData}
            loading={loading}
            onSubmit={handleSubmit}
            onFieldChange={updateField}
            onFileChange={handleFileChange}
            onCancel={onClose}
            isEditing={!!employee}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
