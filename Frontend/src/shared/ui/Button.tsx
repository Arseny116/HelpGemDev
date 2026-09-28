import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-[#1f883d] bg-[#1f883d] text-white shadow-sm hover:border-[#1a7f37] hover:bg-[#1a7f37]',
  secondary: 'border-[#d0d7de] bg-[#f6f8fa] text-[#1f2328] shadow-sm hover:bg-[#eff2f5]',
  ghost: 'border-transparent bg-transparent text-[#656d76] hover:bg-[#f3f4f6] hover:text-[#1f2328]',
  danger: 'border-transparent bg-transparent text-[#cf222e] hover:bg-[#ffebe9]',
};

export function Button({ className, type = 'button', variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm font-semibold transition duration-150 disabled:cursor-wait disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}