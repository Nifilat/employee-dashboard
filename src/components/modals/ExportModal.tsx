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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white rounded-lg max-w-sm w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Export Data</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                exportToCSV(employees);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={20} />
              <span>Export as CSV</span>
            </button>

            <button
              onClick={() => {
                exportToJSON(employees);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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
