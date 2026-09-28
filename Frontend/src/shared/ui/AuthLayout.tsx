import type { ReactNode } from 'react';
import { Button } from './Button';
import { useLanguage } from '../lib/i18n/useLanguage';

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthLayout({ eyebrow, title, description, children }: AuthLayoutProps) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8fa] px-5 py-12 font-sans text-[#1f2328]">
      <div className="w-full max-w-md rounded-md border border-[#d0d7de] bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#24292f] text-2xl text-white" aria-hidden="true">◆</span>
          <div className="text-xl font-semibold tracking-[-0.02em]">{t('brand')}</div>
        </div>
        <div className="mb-5 flex justify-center"><Button variant="secondary" className="px-2.5 py-1 text-xs" onClick={toggleLanguage} aria-label={t('language')}>{language === 'ru' ? 'EN' : 'RU'}</Button></div>
        <div className="mb-6 text-center"><p className="text-sm font-semibold text-[#656d76]">{eyebrow}</p><h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{title}</h1><p className="mt-2 text-sm leading-6 text-[#656d76]">{description}</p></div>
        {children}
      </div>
    </main>
  );
}