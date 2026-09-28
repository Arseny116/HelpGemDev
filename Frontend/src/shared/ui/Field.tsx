import type { InputHTMLAttributes, ReactNode } from 'react';
import { Input } from './Input';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: ReactNode;
}

export function Field({ id, label, hint, ...props }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#1f2328]" htmlFor={id}>
        {label}
      </label>
      <Input id={id} {...props} />
      {hint ? <p className="mt-1.5 text-xs text-[#656d76]">{hint}</p> : null}
    </div>
  );
}