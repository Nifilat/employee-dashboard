import { getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { employeesCollection } from '@/config/firebase';
import type { Employee, ContractType, EmploymentStatus, Department } from '@/types';

function toContractType(str: string): ContractType {
  const values = Object.values({
    PERMANENT: 'Permanent',
    CONTRACT: 'Contract',
    INTERN: 'Intern',
  }) as string[];
  if (values.includes(str)) {
    return str as ContractType;
  }
  return 'Permanent';
}

function toEmploymentStatus(str: string): EmploymentStatus {
  const values = Object.values({
    ACTIVE: 'Active',
    ON_BOARDING: 'Onboarding',
    OFF_BOARDING: 'Off-boarding',
    PROBATION: 'Probation',
    DISMISSED: 'Dismissed',
  }) as string[];
  if (values.includes(str)) {
    return str as EmploymentStatus;
  }
  return 'Active';
}

function toDepartment(str: string): Department {
  const values = Object.values({
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
  }) as string[];
  if (values.includes(str)) {
    return str as Department;
  }
  return 'Engineering';
}

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const snapshot = await getDocs(employeesCollection);
    const employees = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        department: toDepartment(data.department || ''),
        jobTitle: data.jobTitle || '',
        contractType: toContractType(data.contractType || ''),
        status: toEmploymentStatus(data.status || ''),
        hireDate: data.hireDate?.toDate
          ? data.hireDate.toDate().toISOString()
          : data.hireDate || '',
        supervisorId: data.supervisorID || data.supervisorId || '',
        emergencyContact: data.emergencyContact || { name: '', phone: '', relationship: '' },
        probationEndDate: data.probationEndDate?.toDate
          ? data.probationEndDate.toDate().toISOString()
          : data.probationEndDate || '',
        salary: data.salary || 0,
        probationStatus: data.probationStatus || 'N/A',
        profilePhoto: data.profilePhoto || '',
      } as Employee;
    });
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

function removeUndefinedFields<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as Partial<T>;
}

export const addEmployee = async (employee: Omit<Employee, 'id'>) => {
  const cleanEmployee = removeUndefinedFields(employee);
  const docRef = await addDoc(employeesCollection, cleanEmployee);
  return docRef.id;
};

export const updateEmployee = async (employee: Employee) => {
  const { id, ...employeeData } = employee;
  const cleanEmployeeData = removeUndefinedFields(employeeData);
  const employeeRef = doc(employeesCollection, id);
  await updateDoc(employeeRef, cleanEmployeeData);
};

export const deleteEmployee = async (employeeId: string) => {
  const employeeRef = doc(employeesCollection, employeeId);
  await deleteDoc(employeeRef);
};
