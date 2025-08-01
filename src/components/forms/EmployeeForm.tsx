// components/EmployeeForm.tsx
import React from 'react';
import { Button } from '@/components/ui';
import { FormSection } from './sections/FormSection';
import { BasicInformationSection } from './sections/BasicInformationSection';
import { EmploymentInformationSection } from './sections/EmploymentInformationSection';
import { EmergencyContactSection } from './sections/EmergencyContactSection';
import type { EmployeeFormProps } from '../modals/types';

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  formData,
  loading,
  onSubmit,
  onFieldChange,
  onFileChange,
  onCancel,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <FormSection title="Basic Information">
        <BasicInformationSection
          formData={formData}
          onFieldChange={onFieldChange}
          onFileChange={onFileChange}
        />
      </FormSection>

      <FormSection title="Employment Information">
        <EmploymentInformationSection formData={formData} onFieldChange={onFieldChange} />
      </FormSection>

      <FormSection title="Emergency Contact">
        <EmergencyContactSection formData={formData} onFieldChange={onFieldChange} />
      </FormSection>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          disabled={loading}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
};
