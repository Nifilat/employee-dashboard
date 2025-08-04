import { useState, useEffect, useCallback } from 'react';
import { toast } from './use-toast';
import {
  createEmptyFormData,
  employeeToFormData,
  formDataToEmployee,
  validateFormData,
  fileToBase64,
} from '@/utils/employee-modal';
import type { EmployeeFormData, UseEmployeeModalProps } from '@/components/modals/types';

export const useEmployeeModal = ({ employee, onSave, onClose }: UseEmployeeModalProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>(createEmptyFormData);
  const [loading, setLoading] = useState(false);

  // Initialize form data when employee changes
  useEffect(() => {
    if (employee) {
      setFormData(employeeToFormData(employee));
    } else {
      setFormData(createEmptyFormData());
    }
  }, [employee]);

  const updateField = useCallback(
    <K extends keyof EmployeeFormData>(field: K, value: EmployeeFormData[K]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleFileChange = useCallback(async (file: File | null) => {
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormData(prev => ({
          ...prev,
          profilePhotoFile: file,
          profilePhoto: base64,
        }));
      } catch (error) {
        console.error('Failed to process image file:', error);
        toast({
          title: 'Error',
          description: 'Failed to process the image file.',
          variant: 'destructive',
        });
      }
    } else {
      setFormData(prev => ({
        ...prev,
        profilePhotoFile: null,
        profilePhoto: '',
      }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate form data
      const validationError = validateFormData(formData);
      if (validationError) {
        toast({
          title: 'Validation Error',
          description: validationError,
          variant: 'destructive',
        });
        return;
      }

      setLoading(true);

      try {
        const employeeData = formDataToEmployee(formData, employee?.id);
        onSave(employeeData);

        toast({
          title: employee ? 'Employee updated' : 'Employee added',
          description: employee
            ? 'Employee information has been updated successfully.'
            : 'New employee has been added successfully.',
        });

        onClose();
      } catch (error) {
        console.error('Failed to save employee:', error);
        toast({
          title: 'Error',
          description: 'There was an error saving the employee information.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, employee, onSave, onClose]
  );

  return {
    formData,
    loading,
    updateField,
    handleFileChange,
    handleSubmit,
  };
};
