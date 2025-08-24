// Hook that allows user to hit the escape key to cancel actions/confirmation messages
import { useEffect } from 'react';

export default function useEscape(callback, enabled = true) {
  useEffect(() => {
    // if useEscape enabled = False, don't set up listener
    if (!enabled) return;

    const handleKeyDown = (e) => e.key === 'Escape' && callback();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback, enabled]);
}
