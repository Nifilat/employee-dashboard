import React from 'react';
import { Button } from '@/components/ui/button';
import { STATUS_TABS } from '@/constants/data';

interface StatusTabsProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const StatusTabs: React.FC<StatusTabsProps> = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="flex gap-8 min-w-max">
        {STATUS_TABS.map(status => (
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
  );
};