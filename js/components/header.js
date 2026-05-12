/* RedBoi — sticky header: theme button, logo, tagline, divider, slot for nav pills, bottom rule */

import { el } from '../dom.js';
import { getTheme } from '../features/theme.js';

const ICONS = { dark: '🌘', light: '☀️', system: '🖥️' };
const LABELS = { dark: 'Escuro', light: 'Claro', system: 'Sistema' };

let headerEl = null;
let themeBtnEl = null;

/**
 * Renders the sticky header.
 * @param {{ onThemeToggle: () => void }} params
 * @returns {HTMLElement}
 */
export function renderHeader({ onThemeToggle }) {
  const { mode } = getTheme();
  themeBtnEl = el('button', {
    type: 'button',
    className: 'theme-btn',
    'aria-label': `Alternar tema (atual: ${LABELS[mode]})`,
    title: LABELS[mode],
    onClick: onThemeToggle,
  }, ICONS[mode]);

  const inner = el('div', { className: 'header__inner' },
    el('div', { className: 'header__logo-wrap' },
      el('div', { className: 'header__logo-glow', 'aria-hidden': 'true' }),
      el('img', {
        className: 'header__logo',
        src: './logo.png',
        alt: 'Red Boi Gastrobar',
        width: '80',
        height: '80',
        loading: 'eager',
        decoding: 'async',
        fetchpriority: 'high',
      })
    ),
    el('div', { className: 'header__tagline' }, 'Cardápio Digital')
  );

  headerEl = el('header', { className: 'header' },
    themeBtnEl,
    inner,
    el('div', { className: 'header__divider', 'aria-hidden': 'true' })
  );
  return headerEl;
}

/**
 * Adds/removes the scrolled state to the header (drop-shadow toggle).
 * @param {boolean} scrolled
 */
export function setHeaderScrolled(scrolled) {
  if (!headerEl) return;
  headerEl.classList.toggle('header--scrolled', scrolled);
}

/**
 * Updates the theme button icon/label after the mode cycles.
 * @param {'dark'|'light'|'system'} mode
 */
export function updateThemeButton(mode) {
  if (!themeBtnEl) return;
  themeBtnEl.textContent = ICONS[mode];
  themeBtnEl.title = LABELS[mode];
  themeBtnEl.setAttribute('aria-label', `Alternar tema (atual: ${LABELS[mode]})`);
}

/**
 * Appends the bottom rule and (optionally) the nav strip element to the header.
 * @param {HTMLElement} navEl
 */
export function attachHeaderNav(navEl) {
  if (!headerEl) return;
  headerEl.appendChild(navEl);
  headerEl.appendChild(el('div', { className: 'header__rule', 'aria-hidden': 'true' }));
}
