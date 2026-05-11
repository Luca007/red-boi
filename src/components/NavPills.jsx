import { SECTIONS } from '../data/menu.js';

export default function NavPills({ navRef, activeId, onNavScroll, scrollTo }) {
  return (
    <div
      ref={navRef}
      className="nav-strip"
      onScroll={onNavScroll}
      style={{ display: 'flex', gap: 7, padding: '8px 14px 10px', cursor: 'grab' }}
    >
      {SECTIONS.map((sec) => (
        <button
          key={sec.id}
          data-id={sec.id}
          className={`pill${activeId === sec.id ? ' on' : ''}`}
          onClick={() => scrollTo(sec.id)}
        >
          <span>{sec.icon}</span>
          <span>{sec.label}</span>
        </button>
      ))}
    </div>
  );
}
