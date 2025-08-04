import React, { useState, useEffect, useCallback } from 'react';
import type { SupervisorSelectProps } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from '@/components/ui';
import { fetchSupervisorsByDepartment } from '@/services/api';
import type { SupervisorOption } from '@/components/modals/types';

export const SupervisorSelect: React.FC<SupervisorSelectProps> = ({
  department,
  value,
  onChange,
}) => {
  const [supervisors, setSupervisors] = useState<SupervisorOption[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSupervisors = useCallback(async () => {
    setLoading(true);
    try {
      const sups = await fetchSupervisorsByDepartment(department);
      setSupervisors(sups);
    } catch (error) {
      console.error('Failed to load supervisors:', error);
      setSupervisors([]);
    } finally {
      setLoading(false);
    }
  }, [department]);

  useEffect(() => {
    loadSupervisors();
  }, [loadSupervisors]);

  return (
    <div className="space-y-2">
      <Label htmlFor="supervisorId">Supervisor (optional)</Label>
      <Select
        value={value || 'none'}
        onValueChange={(selectedValue: string) =>
          onChange(selectedValue === 'none' ? '' : selectedValue)
        }
      >
        <SelectTrigger id="supervisorId">
          <SelectValue placeholder="None" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {loading ? (
            <SelectItem value="loading" disabled>
              Loading...
            </SelectItem>
          ) : (
            supervisors.map(supervisor => (
              <SelectItem key={supervisor.id} value={supervisor.id}>
                {supervisor.displayName}
                {supervisor.email ? ` (${supervisor.email})` : ''}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
