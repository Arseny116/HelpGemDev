import { useMiroSession } from '../model/useMiroSession';
import { useLanguage } from '../../../shared/lib/i18n/useLanguage';

export function MiroConnectionStatus() {
  if (typeof globalThis === 'undefined' || !('miro' in globalThis)) {
    return null;
  }

  return <MiroConnectionConnected />;
}

function MiroConnectionConnected() {
  const { t } = useLanguage();
  const { status, boardId, userName, onlineUsers } = useMiroSession();
  const isConnected = status === 'connected';

  return (
    <div className="rounded-md border border-[#d0d7de] bg-white px-3 py-2 text-xs shadow-sm">
      <div className="flex items-center gap-2 font-semibold">
        <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-[#1a7f37]' : status === 'error' ? 'bg-[#cf222e]' : 'bg-[#bf8700]'}`} />
        {isConnected ? t('miroConnected') : status === 'error' ? t('miroConnectionError') : t('miroConnecting')}
      </div>
      {isConnected ? <div className="mt-1 text-[#656d76]">{userName} · {onlineUsers} {t('miroOnlineUsers')} · {boardId?.slice(0, 8)}</div> : null}
    </div>
  );
}