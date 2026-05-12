/* RedBoi — colored badge (PREMIUM / PROMO / TOP / etc.) */

import { el } from '../dom.js';

/**
 * Renders the badge for a menu item, if any.
 * @param {Object} item
 * @returns {HTMLElement|null}
 */
export function renderBadge(item) {
  if (!item.badge) return null;
  const variant = item.badgeRed
    ? 'red'
    : item.badgeGreen
    ? 'green'
    : item.badgeBlue
    ? 'blue'
    : item.badgePurple
    ? 'purple'
    : 'gold';
  return el('span', { className: `badge badge--${variant}` }, item.badge);
}
