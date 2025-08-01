import {
  LayoutGrid,
  Users,
  FileText,
  TrendingUp,
  User,
  Search,
  Settings,
  HelpCircle,
} from 'lucide-react';
import type { MenuItem } from '../types';

export const mainMenuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, isActive: false },
  { id: 'people', label: 'People', icon: Users, isActive: true },
  { id: 'payslip', label: 'Payslip', icon: FileText, isActive: false },
  { id: 'performance', label: 'Performance', icon: TrendingUp, isActive: false },
  { id: 'personal-details', label: 'Personal details', icon: User, isActive: false },
  { id: 'job-reference', label: 'Job & Reference', icon: Search, isActive: false },
];

export const bottomMenuItems: MenuItem[] = [
  { id: 'setting', label: 'Setting', icon: Settings, isActive: false },
  { id: 'support', label: 'Support', icon: HelpCircle, isActive: false },
];
