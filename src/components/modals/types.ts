import type { Department, ContractType, EmploymentStatus, Employee } from '../../types';

export interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onSave: (employee: Employee) => void;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: Department;
  jobTitle: string;
  contractType: ContractType;
  status: EmploymentStatus;
  hireDate: string;
  supervisorId: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  probationEndDate: string;
  profilePhotoFile?: File | null;
  profilePhoto?: string;
}

export interface EmployeeFormProps {
  formData: EmployeeFormData;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFieldChange: <K extends keyof EmployeeFormData>(field: K, value: EmployeeFormData[K]) => void;
  onFileChange: (file: File | null) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface SupervisorOption {
  id: string;
  displayName: string;
  email?: string;
}

export interface UseEmployeeModalProps {
  employee: Employee | null;
  onSave: (employee: Employee) => void;
  onClose: () => void;
}

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
}

export interface ViewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export interface DeleteEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onConfirmDelete: (employeeId: string) => void;
  loading?: boolean;
}
