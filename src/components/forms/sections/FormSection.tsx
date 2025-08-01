import React from 'react';
import type { FormSectionProps } from '@/components/modals/types';

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      {children}
    </div>
  );
};
