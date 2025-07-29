import React from 'react';
import { Users, DollarSign, Calendar, UserCheck, AlertCircle, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Employee, Department, EmploymentStatus } from '@/types';

interface StatsCardsProps {
  employees?: Employee[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ employees = [] }) => {
  // Early return if no employees data
  if (!employees || employees.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Empty state cards */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground mt-1">No employees yet</p>
              </div>
              <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Newly Hired</p>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Probation</p>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground mt-1">No employees</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground mt-1">No employees</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate stats from real employee data
  const totalEmployees = employees.length;

  // Get employees hired in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const newlyHired = employees.filter(emp => {
    const hireDate = new Date(emp.hireDate);
    return hireDate >= thirtyDaysAgo;
  });

  // Get employees on probation
  const onProbation = employees.filter(
    emp => emp.status === 'Probation' || emp.probationStatus === 'In Probation'
  );

  // Get employees on leave (off-boarding status)
  const onLeave = employees.filter(emp => emp.status === 'Off-boarding');

  // Calculate total payroll (if salary data exists)
  const totalPayroll = employees.reduce((sum, emp) => {
    return sum + (emp.salary || 0);
  }, 0);

  // Department breakdown
  const departmentCounts = employees.reduce(
    (acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    },
    {} as Record<Department, number>
  );

  // Status breakdown
  const statusCounts = employees.reduce(
    (acc, emp) => {
      acc[emp.status] = (acc[emp.status] || 0) + 1;
      return acc;
    },
    {} as Record<EmploymentStatus, number>
  );

  // Get top departments
  const topDepartments = Object.entries(departmentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Employees */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
                <p className="text-xs text-muted-foreground mt-1">Active workforce</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Newly Hired (Last 30 Days) */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Newly Hired</p>
                <p className="text-2xl font-bold">{newlyHired.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* On Probation */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Probation</p>
                <p className="text-2xl font-bold">{onProbation.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Payroll or On Leave */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                {totalPayroll > 0 ? (
                  <>
                    <p className="text-sm font-medium text-muted-foreground">Total Payroll</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalPayroll)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Monthly estimate</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-muted-foreground">On Leave</p>
                    <p className="text-2xl font-bold">{onLeave.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Off-boarding</p>
                  </>
                )}
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                {totalPayroll > 0 ? (
                  <DollarSign className="w-6 h-6 text-purple-600" />
                ) : (
                  <Calendar className="w-6 h-6 text-purple-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Department Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDepartments.map(([department, count]) => (
                <div key={department} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{department}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{count}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {((count / totalEmployees) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
              {Object.keys(departmentCounts).length > 3 && (
                <div className="pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    +{Object.keys(departmentCounts).length - 3} more departments
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Employee Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(statusCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([status, count]) => {
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case 'Active':
                        return 'bg-green-100 text-green-800';
                      case 'Probation':
                        return 'bg-orange-100 text-orange-800';
                      case 'Onboarding':
                        return 'bg-blue-100 text-blue-800';
                      case 'Off-boarding':
                        return 'bg-red-100 text-red-800';
                      case 'Dismissed':
                        return 'bg-gray-100 text-gray-800';
                      default:
                        return 'bg-gray-100 text-gray-800';
                    }
                  };

                  return (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{status}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(status)} variant="secondary">
                          {count}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {((count / totalEmployees) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      {(newlyHired.length > 0 || onProbation.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newlyHired.length > 0 && (
                <div className="p-4 bg-green-50 dark:bg-green-50/10 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 dark:text-green-200 mb-2">
                    Recently Hired
                  </h4>
                  <div className="space-y-1">
                    {newlyHired.slice(0, 3).map(emp => (
                      <div key={emp.id} className="text-sm text-green-700 dark:text-green-200/70">
                        {emp.firstName} {emp.lastName} - {emp.jobTitle}
                      </div>
                    ))}
                    {newlyHired.length > 3 && (
                      <div className="text-xs text-green-600">+{newlyHired.length - 3} more</div>
                    )}
                  </div>
                </div>
              )}

              {onProbation.length > 0 && (
                <div className="p-4 bg-orange-50 dark:bg-orange-50/10 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-900 dark:text-orange-200 mb-2">
                    On Probation
                  </h4>
                  <div className="space-y-1">
                    {onProbation.slice(0, 3).map(emp => (
                      <div key={emp.id} className="text-sm text-orange-700 dark:text-orange-200/70">
                        {emp.firstName} {emp.lastName} - {emp.jobTitle}
                      </div>
                    ))}
                    {onProbation.length > 3 && (
                      <div className="text-xs text-orange-600">+{onProbation.length - 3} more</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
