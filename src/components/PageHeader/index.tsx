// components/PageHeader/index.tsx
import React from 'react';
import { Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  onAddMember: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, onAddMember }) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h1>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      <button
        onClick={onAddMember}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <Plus size={16} />
        Add member
      </button>
    </div>
  );
};

export default PageHeader;
