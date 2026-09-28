import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/model/useAuth';
import { AuthLayout } from '../../../shared/ui/AuthLayout';
import { Button } from '../../../shared/ui/Button';
import { Field } from '../../../shared/ui/Field';
import { useLanguage } from '../../../shared/lib/i18n/useLanguage';

export function LoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      const apiErrors = error.response?.data?.errors;
      setErrors(Array.isArray(apiErrors) ? apiErrors : [t('genericError')]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      eyebrow={t('welcomeBackEyebrow')}
      title={t('welcomeBack')}
      description={t('loginDescription')}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Field id="login-email" label={t('email')} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t('emailPlaceholder')} required />
        <Field id="login-password" label={t('password')} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t('passwordPlaceholder')} required />
        {errors.length > 0 ? <div className="border border-[#f0c5bd] bg-[#fff5f2] p-3 text-sm text-[#b43f31]" role="alert">{errors.map((error, index) => <p key={`${error}-${index}`}>{error}</p>)}</div> : null}
        <Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? t('loggingIn') : t('login')} <span aria-hidden="true">→</span></Button>
      </form>
      <p className="mt-7 text-sm text-[#656d76]">{t('noAccount')} <Link className="font-bold text-[#0969da] underline-offset-4 hover:underline" to="/register">{t('register')}</Link></p>
    </AuthLayout>
  );
}
