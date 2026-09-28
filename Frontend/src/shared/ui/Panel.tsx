import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

interface PanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: 'section' | 'div' | 'aside';
}

export function Panel({ as: Component = 'section', className, children, ...props }: PanelProps) {
  return (
    <Component className={cn('rounded-md border border-[#d0d7de] bg-white p-6 shadow-sm', className)} {...props}>
      {children}
    </Component>
  );
}