import React from 'react';
import { getAvatarUrl } from '../../utils';

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
  };

  const [firstName = '', lastName = ''] = name.split(' ');

  const fallbackUrl = getAvatarUrl(firstName, lastName);

  return (
    <div
      className={`bg-purple-100 rounded-full flex items-center justify-center overflow-hidden ${sizeClasses[size]}`}
    >
      <img src={imageUrl || fallbackUrl} alt={name} className="object-cover w-full h-full" />
    </div>
  );
};
