/* RedBoi — scroll spy + nav auto-center with drag pause */

import {
  SCROLL_TO_OFFSET,
  SCROLL_SPY_OFFSET,
  NAV_DRAG_PAUSE_MS,
  NAV_AUTOCENTER_DURATION_MS,
} from '../constants.js';

/**
 * Sets up scroll tracking and nav-strip auto-centering.
 * @param {{
 *   sectionEls: Map<string, HTMLElement>,
 *   navStripEl: HTMLElement,
 *   onActiveChange: (id: string) => void
 * }} params
 * @returns {{ destroy: () => void, getActiveId: () => string, isProgScroll: () => boolean }}
 */
export function initScrollSpy({ sectionEls, navStripEl, onActiveChange }) {
  const ids = Array.from(sectionEls.keys());
  let activeId = ids[0];
  let isProgScroll = false;
  let userDragging = false;
  let dragTimer = null;
  let autoTimer = null;

  function recompute() {
    let current = ids[0];
    for (const id of ids) {
      const node = sectionEls.get(id);
      if (node && node.getBoundingClientRect().top <= SCROLL_SPY_OFFSET) current = id;
    }
    if (current !== activeId) {
      activeId = current;
      onActiveChange(activeId);
      centerActivePill();
    }
  }

  function centerActivePill() {
    if (userDragging) return;
    const pill = navStripEl.querySelector(`[data-id="${activeId}"]`);
    if (!pill) return;
    const target = pill.offsetLeft - navStripEl.offsetWidth / 2 + pill.offsetWidth / 2;
    isProgScroll = true;
    navStripEl.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      isProgScroll = false;
    }, NAV_AUTOCENTER_DURATION_MS);
  }

  function onNavScroll() {
    if (isProgScroll) return;
    userDragging = true;
    clearTimeout(dragTimer);
    dragTimer = setTimeout(() => {
      userDragging = false;
    }, NAV_DRAG_PAUSE_MS);
  }

  const onWindowScroll = () => recompute();

  navStripEl.addEventListener('scroll', onNavScroll, { passive: true });
  window.addEventListener('scroll', onWindowScroll, { passive: true });

  onActiveChange(activeId);
  centerActivePill();

  return {
    destroy() {
      navStripEl.removeEventListener('scroll', onNavScroll);
      window.removeEventListener('scroll', onWindowScroll);
      clearTimeout(dragTimer);
      clearTimeout(autoTimer);
    },
    getActiveId: () => activeId,
    isProgScroll: () => isProgScroll,
  };
}

/**
 * Smooth-scrolls the page so the given section is just below the sticky header.
 * @param {string} id
 * @param {Map<string, HTMLElement>} sectionEls
 */
export function scrollToSection(id, sectionEls) {
  const node = sectionEls.get(id);
  if (!node) return;
  const top = node.getBoundingClientRect().top + window.scrollY - SCROLL_TO_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}
