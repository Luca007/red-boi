/* RedBoi — theme cycler (dark / light / system) and persistence */

import { THEME_STORAGE_KEY } from '../constants.js';

const CYCLE = ['dark', 'light', 'system'];
let mode = 'system';
const listeners = new Set();

/**
 * Reads persisted mode, applies the resolved theme to <html data-theme>, returns state.
 * @returns {{ mode: 'dark'|'light'|'system', isDark: boolean }}
 */
export function initTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && CYCLE.includes(stored)) mode = stored;
  } catch (_) {
    // localStorage unavailable (private mode, file://, etc.) — fall back to default
  }
  apply();
  return getTheme();
}

/**
 * Advances mode through dark → light → system, persists, applies.
 * @returns {{ mode: 'dark'|'light'|'system', isDark: boolean }}
 */
export function cycleTheme() {
  const next = CYCLE[(CYCLE.indexOf(mode) + 1) % CYCLE.length];
  mode = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (_) {
    // ignore
  }
  apply();
  return getTheme();
}

/**
 * Returns the current theme state.
 * @returns {{ mode: 'dark'|'light'|'system', isDark: boolean }}
 */
export function getTheme() {
  return { mode, isDark: resolveIsDark() };
}

/**
 * Subscribes to system color-scheme changes; the listener only fires while mode === 'system'.
 * @param {(state: { mode: string, isDark: boolean }) => void} callback
 * @returns {() => void} unsubscribe
 */
export function onSystemChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function resolveIsDark() {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  return matchMedia('(prefers-color-scheme: dark)').matches;
}

function apply() {
  document.documentElement.dataset.theme = resolveIsDark() ? 'dark' : 'light';
}

if (typeof matchMedia === 'function') {
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const handler = () => {
    if (mode !== 'system') return;
    apply();
    const state = getTheme();
    listeners.forEach((cb) => cb(state));
  };
  if (mq.addEventListener) mq.addEventListener('change', handler);
  else if (mq.addListener) mq.addListener(handler);
}
