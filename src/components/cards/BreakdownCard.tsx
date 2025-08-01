import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BreakdownCardProps } from './types';

export const BreakdownCard: React.FC<BreakdownCardProps> = ({
  title,
  icon,
  items,
  showMoreText,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map(({ label, count, percentage, badgeClassName }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm font-medium">{label}</span>
              <div className="flex items-center gap-2">
                <Badge className={badgeClassName} variant="secondary">
                  {count}
                </Badge>
                <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
              </div>
            </div>
          ))}
          {showMoreText && (
            <div className="pt-2 border-t">
              <span className="text-xs text-muted-foreground">{showMoreText}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
