import { useEffect, useRef, useState, useCallback } from 'react';
import { SECTIONS } from '../data/menu.js';

export function useActiveSection() {
  const [activeId, setActiveId] = useState('destaques');
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef({});
  const navRef = useRef(null);

  const isProgScroll = useRef(false);
  const userDragging = useRef(false);
  const dragTimer = useRef(null);

  // Auto-center active pill in nav strip
  useEffect(() => {
    if (userDragging.current) return;
    const nav = navRef.current;
    const pill = nav && nav.querySelector(`[data-id="${activeId}"]`);
    if (!nav || !pill) return;
    const target = pill.offsetLeft - nav.offsetWidth / 2 + pill.offsetWidth / 2;
    isProgScroll.current = true;
    nav.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    clearTimeout(dragTimer.current);
    dragTimer.current = setTimeout(() => {
      isProgScroll.current = false;
    }, 550);
  }, [activeId]);

  const onNavScroll = useCallback(() => {
    if (isProgScroll.current) return;
    userDragging.current = true;
    clearTimeout(dragTimer.current);
    dragTimer.current = setTimeout(() => {
      userDragging.current = false;
    }, 1400);
  }, []);

  // Page scroll tracker
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const OFF = 142;
      let cur = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (el && el.getBoundingClientRect().top <= OFF) cur = s.id;
      }
      setActiveId(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 128,
      behavior: 'smooth',
    });
    setActiveId(id);
  }, []);

  return { activeId, scrolled, sectionRefs, navRef, onNavScroll, scrollTo };
}
