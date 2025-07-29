import { Department, ContractType, EmploymentStatus } from '@/types';
import type { EmployeeFormData } from '@/components/modals/types';
import type { Employee } from '@/types';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const createEmptyFormData = (): EmployeeFormData => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: Department.ENGINEERING,
  jobTitle: '',
  contractType: ContractType.PERMANENT,
  status: EmploymentStatus.ACTIVE,
  hireDate: new Date().toISOString().split('T')[0],
  supervisorId: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelationship: '',
  probationEndDate: '',
  profilePhotoFile: null,
  profilePhoto: '',
});

export const employeeToFormData = (employee: Employee): EmployeeFormData => ({
  firstName: employee.firstName,
  lastName: employee.lastName,
  email: employee.email,
  phone: employee.phone,
  department: employee.department,
  jobTitle: employee.jobTitle,
  contractType: employee.contractType,
  status: employee.status,
  hireDate: employee.hireDate,
  supervisorId: employee.supervisorId || '',
  emergencyContactName: employee.emergencyContact.name,
  emergencyContactPhone: employee.emergencyContact.phone,
  emergencyContactRelationship: employee.emergencyContact.relationship,
  probationEndDate: employee.probationEndDate || '',
  profilePhotoFile: null,
  profilePhoto: employee.profilePhoto || '',
});

export const formDataToEmployee = (formData: EmployeeFormData, existingId?: string): Employee => ({
  id: existingId || Date.now().toString(),
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email.toLowerCase(),
  phone: formData.phone,
  department: formData.department,
  jobTitle: formData.jobTitle,
  contractType: formData.contractType,
  status: formData.status,
  hireDate: formData.hireDate,
  supervisorId: formData.supervisorId || undefined,
  emergencyContact: {
    name: formData.emergencyContactName,
    phone: formData.emergencyContactPhone,
    relationship: formData.emergencyContactRelationship,
  },
  probationEndDate: formData.probationEndDate || undefined,
  profilePhoto: formData.profilePhoto || '',
});

export const validateFormData = (formData: EmployeeFormData): string | null => {
  if (!formData.firstName.trim()) return 'First name is required';
  if (!formData.lastName.trim()) return 'Last name is required';
  if (!formData.email.trim()) return 'Email is required';
  if (!formData.phone.trim()) return 'Phone is required';
  if (!formData.jobTitle.trim()) return 'Job title is required';
  if (!formData.emergencyContactName.trim()) return 'Emergency contact name is required';
  if (!formData.emergencyContactPhone.trim()) return 'Emergency contact phone is required';
  if (!formData.emergencyContactRelationship.trim())
    return 'Emergency contact relationship is required';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';

  return null;
};
