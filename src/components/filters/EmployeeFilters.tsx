import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getUniqueDepartments, getUniqueJobTitles } from '@/utils/formatting';
import type { EmployeeFiltersProps } from './types';

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  employees,
  globalFilter,
  setGlobalFilter,
  departmentFilter,
  setDepartmentFilter,
  employmentTypeFilter,
  setEmploymentTypeFilter,
  jobTitleFilter,
  setJobTitleFilter,
  showFilters,
  setShowFilters,
  onClearFilters,
}) => {
  const uniqueDepartments = getUniqueDepartments(employees);
  const uniqueJobTitles = getUniqueJobTitles(employees);

  return (
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
            placeholder="Search employees..."
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
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
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-input border border-border rounded-lg p-4">
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
                onValueChange={value => setEmploymentTypeFilter(value === 'all' ? '' : value || '')}
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
                onClick={onClearFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeFilters;
