/* RedBoi — compact one-line row used by drinks, beers, sides, etc. */

import { el } from '../dom.js';
import { formatPrice } from '../menu-data.js';
import { renderBadge } from './badge.js';

/**
 * Renders a single-row compact menu item.
 * @param {Object} item
 * @param {number} idx
 * @returns {HTMLElement}
 */
export function renderCompactRow(item, idx) {
  const badge = renderBadge(item);
  const tag = item.tag
    ? el('span', {
        className: item.badge ? 'chip-tag chip-tag--inline' : 'chip-tag',
      }, item.tag)
    : null;

  const nameClass = (item.badge || item.tag)
    ? 'compact-row__name compact-row__name--with-badge'
    : 'compact-row__name';

  return el('article', {
    className: 'compact-row is-animated--compact',
    style: { '--idx': String(idx) },
  },
    el('div', { className: 'compact-row__body' },
      badge,
      tag,
      el('div', { className: nameClass }, item.name),
      item.desc ? el('div', { className: 'compact-row__desc' }, item.desc) : null
    ),
    el('div', { className: 'compact-row__price' },
      el('span', { className: 'compact-row__price-currency' }, 'R$ '),
      el('span', { className: 'compact-row__price-value' }, formatPrice(item.price))
    )
  );
}
