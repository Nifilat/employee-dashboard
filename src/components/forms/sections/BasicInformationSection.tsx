import React, { useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Input, Button, Label } from '@/components/ui';
import type { EmployeeFormData } from '@/components/modals/types';
import type { BasicInformationSectionProps } from './types';

export const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  formData,
  onFieldChange,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange =
    (field: keyof EmployeeFormData) => (e: ChangeEvent<HTMLInputElement>) => {
      onFieldChange(field, e.target.value);
    };

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    await onFileChange(file);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          type="text"
          required
          value={formData.firstName}
          onChange={handleInputChange('firstName')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          type="text"
          required
          value={formData.lastName}
          onChange={handleInputChange('lastName')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange('email')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleInputChange('phone')}
        />
      </div>

      {/* Profile Photo Upload */}
      <div className="md:col-span-2 space-y-2">
        <Label>Profile Photo</Label>
        <div className="flex items-center gap-4">
          <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
            Choose File
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          {formData.profilePhoto && (
            <img
              src={formData.profilePhoto}
              alt="Profile Preview"
              className="w-20 h-20 object-cover rounded-full border"
            />
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          {formData.profilePhotoFile
            ? `Selected: ${formData.profilePhotoFile.name}`
            : 'No file chosen'}
        </div>
        <div className="text-xs text-muted-foreground">Max file size: 1MB</div>
      </div>
    </div>
  );
};
