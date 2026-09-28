import { useMiroIcon } from '../model/useMiroIcon';

export function MiroAppLifecycle() {
  const isMiroRuntime = typeof globalThis !== 'undefined' && 'miro' in globalThis;

  if (!isMiroRuntime) {
    return null;
  }

  return <MiroLifecycleConnected />;
}

function MiroLifecycleConnected() {
  useMiroIcon();
  return null;
}