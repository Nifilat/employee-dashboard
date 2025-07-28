import React, { useState, useEffect } from 'react';
import { Plus, Filter, ArrowUpDown, Download, Search, Users } from 'lucide-react';
import {
  filteredEmployees as filterEmployeesUtil,
  getUniqueDepartments,
  getUniqueJobTitles,
  getAvatarUrl,
  formatDate,
} from '../utils';
import type { Employee, SortOption, EmployeeFilters } from '../types';
import { statusTabs } from '../constants';
import { ActionDropdown } from '../components/actions/ActionDropdown';
import { EmployeeModal } from '../components/modals/EmployeeModal';
import { ViewEmployeeModal } from '../components/modals/ViewEmployeeModal';
import { ExportModal } from '../components/modals/ExportModal';
import { Avatar } from '../components/common/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PeoplePageProps {
  employees: Employee[];
  onAddEmployee: (employee: Employee) => void;
  onUpdateEmployee: (employee: Employee) => void;
  onDeleteEmployee: (employeeId: string) => void;
}

export const PeoplePage: React.FC<PeoplePageProps> = ({
  employees,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Use utility for filtering
  const filters: EmployeeFilters = {
    searchQuery,
    statusFilter,
    departmentFilter,
    employmentTypeFilter,
    jobTitleFilter,
    sortBy,
  };
  const filtered = filterEmployeesUtil(employees, filters);

  const uniqueDepartments = getUniqueDepartments(employees);
  const uniqueJobTitles = getUniqueJobTitles(employees);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedEmployees(checked ? filtered.map(emp => emp.id) : []);
  };

  const handleSelectEmployee = (employeeId: string, checked: boolean) => {
    setSelectedEmployees(
      checked
        ? [...selectedEmployees, employeeId]
        : selectedEmployees.filter(id => id !== employeeId)
    );
    if (!checked) setSelectAll(false);
  };

  useEffect(() => {
    setSelectAll(selectedEmployees.length === filtered.length && filtered.length > 0);
  }, [selectedEmployees, filtered]);

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const handleDelete = (employee: Employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName}?`)) {
      onDeleteEmployee(employee.id);
    }
  };

  const handleSaveEmployee = (employeeData: Employee) => {
    if (selectedEmployee) {
      onUpdateEmployee(employeeData);
    } else {
      onAddEmployee(employeeData);
    }
    setShowEmployeeModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">People</h1>
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
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-8 min-w-max">
          {statusTabs.map(status => (
            <Button
              key={status}
              variant="ghost"
              onClick={() => setStatusFilter(status)}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap rounded-none h-auto ${
                statusFilter === status
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-transparent'
              }`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Sick Leave Banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-1">Sick Leave Policy</h3>
        <p className="text-sm text-gray-600">
          Employees can be enrolled in one sick policy. Make sure that your policy is compliant with
          your state rules.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
          </Button>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={value => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-fit">
              <ArrowUpDown size={16} className="mr-2" />
              <SelectValue placeholder="Sort by Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="date">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department-filter">Department</Label>
                <Select
                  value={departmentFilter || undefined}
                  onValueChange={value => setDepartmentFilter(value || '')}
                >
                  <SelectTrigger id="department-filter">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {uniqueDepartments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment-type-filter">Employment Type</Label>
                <Select
                  value={employmentTypeFilter || undefined}
                  onValueChange={value =>
                    setEmploymentTypeFilter(value === 'all' ? '' : value || '')
                  }
                >
                  <SelectTrigger id="employment-type-filter">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-title-filter">Job Title</Label>
                <Select
                  value={jobTitleFilter || undefined}
                  onValueChange={value => setJobTitleFilter(value === 'all' ? '' : value || '')}
                >
                  <SelectTrigger id="job-title-filter">
                    <SelectValue placeholder="All Titles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Titles</SelectItem>
                    {uniqueJobTitles.map(title => (
                      <SelectItem key={title} value={title}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDepartmentFilter('');
                    setEmploymentTypeFilter('');
                    setJobTitleFilter('');
                    setSearchQuery('');
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Employee Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={checked => handleSelectAll(checked === true)}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hire Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employment Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={checked =>
                        handleSelectEmployee(employee.id, checked === true)
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={`${employee.firstName} ${employee.lastName}`}
                        imageUrl={
                          employee.profilePhoto ||
                          getAvatarUrl(employee.firstName, employee.lastName)
                        }
                        size="sm"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{employee.firstName}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(employee.hireDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.jobTitle}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.contractType}</td>
                  <td className="px-6 py-4">
                    <ActionDropdown
                      employee={employee}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Users size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No employees found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

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
        onClose={() => setShowEmployeeModal(false)}
        employee={selectedEmployee}
        onSave={handleSaveEmployee}
      />
    </div>
  );
};
