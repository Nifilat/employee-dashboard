import React, { useState, useMemo } from 'react';
import { Plus, Download } from 'lucide-react';
import { type SortingState, type ColumnFiltersState } from '@tanstack/react-table';
import {
  filteredEmployees as filterEmployeesUtil
} from '../utils';
import type { Employee } from '../types';
import { statusTabs } from '../constants';
import { EmployeeModal } from '../components/modals/EmployeeModal';
import { ViewEmployeeModal } from '../components/modals/ViewEmployeeModal';
import { ExportModal } from '../components/modals/ExportModal';
import { EmployeeTable } from '../components/tables/EmployeeTable';
import { EmployeeFilters } from '../components/filters/EmployeeFilters';
import { StatusTabs } from '../components/filters/StatusTabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui';
import type { PeoplePageProps } from './types';
import type { EmployeeFilters } from '../types';
import type { SortOption } from '../types';


export const PeoplePage: React.FC<PeoplePageProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [searchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [sortBy] = useState<SortOption>('date');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


  const filters: EmployeeFilters = {
    searchQuery,
    statusFilter,
    departmentFilter,
    employmentTypeFilter,
    jobTitleFilter,
    sortBy,
  };
  const filtered = filterEmployeesUtil(employees, filters);


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
    setShowDeleteDialog(true);
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
    setDepartmentFilter('');
    setEmploymentTypeFilter('');
    setJobTitleFilter('');
    setGlobalFilter('');
    setColumnFilters([]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <p className="text-gray-600 text-sm">
            Manage and collaborate within your organization's teams
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </Button>
          <Button
            onClick={() => {
              setSelectedEmployee(null);
              setShowEmployeeModal(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add member
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <StatusTabs statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      {/* Sick Leave Banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-1">Sick Leave Policy</h3>
        <p className="text-sm text-gray-600">
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">
                {selectedEmployee?.firstName} {selectedEmployee?.lastName}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedEmployee) {
                  onDeleteEmployee(selectedEmployee.id);
                }
                setShowDeleteDialog(false);
                setSelectedEmployee(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
