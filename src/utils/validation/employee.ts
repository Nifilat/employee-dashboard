import type { EmployeeFormData } from '@/components/modals/types';

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

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};