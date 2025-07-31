import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import type { StatCardProps } from './types';

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  description,
  icon,
  iconBgColor = 'bg-gray-100',
  iconColor = 'text-gray-600',
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
