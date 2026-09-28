import { useEffect, useState } from 'react';
import { useMiro } from '@mirohq/websdk-react-hooks';

export type MiroConnectionStatus = 'connecting' | 'connected' | 'error';

export function useMiroSession() {
  const miro = useMiro();
  const [status, setStatus] = useState<MiroConnectionStatus>('connecting');
  const [boardId, setBoardId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    let disposed = false;

    const handleOnlineUsersUpdate = (event: { users: Array<{ id: string; name: string }> }) => {
      if (disposed) return;
      setOnlineUsers(event.users.length);
      console.info('[Miro] online users updated', event.users);
    };

    const connect = async () => {
      console.info('[Miro] connecting to board');
      try {
        const boardInfo = await miro.board.getInfo();
        let currentUser: { id: string; name: string } | null = null;

        try {
          currentUser = await miro.board.getUserInfo();
        } catch (error) {
          console.warn('[Miro] user identity is unavailable; add identity:read to use it', error);
        }

        if (disposed) return;
        setBoardId(boardInfo.id);
        setUserName(currentUser?.name ?? null);
        setStatus('connected');
        console.info('[Miro] connected', {
          boardId: boardInfo.id,
          userId: currentUser?.id,
          userName: currentUser?.name,
        });

        miro.board.ui.on('online_users:update', handleOnlineUsersUpdate);
      } catch (error) {
        if (disposed) return;
        setStatus('error');
        console.error('[Miro] board connection failed', error);
      }
    };

    void connect();

    return () => {
      disposed = true;
      miro.board.ui.off('online_users:update', handleOnlineUsersUpdate);
      console.info('[Miro] disconnected');
    };
  }, [miro]);

  return { status, boardId, userName, onlineUsers };
}