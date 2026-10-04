import { useEffect, useRef } from 'react';
import { client } from '../../../shared/api/client';

type CableEnvelope = {
  type?: string;
  identifier?: string;
  message?: string | { pdf_url?: string };
};

function cableUrl(token: string) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/cable?token=${encodeURIComponent(token)}`;
}

export function usePdfDownload() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => () => socketRef.current?.close(), []);

  const generatePdf = (projectId: string): Promise<string> => new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    if (!token) {
      reject(new Error('Authentication is required.'));
      return;
    }

    socketRef.current?.close();

    const identifier = JSON.stringify({ channel: 'PdfDownloadChannel', sticker_id: projectId });
    const socket = new WebSocket(cableUrl(token));
    socketRef.current = socket;
    let requestStarted = false;
    let settled = false;

    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      socket.close();
      callback();
    };

    const timeoutId = window.setTimeout(() => {
      finish(() => reject(new Error('PDF generation timed out.')));
    }, 60_000);

    socket.onopen = () => {
      socket.send(JSON.stringify({ command: 'subscribe', identifier }));
    };

    socket.onmessage = (event) => {
      let envelope: CableEnvelope;
      try {
        envelope = JSON.parse(event.data as string) as CableEnvelope;
      } catch {
        return;
      }

      if (envelope.type === 'confirm_subscription' && envelope.identifier === identifier && !requestStarted) {
        requestStarted = true;
        client.post('/pdf_generator', { sticker_id: projectId }).catch((error: unknown) => {
          finish(() => reject(error instanceof Error ? error : new Error('Could not start PDF generation.')));
        });
        return;
      }

      if (envelope.identifier !== identifier || !envelope.message) return;
      const message = typeof envelope.message === 'string'
        ? JSON.parse(envelope.message) as { pdf_url?: string }
        : envelope.message;

      if (message.pdf_url) {
        finish(() => resolve(message.pdf_url!));
      }
    };

    socket.onerror = () => finish(() => reject(new Error('WebSocket connection failed.')));
    socket.onclose = () => {
      if (!settled) finish(() => reject(new Error('WebSocket connection closed.')));
    };
  });

  return { generatePdf };
}