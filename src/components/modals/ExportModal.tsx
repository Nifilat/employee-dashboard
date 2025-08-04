import React from 'react';
import { Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import type { ExportModalProps } from './types';
import { exportToCSV, exportToJSON } from '../../utils';

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, employees }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle className="text-primary/90 text-xl">Export Data</DialogTitle>
        </DialogHeader>

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

        <DialogClose asChild></DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
