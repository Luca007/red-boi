/* RedBoi — early theme bootstrap to avoid flash before the app bundle loads */

(function () {
  try {
    var mode = localStorage.getItem('redboi-theme') || 'system';
    var isDark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  } catch (_) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
