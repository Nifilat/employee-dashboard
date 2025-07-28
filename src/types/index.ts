export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: Department;
  contractType: ContractType;
  status: EmploymentStatus;
  hireDate: string;
  supervisorId?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  probationEndDate?: string;
  profilePhoto?: string;
  salary?: number;
  probationStatus?: 'In Probation' | 'Completed' | 'N/A';
}

export const Department = {
  EXECUTIVE: 'Executive',
  ENGINEERING: 'Engineering',
  MARKETING: 'Marketing',
  SALES: 'Sales',
  HR: 'Human Resources',
  FINANCE: 'Finance',
  OPERATIONS: 'Operations',
  CUSTOMER_SUPPORT: 'Customer Support',
  IT: 'Information Technology',
  PRODUCT: 'Product',
  LEGAL: 'Legal',
} as const;

export type Department = (typeof Department)[keyof typeof Department];

export const ContractType = {
  PERMANENT: 'Permanent',
  CONTRACT: 'Contract',
  INTERN: 'Intern',
} as const;

export type ContractType = (typeof ContractType)[keyof typeof ContractType];

export const EmploymentStatus = {
  ACTIVE: 'Active',
  ON_BOARDING: 'Onboarding',
  OFF_BOARDING: 'Off-boarding',
  PROBATION: 'Probation',
  DISMISSED: 'Dismissed',
} as const;

export type EmploymentStatus = (typeof EmploymentStatus)[keyof typeof EmploymentStatus];
export type SortOption = 'name' | 'date';

export interface EmployeeFilters {
  searchQuery: string;
  statusFilter: string;
  departmentFilter: string;
  employmentTypeFilter: string;
  jobTitleFilter: string;
  sortBy: SortOption;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  isActive: boolean;
}
