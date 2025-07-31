import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { InsightsCardProps } from './types';

export const InsightsCard: React.FC<InsightsCardProps> = ({ sections }) => {
  if (sections.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map(({ title, employees, bgColor, borderColor, textColor, lightTextColor }) => (
            <div key={title} className={`p-4 ${bgColor} rounded-lg border ${borderColor}`}>
              <h4 className={`font-medium ${textColor} mb-2`}>{title}</h4>
              <div className="space-y-1">
                {employees.slice(0, 3).map(emp => (
                  <div key={emp.id} className={`text-sm ${lightTextColor}`}>
                    {emp.firstName} {emp.lastName} - {emp.jobTitle}
                  </div>
                ))}
                {employees.length > 3 && (
                  <div className={`text-xs ${lightTextColor.replace('/70', '')}`}>
                    +{employees.length - 3} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
