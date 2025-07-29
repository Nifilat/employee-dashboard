// components/EmploymentInformationSection.tsx
import React from 'react';
import type { ChangeEvent } from 'react';
import { Department, ContractType, EmploymentStatus } from '../../../types';
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from '@/components/ui';
import type { EmploymentInformationSectionProps } from './types';
import type { EmployeeFormData } from '@/components/modals/types';
import { SupervisorSelect } from './SupervisorSelect';

export const EmploymentInformationSection: React.FC<EmploymentInformationSectionProps> = ({
  formData,
  onFieldChange,
}) => {
  const handleInputChange =
    (field: keyof EmployeeFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      onFieldChange(field, e.target.value);
    };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select
            value={formData.department}
            onValueChange={(value: Department) => onFieldChange('department', value)}
          >
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Department).map(dept => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title *</Label>
          <Input
            id="jobTitle"
            type="text"
            required
            value={formData.jobTitle}
            onChange={handleInputChange('jobTitle')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contractType">Contract Type *</Label>
          <Select
            value={formData.contractType}
            onValueChange={(value: ContractType) => onFieldChange('contractType', value)}
          >
            <SelectTrigger id="contractType">
              <SelectValue placeholder="Select contract type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ContractType).map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Employment Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value: EmploymentStatus) => onFieldChange('status', value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(EmploymentStatus).map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hireDate">Hire Date *</Label>
          <Input
            id="hireDate"
            type="date"
            required
            value={formData.hireDate}
            onChange={handleInputChange('hireDate')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <SupervisorSelect
          department={formData.department}
          value={formData.supervisorId}
          onChange={value => onFieldChange('supervisorId', value)}
        />
      </div>

      {formData.status === EmploymentStatus.PROBATION && (
        <div className="space-y-2">
          <Label htmlFor="probationEndDate">Probation End Date</Label>
          <Input
            id="probationEndDate"
            type="date"
            value={formData.probationEndDate}
            onChange={handleInputChange('probationEndDate')}
          />
        </div>
      )}
    </>
  );
};
