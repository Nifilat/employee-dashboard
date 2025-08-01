import type { EmployeeFormData } from '@/components/modals/types';

/**
 * Validates phone number format
 * Accepts formats like: +1234567890, (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
 */
const validatePhoneNumber = (phone: string): boolean => {
  // Remove all non-digit characters to check length
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Phone should have 10-15 digits (international format consideration)
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return false;
  }
  
  // Common phone number patterns
  const phonePatterns = [
    /^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/, // US format
    /^\+?[1-9]\d{1,14}$/, // International format (E.164)
    /^[0-9]{10,15}$/, // Simple digit format
  ];
  
  return phonePatterns.some(pattern => pattern.test(phone));
};

/**
 * Validates that the date is not in the future
 */
const validateHireDate = (dateString: string): boolean => {
  if (!dateString) return false;
  
  const hireDate = new Date(dateString);
  const today = new Date();
  
  // Set today to end of day to allow today's date
  today.setHours(23, 59, 59, 999);
  
  return hireDate <= today;
};

/**
 * Validates email format
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates that a string contains only letters, spaces, hyphens, and apostrophes
 */
const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
};

export const validateFormData = (formData: EmployeeFormData): string | null => {
  // Required field checks
  if (!formData.firstName.trim()) return 'First name is required';
  if (!formData.lastName.trim()) return 'Last name is required';
  if (!formData.email.trim()) return 'Email is required';
  if (!formData.phone.trim()) return 'Phone number is required';
  if (!formData.jobTitle.trim()) return 'Job title is required';
  if (!formData.hireDate.trim()) return 'Hire date is required';
  if (!formData.emergencyContactName.trim()) return 'Emergency contact name is required';
  if (!formData.emergencyContactPhone.trim()) return 'Emergency contact phone is required';
  if (!formData.emergencyContactRelationship.trim()) return 'Emergency contact relationship is required';

  // Name validation
  if (!validateName(formData.firstName)) {
    return 'First name must contain only letters, spaces, hyphens, and apostrophes, and be at least 2 characters long';
  }
  if (!validateName(formData.lastName)) {
    return 'Last name must contain only letters, spaces, hyphens, and apostrophes, and be at least 2 characters long';
  }

  // Email validation
  if (!validateEmail(formData.email)) {
    return 'Please enter a valid email address';
  }

  // Phone validation
  if (!validatePhoneNumber(formData.phone)) {
    return 'Please enter a valid phone number (10-15 digits, various formats accepted)';
  }

  // Emergency contact phone validation
  if (!validatePhoneNumber(formData.emergencyContactPhone)) {
    return 'Please enter a valid emergency contact phone number';
  }

  // Hire date validation
  if (!validateHireDate(formData.hireDate)) {
    return 'Hire date cannot be in the future';
  }

  // Emergency contact name validation
  if (!validateName(formData.emergencyContactName)) {
    return 'Emergency contact name must contain only letters, spaces, hyphens, and apostrophes, and be at least 2 characters long';
  }

  // Job title validation (basic check for reasonable length)
  if (formData.jobTitle.trim().length < 2) {
    return 'Job title must be at least 2 characters long';
  }

  // Emergency contact relationship validation
  if (formData.emergencyContactRelationship.trim().length < 2) {
    return 'Emergency contact relationship must be at least 2 characters long';
  }

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