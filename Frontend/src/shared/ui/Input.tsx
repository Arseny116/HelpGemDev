import type { InputHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm text-[#1f2328] shadow-sm outline-none transition placeholder:text-[#818b98] focus:border-[#0969da] focus:ring-2 focus:ring-[#54aeff66]',
        className,
      )}
      {...props}
    />
  );
}