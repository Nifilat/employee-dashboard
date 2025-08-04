import { toast as sonnerToast, type ExternalToast } from 'sonner';
import type { ToastProps } from '@/types';

export function toast({ title, description, variant = 'default', action }: ToastProps) {
  const message = title || description || '';
  const options: ExternalToast = {};

  if (title && description) {
    options.description = description;
  }

  if (action) {
    options.action = action;
  }

  switch (variant) {
    case 'destructive':
      return sonnerToast.error(message, options);
    case 'success':
      return sonnerToast.success(message, options);
    default:
      return sonnerToast(message, options);
  }
}

export function useToast() {
  return {
    toast,
  };
}
