import type { Employee, EmployeeFilters } from '@/types';

export const filteredEmployees = (employees: Employee[], filters: EmployeeFilters): Employee[] => {
  let filtered = employees;

  const {
    searchQuery,
    statusFilter,
    departmentFilter,
    employmentTypeFilter,
    jobTitleFilter,
    sortBy,
  } = filters;

  // Search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      emp =>
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.jobTitle.toLowerCase().includes(query)
    );
  }

  // Status
  if (statusFilter && statusFilter !== 'All') {
    filtered = filtered.filter(emp => emp.status === statusFilter);
  }

  // Department
  if (departmentFilter && departmentFilter !== 'all') {
    filtered = filtered.filter(emp => emp.department === departmentFilter);
  }

  // Employment type
  if (employmentTypeFilter && employmentTypeFilter !== 'all') {
    filtered = filtered.filter(emp => emp.contractType === employmentTypeFilter);
  }

  // Job Title
  if (jobTitleFilter && jobTitleFilter !== 'all') {
    filtered = filtered.filter(emp => emp.jobTitle === jobTitleFilter);
  }

  // Sort
  // Sort
  filtered = filtered.sort((a, b) => {
    if (sortBy === 'name') {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === 'date') {
      // When user explicitly clicks date sort, use hireDate
      return new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime();
    }

    // Default fallback sort — newest created first
    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
  });

  return filtered;
};

// Re-export utilities from their specific modules
export { getAvatarUrl, formatDate, getUniqueDepartments, getUniqueJobTitles } from './formatting';
export { exportToCSV, exportToJSON } from './export';
export { validateFormData, fileToBase64 } from './validation/employee';
