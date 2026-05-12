/* RedBoi — entry orchestrator: build DOM tree from data and wire interactions */

import { SECTIONS } from './menu-data.js';
import { SCROLLED_THRESHOLD } from './constants.js';
import { initTheme, cycleTheme, getTheme, onSystemChange } from './features/theme.js';
import { initScrollSpy, scrollToSection } from './features/scroll-spy.js';
import { registerSW } from './features/sw-register.js';
import {
  renderHeader,
  setHeaderScrolled,
  updateThemeButton,
  attachHeaderNav,
} from './components/header.js';
import { renderNavPills, setActivePill } from './components/nav-pills.js';
import { renderSection } from './components/section.js';
import { renderFooter } from './components/footer.js';
import { hideSpinner } from './components/spinner.js';
import { el } from './dom.js';

initTheme();

const app = document.getElementById('app');

const header = renderHeader({
  onThemeToggle: () => {
    const state = cycleTheme();
    updateThemeButton(state.mode);
  },
});

const sectionEls = new Map();
for (const sec of SECTIONS) sectionEls.set(sec.id, renderSection(sec));

const nav = renderNavPills({
  sections: SECTIONS,
  onPillClick: (id) => {
    setActivePill(id);
    scrollToSection(id, sectionEls);
  },
});
attachHeaderNav(nav);

const quote = el('div', { className: 'quote' },
  el('p', { className: 'quote__text' }, '"Feito com fogo, servido com paixão"'),
  el('div', { className: 'quote__divider', 'aria-hidden': 'true' })
);

const main = el('main', { className: 'main' });
for (const node of sectionEls.values()) main.appendChild(node);

const comboNote = el('div', { className: 'combo-note' },
  el('span', { className: 'combo-note__lead' }, '🎉 Combos incluem: '),
  '1 bebida + balde com gelo + 4 latas de energético'
);

const footer = renderFooter();

requestAnimationFrame(() => {
  hideSpinner();
  app.appendChild(header);
  app.appendChild(quote);
  app.appendChild(main);
  app.appendChild(comboNote);
  app.appendChild(footer);

  initScrollSpy({ sectionEls, navStripEl: nav, onActiveChange: setActivePill });
});

window.addEventListener('scroll', () => {
  setHeaderScrolled(window.scrollY > SCROLLED_THRESHOLD);
}, { passive: true });

onSystemChange(() => {
  updateThemeButton(getTheme().mode);
});

registerSW();
