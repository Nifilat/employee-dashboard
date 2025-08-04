import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { type SortingState, type ColumnFiltersState } from '@tanstack/react-table';
import type { Employee } from '../types';
import {
  EmployeeModal,
  ViewEmployeeModal,
  ExportModal,
  DeleteEmployeeModal,
} from '@/components/modals';
import { EmployeeTable } from '../components/tables/EmployeeTable';
import { EmployeeFilters, StatusTabs } from '@/components/filters';
import { Button } from '@/components/ui';
import type { PeoplePageProps } from './types';
import { filteredEmployees } from '../utils';

export const PeoplePage: React.FC<PeoplePageProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('all');
  const [jobTitleFilter, setJobTitleFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = filteredEmployees([...employees].reverse(), {
    searchQuery: globalFilter,
    statusFilter,
    departmentFilter,
    employmentTypeFilter,
    jobTitleFilter,
    sortBy: sorting.find(s => s.id === 'hireDate')?.desc !== undefined ? 'date' : undefined,
  });

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (employeeId: string) => {
    setIsDeleting(true);
    try {
      await onDeleteEmployee(employeeId);
    } catch (error) {
      console.error('Error deleting employee:', error);
    } finally {
      setIsDeleting(false);
      setSelectedEmployee(null);
    }
  };

  const handleSaveEmployee = (employeeData: Employee) => {
    if (selectedEmployee) {
      onUpdateEmployee(employeeData);
    } else {
      onAddEmployee(employeeData);
    }
    setShowEmployeeModal(false);
    setSelectedEmployee(null);
  };

  const clearFilters = () => {
    setStatusFilter('All');
    setDepartmentFilter('all');
    setEmploymentTypeFilter('all');
    setJobTitleFilter('all');
    setGlobalFilter('');
    setColumnFilters([]);
  };

  return (
    <div className="space-y-6 px-2 sm:px-0 w-full overflow-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="md:pl-0 pl-10">
          <h1 className="text-2xl font-semibold text-primary">Employees</h1>
          <p className="text-primary text-sm">
            Manage and collaborate within your organization's teams
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Download size={16} />
            Export
          </Button>
          <Button
            onClick={() => {
              setSelectedEmployee(null);
              setShowEmployeeModal(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus size={16} />
            Add member
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <StatusTabs statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      {/* Sick Leave Banner */}
      <div className="border border-ring rounded-lg p-4">
        <h3 className="font-medium text-primary mb-1">Sick Leave Policy</h3>
        <p className="text-sm text-foreground">
          Employees can be enrolled in one sick policy. Make sure that your policy is compliant with
          your state rules.
        </p>
      </div>

      {/* Search and Filters */}
      <EmployeeFilters
        employees={employees}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        employmentTypeFilter={employmentTypeFilter}
        setEmploymentTypeFilter={setEmploymentTypeFilter}
        jobTitleFilter={jobTitleFilter}
        setJobTitleFilter={setJobTitleFilter}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onClearFilters={clearFilters}
      />

      {/* Employee Table */}
      <EmployeeTable
        employees={filtered}
        globalFilter={globalFilter}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        employees={filtered}
      />

      <ViewEmployeeModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        employee={selectedEmployee}
      />

      <EmployeeModal
        isOpen={showEmployeeModal}
        onClose={() => {
          setShowEmployeeModal(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onSave={handleSaveEmployee}
      />

      <DeleteEmployeeModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onConfirmDelete={handleConfirmDelete}
        loading={isDeleting}
      />
    </div>
  );
};
