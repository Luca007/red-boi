import { useEffect, useState, useCallback } from 'react';

const CYCLE = ['dark', 'light', 'system'];

export function useTheme() {
  const [mode, setMode] = useState('system');
  const [sysDark, setSysDark] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const h = (e) => setSysDark(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const isDark = mode === 'dark' || (mode === 'system' && sysDark);

  useEffect(() => {
    document.body.style.background = isDark ? '#0E0704' : '#F5E8CC';
  }, [isDark]);

  const cycleTheme = useCallback(() => {
    setMode((m) => CYCLE[(CYCLE.indexOf(m) + 1) % CYCLE.length]);
  }, []);

  return { mode, isDark, cycleTheme };
}
