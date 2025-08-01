// components/EmergencyContactSection.tsx
import React from 'react';
import type { ChangeEvent } from 'react';
import { Input, Label } from '@/components/ui';
import type { EmployeeFormData } from '@/components/modals/types';
import type { EmergencyContactSectionProps } from './types';

export const EmergencyContactSection: React.FC<EmergencyContactSectionProps> = ({
  formData,
  onFieldChange,
}) => {
  const handleInputChange =
    (field: keyof EmployeeFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      onFieldChange(field, e.target.value);
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="emergencyContactName">Contact Name *</Label>
        <Input
          id="emergencyContactName"
          type="text"
          required
          value={formData.emergencyContactName}
          onChange={handleInputChange('emergencyContactName')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
        <Input
          id="emergencyContactPhone"
          type="tel"
          required
          value={formData.emergencyContactPhone}
          onChange={handleInputChange('emergencyContactPhone')}
        />
      </div>

      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
        <Input
          id="emergencyContactRelationship"
          type="text"
          required
          value={formData.emergencyContactRelationship}
          onChange={handleInputChange('emergencyContactRelationship')}
          placeholder="e.g., Spouse, Parent, Sibling"
        />
      </div>
    </div>
  );
};
