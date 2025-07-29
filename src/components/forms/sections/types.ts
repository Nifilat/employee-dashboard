import type { EmployeeFormData } from '@/components/modals/types';
import { Department } from '@/types';
export interface BasicInformationSectionProps {
  formData: EmployeeFormData;
  onFieldChange: <K extends keyof EmployeeFormData>(field: K, value: EmployeeFormData[K]) => void;
  onFileChange: (file: File | null) => void;
}

export interface EmploymentInformationSectionProps {
  formData: EmployeeFormData;
  onFieldChange: <K extends keyof EmployeeFormData>(field: K, value: EmployeeFormData[K]) => void;
}

export interface SupervisorSelectProps {
  department: Department;
  value: string;
  onChange: (value: string) => void;
}

export interface EmergencyContactSectionProps {
  formData: EmployeeFormData;
  onFieldChange: <K extends keyof EmployeeFormData>(field: K, value: EmployeeFormData[K]) => void;
}
