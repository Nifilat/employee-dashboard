import React from 'react';
import { X, Download } from 'lucide-react';
import type { Employee } from '../../types';
import { exportToCSV, exportToJSON } from '../../utils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, employees }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/10">
      <div className="bg-card rounded-lg max-w-sm w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-primary/90">Export Data</h2>
            <button onClick={onClose} className="text-primary/75 hover:text-primary/80">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                exportToCSV(employees);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 border border-ring rounded-lg hover:bg-muted transition-colors"
            >
              <Download size={20} />
              <span>Export as CSV</span>
            </button>

            <button
              onClick={() => {
                exportToJSON(employees);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 border border-ring rounded-lg hover:bg-muted transition-colors"
            >
              <Download size={20} />
              <span>Export as JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
