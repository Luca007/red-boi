/* RedBoi — horizontal scrollable nav strip of section pills */

import { el } from '../dom.js';

let stripEl = null;

/**
 * Renders the scrollable nav strip with one pill per section.
 * @param {{ sections: Array, onPillClick: (id:string) => void, onScroll?: () => void }} params
 * @returns {HTMLElement}
 */
export function renderNavPills({ sections, onPillClick, onScroll }) {
  const strip = el('nav', {
    className: 'nav-strip',
    'aria-label': 'Seções do cardápio',
    onScroll: onScroll || null,
  },
    sections.map((sec) =>
      el('button', {
        type: 'button',
        className: 'pill',
        dataset: { id: sec.id },
        onClick: () => onPillClick(sec.id),
      },
        el('span', { 'aria-hidden': 'true' }, sec.icon),
        el('span', null, sec.label)
      )
    )
  );
  stripEl = strip;
  return strip;
}

/**
 * Marks the pill matching the given id as active, removing the marker from others.
 * @param {string} id
 */
export function setActivePill(id) {
  if (!stripEl) return;
  const pills = stripEl.querySelectorAll('.pill');
  pills.forEach((p) => {
    const isActive = p.dataset.id === id;
    p.classList.toggle('pill--active', isActive);
    p.classList.toggle('on', isActive);
    if (isActive) p.setAttribute('aria-current', 'true');
    else p.removeAttribute('aria-current');
  });
}
