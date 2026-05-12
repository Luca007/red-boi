/* RedBoi — footer: logo, handle, disclaimer, Google review CTA */

import { el } from '../dom.js';
import { renderReviewCta } from './review-cta.js';

/**
 * Renders the footer with logo, handle, disclaimer, and review CTA.
 * @returns {HTMLElement}
 */
export function renderFooter() {
  return el('footer', { className: 'footer' },
    el('div', { className: 'footer__top' },
      el('img', {
        className: 'footer__logo',
        src: './logo.png',
        alt: 'Red Boi Gastrobar',
        width: '120',
        height: '132',
        loading: 'lazy',
        decoding: 'async',
      }),
      el('p', { className: 'footer__handle' }, '📸 @redboigastrobar'),
      el('p', { className: 'footer__note' },
        'Preços em R$ · Sujeitos a alteração sem aviso prévio')
    ),
    el('div', { className: 'footer__divider', 'aria-hidden': 'true' }),
    el('div', { className: 'footer__cta-block' },
      el('div', { className: 'footer__cta-head' },
        el('div', { className: 'footer__cta-title' }, '⭐ Gostou do Red Boi?'),
        el('p', { className: 'footer__cta-sub' },
          'Compartilhe sua experiência no Google. Sua avaliação ajuda outras pessoas a descobrirem o gastrobar.')
      ),
      renderReviewCta()
    )
  );
}
