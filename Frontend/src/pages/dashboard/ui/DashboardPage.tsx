import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/model/useAuth';
import { client } from '../../../shared/api/client';
import { useLanguage } from '../../../shared/lib/i18n/useLanguage';
import { MiroProjectButton } from '../../../features/miro/ui/MiroProjectButton';
import { Button } from '../../../shared/ui/Button';
import { Field } from '../../../shared/ui/Field';
import { Panel } from '../../../shared/ui/Panel';
import { StatusMessage } from '../../../shared/ui/StatusMessage';
import { MiroConnectionStatus } from '../../../features/miro/ui/MiroConnectionStatus';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [pillars, setPillars] = useState(['', '', '']);
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectStatus, setProjectStatus] = useState<FormStatus>('idle');
  const [pdfStatus, setPdfStatus] = useState<FormStatus>('idle');

  const updatePillar = (index: number, value: string) => setPillars((current) => current.map((pillar, itemIndex) => itemIndex === index ? value : pillar));
  const addPillar = () => setPillars((current) => [...current, '']);
  const removePillar = (index: number) => setPillars((current) => current.length === 1 ? current : current.filter((_, itemIndex) => itemIndex !== index));

  const handleSubmitPillars = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProjectStatus('loading');
    try {
      const { data } = await client.post<{ id: number }>('/core_pillars', { project: { name: projectName, core_pillars: pillars.filter(Boolean) } });
      setProjectId(String(data.id));
      setProjectStatus('success');
    } catch {
      setProjectStatus('error');
    }
  };

  const handleSubmitPdf = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectId) return;
    setPdfStatus('loading');
    try {
      await client.post('/pdf_generator', { sticker_id: projectId });
      setPdfStatus('success');
    } catch {
      setPdfStatus('error');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initials = user?.name?.slice(0, 2).toUpperCase() || 'HG';

  return (
    <div className="min-h-screen bg-[#f6f8fa] font-sans text-[#1f2328]">
      <nav className="border-b border-[#d0d7de] bg-[#24292f] text-white" aria-label={t('workspace')}>
        <div className="mx-auto flex min-h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-sm" aria-hidden="true">◆</span><span className="hidden sm:inline">{t('brand')}</span></div>
          <div className="hidden h-8 max-w-md flex-1 items-center rounded-md border border-white/20 bg-white/10 px-3 text-sm text-white/70 md:flex">{t('search')}</div>
          <div className="ml-auto flex items-center gap-2"><button className="hidden border-0 bg-transparent px-2 py-1.5 text-sm text-white/80 hover:text-white sm:block" type="button">{t('projects')}</button><button className="hidden border-0 bg-transparent px-2 py-1.5 text-sm text-white/80 hover:text-white sm:block" type="button">{t('settings')}</button><Button variant="ghost" className="px-2 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:text-white" onClick={toggleLanguage} aria-label={t('language')}>{language === 'ru' ? 'EN' : 'RU'}</Button><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0969da] font-mono text-[11px] text-white" aria-label={user?.name}>{initials}</span><Button variant="ghost" className="px-2 py-1.5 text-white/80 hover:bg-white/10 hover:text-white" onClick={handleLogout} aria-label={t('logout')} title={t('logout')}>↗</Button></div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:py-10">
        <header className="mb-6 flex flex-col gap-3 border-b border-[#d0d7de] pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm text-[#656d76]">{t('workspace')} / {t('overview')}</p><h1 className="mt-1 text-2xl font-semibold tracking-[-0.02em]">{t('workspaceTitle')}</h1><p className="mt-2 text-sm text-[#656d76]">{t('workspaceDescription')}</p></div><div className="flex flex-wrap items-center gap-2"><MiroConnectionStatus /><span className="rounded-full bg-[#ddf4e4] px-2.5 py-1 text-xs font-semibold text-[#1a7f37]">{t('active')}</span></div></header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
          <Panel>
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#d0d7de] pb-5"><div><p className="text-xs font-semibold text-[#656d76]">{t('projectSetup')}</p><h2 className="mt-1 text-xl font-semibold tracking-[-0.02em]">{t('newProject')}</h2><p className="mt-2 text-sm text-[#656d76]">{t('projectDescription')}</p></div><span className="rounded-full border border-[#d0d7de] px-2.5 py-1 text-xs text-[#656d76]">{t('draft')}</span></div>
            <form className="grid gap-6" onSubmit={handleSubmitPillars}>
              <Field id="project-name" label={t('projectName')} value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder={t('projectPlaceholder')} required />
              <div><span className="mb-2 block text-sm font-semibold text-[#1f2328]">{t('corePillars')}</span><p className="mb-3 text-xs text-[#656d76]">{t('pillarsDescription')}</p><div className="grid gap-2.5">{pillars.map((pillar, index) => <div className="flex items-center gap-2.5" key={index}><span className="w-6 text-center font-mono text-xs text-[#656d76]">{String(index + 1).padStart(2, '0')}</span><input className="w-full rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm outline-none shadow-sm placeholder:text-[#818b98] focus:border-[#0969da] focus:ring-2 focus:ring-[#54aeff66]" value={pillar} onChange={(event) => updatePillar(index, event.target.value)} placeholder={t('pillarPlaceholder')} aria-label={`${t('corePillars')} ${index + 1}`} /><Button variant="danger" className="px-1.5 py-1.5 text-base" type="button" onClick={() => removePillar(index)} aria-label={`${t('removePillar')} ${index + 1}`}>×</Button></div>)}</div><Button variant="secondary" className="mt-3 w-full justify-start text-left font-normal" type="button" onClick={addPillar}>+ {t('addPillar')}</Button></div>
              <div className="flex flex-col items-stretch justify-between gap-3 border-t border-[#d0d7de] pt-5 sm:flex-row sm:items-center"><StatusMessage status={projectStatus} idle={t('unsaved')} loading={t('saving')} success={t('saved')} error={t('saveError')} /><div className="flex flex-wrap gap-2"><MiroProjectButton projectName={projectName} pillars={pillars.filter(Boolean)} /><Button type="submit" disabled={projectStatus === 'loading'}>{projectStatus === 'loading' ? t('saving') : t('createProject')}</Button></div></div>
            </form>
          </Panel>
        </div>

        <Panel className="mt-6"><div className="mb-5 border-b border-[#d0d7de] pb-4"><p className="text-xs font-semibold text-[#656d76]">{t('export')}</p><h2 className="mt-1 text-lg font-semibold">{t('getPdf')}</h2><p className="mt-2 text-sm text-[#656d76]">{t('pdfDescription')}</p></div><form className="flex w-full flex-col gap-4 sm:flex-row sm:items-end" onSubmit={handleSubmitPdf}><div className="flex-1"><Field id="project-id" label={t('projectId')} value={projectId} onChange={(event) => setProjectId(event.target.value)} placeholder={t('projectIdPlaceholder')} /></div><Button variant="secondary" type="submit" disabled={pdfStatus === 'loading'}>{pdfStatus === 'loading' ? t('preparing') : pdfStatus === 'success' ? t('started') : t('createPdf')}</Button></form></Panel>
      </main>
    </div>
  );
}
