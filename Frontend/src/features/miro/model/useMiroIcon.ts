import { useEffect } from 'react';
import { useMiro } from '@mirohq/websdk-react-hooks';

export function useMiroIcon() {
  const miro = useMiro();

  useEffect(() =>
     {
    const handleIconClick = async () => {
        if (await miro.board.ui.canOpenPanel()) {
  await miro.board.ui.openPanel({ url: 'app.html' });
       }
      
    };

    try 
    {
      miro.board.ui.on('icon:click', handleIconClick);
    } catch {
      // The SDK event is only available inside a Miro board headless iframe.
    }

    return () => {
      try {
        miro.board.ui.off('icon:click', handleIconClick);
      } catch {
        // Ignore cleanup when the app is running outside Miro.
      }
    };
  }, [miro]);
}