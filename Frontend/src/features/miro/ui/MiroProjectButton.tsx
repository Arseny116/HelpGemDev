import { useState } from 'react';
import { useLanguage } from '../../../shared/lib/i18n/useLanguage';
import { Button } from '../../../shared/ui/Button';
import { useMiroBoard } from '../model/useMiroBoard';

interface MiroProjectButtonProps {
  projectName: string;
  pillars: string[];
}

export function MiroProjectButton({ projectName, pillars }: MiroProjectButtonProps) {
  const { t } = useLanguage();

  if (typeof globalThis === 'undefined' || !('miro' in globalThis)) {
    return <Button variant="secondary" type="button" disabled>{t('addToMiro')}</Button>;
  }

  return <MiroProjectConnected projectName={projectName} pillars={pillars} />;
}

function MiroProjectConnected({ projectName, pillars }: MiroProjectButtonProps) {
  const { t } = useLanguage();
  const { addProject } = useMiroBoard();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleAdd = async () => {
    if (!projectName || pillars.length === 0) return;
    setIsLoading(true);
    setHasError(false);
    try {
      await addProject(projectName, pillars);
      setIsAdded(true);
    } catch (error) {
      setHasError(true);
      console.error('[Miro] project creation failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return <Button variant="secondary" type="button" onClick={handleAdd} disabled={isLoading || isAdded}>{isLoading ? t('miroPreparing') : isAdded ? t('miroAdded') : hasError ? t('miroError') : t('addToMiro')}</Button>;
}