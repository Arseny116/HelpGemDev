import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { MiroProvider } from '@mirohq/websdk-react-hooks';
import '../shared/tailwind.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <MiroProvider>
       <App />
     </MiroProvider>
  </StrictMode>
);