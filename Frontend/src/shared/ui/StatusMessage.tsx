import { cn } from '../lib/cn';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface StatusMessageProps {
  status: Status;
  idle: string;
  loading?: string;
  success: string;
  error: string;
}

export function StatusMessage({ status, idle, loading = 'Загрузка...', success, error }: StatusMessageProps) {
  const message = status === 'loading' ? loading : status === 'success' ? success : status === 'error' ? error : idle;

  return <span className={cn('text-xs', status === 'success' && 'text-[#1a7f37]', status === 'error' && 'text-[#cf222e]', status !== 'success' && status !== 'error' && 'text-[#656d76]')}>{message}</span>;
}