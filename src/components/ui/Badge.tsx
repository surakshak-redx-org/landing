import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const VARIANT_CLASSES = {
  red: 'bg-red-50 text-primary-red border-red-200',
  purple: 'bg-purple-50 text-shakti-purple border-purple-200',
  saffron: 'bg-orange-50 text-saffron border-orange-200',
  green: 'bg-green-50 text-forest-green border-green-200',
  stone: 'bg-stone-50 text-stone border-stone-200',
} as const;

export type BadgeVariant = keyof typeof VARIANT_CLASSES;

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'red', className }: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
