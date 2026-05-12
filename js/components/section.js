/* RedBoi — section block: header (icon + title + sub + rule) and items list */

import { el } from '../dom.js';
import { COMPACT_IDS } from '../menu-data.js';
import { renderFullCard } from './full-card.js';
import { renderCompactRow } from './compact-row.js';

/**
 * Renders one menu section.
 * @param {Object} sec
 * @returns {HTMLElement}
 */
export function renderSection(sec) {
  const compact = COMPACT_IDS.has(sec.id);
  return el('section', { id: sec.id, className: 'section' },
    el('div', { className: 'section__head' },
      el('div', { className: 'section__row' },
        el('div', { className: 'section__icon', 'aria-hidden': 'true' }, sec.icon),
        el('div', null,
          el('h2', { className: 'section__title' }, sec.label),
          sec.sub ? el('p', { className: 'section__sub' }, sec.sub) : null
        )
      ),
      el('div', { className: 'section__rule', 'aria-hidden': 'true' })
    ),
    el('div', { className: 'section__list' },
      sec.items.map((item, idx) =>
        compact ? renderCompactRow(item, idx) : renderFullCard(item, idx)
      )
    )
  );
}
