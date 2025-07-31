export const getStatusColor = (status: string): string => {
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

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
};
