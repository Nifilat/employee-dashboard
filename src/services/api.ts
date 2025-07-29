import {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { employeesCollection } from '@/config/firebase';
import { getFirestore } from 'firebase/firestore';
import type { Employee, ContractType, EmploymentStatus, Department } from '@/types';
import type { SupervisorOption } from '@/components/modals/types';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/config/firebase';

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
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>;
}



/**
 * Uploads a profile photo to Firebase Storage and returns the download URL.
 * @param file The file to upload.
 * @param employeeId The employee's ID (used for naming).
 * @returns The download URL of the uploaded photo.
 */
export const uploadEmployeeProfilePhoto = async (
  file: File,
  employeeId: string
): Promise<string> => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `employee_photos/${employeeId}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

/**
 * Adds a new employee, uploading the profile photo if provided.
 * @param employee The employee data (without id).
 * @param profilePhoto Optional File object for the profile photo.
 * @returns The new employee's document ID.
 */
export const addEmployee = async (employee: Omit<Employee, 'id'>, profilePhoto?: File) => {
  let profilePhotoUrl = employee.profilePhoto || '';
  if (profilePhoto) {
    const tempId = Date.now().toString();
    profilePhotoUrl = await uploadEmployeeProfilePhoto(profilePhoto, tempId);
  }
  const cleanEmployee = removeUndefinedFields({
    ...employee,
    profilePhoto: profilePhotoUrl,
  });
  const docRef = await addDoc(employeesCollection, cleanEmployee);
  return docRef.id;
};

/**
 * Updates an employee, uploading a new profile photo if provided.
 * @param employee The employee data (with id).
 * @param profilePhoto Optional File object for the new profile photo.
 */
export const updateEmployee = async (employee: Employee, profilePhoto?: File) => {
  const { id, ...employeeData } = employee;
  let profilePhotoUrl = employee.profilePhoto || '';
  if (profilePhoto) {
    profilePhotoUrl = await uploadEmployeeProfilePhoto(profilePhoto, id);
  }
  const cleanEmployeeData = removeUndefinedFields({
    ...employeeData,
    profilePhoto: profilePhotoUrl,
  });
  const employeeRef = doc(employeesCollection, id);
  await updateDoc(employeeRef, cleanEmployeeData);
};

export const deleteEmployee = async (employeeId: string) => {
  const employeeRef = doc(employeesCollection, employeeId);
  await deleteDoc(employeeRef);
};

export const fetchSupervisorsByDepartment = async (
  department: Department
): Promise<SupervisorOption[]> => {
  const db = getFirestore();
  const userRolesRef = collection(db, 'user-roles');
  const q = query(
    userRolesRef,
    where('role', '==', 'supervisor'),
    where('department', '==', department)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      displayName:
        data.displayName ||
        `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim() ||
        data.email ||
        'Unknown',
      email: data.email,
    };
  });
};
