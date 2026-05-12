/* RedBoi — Google review CTA button (replaces the suggestion form) */

import { el } from '../dom.js';

const REVIEW_URL = 'https://share.google/BV05MI8sDckItEi6r';

/**
 * Renders the "Avaliar no Google" call-to-action.
 * @returns {HTMLAnchorElement}
 */
export function renderReviewCta() {
  return el('a', {
    className: 'review-cta',
    href: REVIEW_URL,
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': 'Avaliar Red Boi Gastrobar no Google (abre em nova aba)',
  },
    el('span', { className: 'review-cta__stars', 'aria-hidden': 'true' }, '★★★★★'),
    el('span', { className: 'review-cta__label' }, 'Avaliar no Google'),
    el('span', { className: 'review-cta__arrow', 'aria-hidden': 'true' }, '↗')
  );
}
