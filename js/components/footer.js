/* RedBoi — footer: logo, handle, disclaimer, suggestion form block */

import { el } from '../dom.js';
import { renderSuggestionForm } from './suggestion-form.js';

/**
 * Renders the footer with logo, handle, disclaimer, and suggestion form.
 * @returns {HTMLElement}
 */
export function renderFooter() {
  const form = renderSuggestionForm();

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
    el('div', { className: 'footer__form-block' },
      el('div', { className: 'footer__form-head' },
        el('div', { className: 'footer__form-title' }, '💬 Sentiu falta de algum item?'),
        el('p', { className: 'footer__form-sub' },
          'Conta pra gente! Toda sugestão é bem-vinda e pode virar o próximo hit da casa.')
      ),
      form.element
    )
  );
}
