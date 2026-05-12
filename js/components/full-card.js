/* RedBoi — full card with title, description, options, variants, price */

import { el } from '../dom.js';
import { formatPrice } from '../menu-data.js';
import { renderBadge } from './badge.js';

/**
 * Renders a full menu item card.
 * @param {Object} item
 * @param {number} idx
 * @returns {HTMLElement}
 */
export function renderFullCard(item, idx) {
  const isStar = !!item.star;
  const badge = renderBadge(item);
  const tag = item.tag
    ? el('span', {
        className: item.badge ? 'chip-tag chip-tag--inline' : 'chip-tag',
      }, item.tag)
    : null;

  const chips = item.opts
    ? el('div', { className: 'chips' },
        item.opts.map((o) => el('span', { className: 'chip' }, o))
      )
    : null;

  const priceBlock = item.variants
    ? el('div', { className: 'variants' },
        item.variants.map((v) =>
          el('div', { className: 'variant' },
            el('div', { className: 'variant__label' }, v.label),
            el('div', { className: 'variant__price' },
              el('span', { className: 'variant__currency' }, 'R$'),
              el('span', { className: 'variant__value' }, formatPrice(v.price))
            )
          )
        )
      )
    : el('div', { className: 'card__price' },
        el('span', { className: 'card__price-currency' }, 'R$'),
        el('span', {
          className: `card__price-value${isStar ? ' card__price-value--star' : ''}`,
        }, formatPrice(item.price))
      );

  return el('article', {
    className: `card${isStar ? ' card--star' : ''} is-animated`,
    style: { '--idx': String(idx) },
  },
    isStar ? el('div', { className: 'card__star-bar', 'aria-hidden': 'true' }) : null,
    isStar ? el('span', { className: 'card__sparkle', 'aria-hidden': 'true' }, '✦') : null,
    badge,
    tag,
    el('h3', { className: 'card__title' }, item.name),
    item.desc ? el('p', { className: 'card__desc' }, item.desc) : null,
    chips,
    priceBlock
  );
}
