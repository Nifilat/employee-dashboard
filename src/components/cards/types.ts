import type { Employee } from '@/types';

export interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export interface BreakdownItem {
  label: string;
  count: number;
  percentage: number;
  badgeClassName?: string;
}

export interface BreakdownCardProps {
  title: string;
  icon: React.ReactNode;
  items: BreakdownItem[];
  totalCount: number;
  showMoreText?: string;
}

export interface InsightSection {
  title: string;
  employees: Employee[];
  bgColor: string;
  borderColor: string;
  textColor: string;
  lightTextColor: string;
}

export interface InsightsCardProps {
  sections: InsightSection[];
}
