import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { useEmployeeModal } from '@/hooks/useEmployeeModal';
import { EmployeeForm } from '../forms/EmployeeForm';
import type { EmployeeModalProps } from './types';

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, employee, onSave }) => {
  const { formData, loading, handleSubmit, updateField, handleFileChange } = useEmployeeModal({
    employee,
    onSave,
    onClose,
  });

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center w-full">
            <span>{employee ? 'Edit Employee' : 'Add New Employee'}</span>
            <DialogClose asChild></DialogClose>
          </DialogTitle>
        </DialogHeader>

        <EmployeeForm
          formData={formData}
          loading={loading}
          onSubmit={handleSubmit}
          onFieldChange={updateField}
          onFileChange={handleFileChange}
          onCancel={onClose}
          isEditing={!!employee}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeModal;
