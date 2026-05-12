/* RedBoi — registers the service worker after window load, silent on failure */

/**
 * Registers ./sw.js when the browser supports service workers.
 */
export function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .catch((err) => {
        console.warn('[redboi] SW registration failed:', err);
      });
  });
}
