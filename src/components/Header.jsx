import { RED, GOLD } from '../data/constants.js';
import NavPills from './NavPills.jsx';

const ICONS = { dark: '🌘', light: '☀️', system: '🖥️' };
const LABELS = { dark: 'Escuro', light: 'Claro', system: 'Sistema' };

export default function Header({
  mode,
  isDark,
  cycleTheme,
  scrolled,
  navRef,
  activeId,
  onNavScroll,
  scrollTo,
  logoSrc,
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'linear-gradient(180deg,var(--header) 0%,var(--bg) 100%)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.18)' : 'none',
        transition: 'box-shadow .3s,background .3s',
      }}
    >
      <button className="theme-btn" onClick={cycleTheme} title={LABELS[mode]}>
        {ICONS[mode]}
      </button>

      <div
        style={{
          padding: '12px 18px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(200,134,10,0.2),transparent 70%)',
              position: 'absolute',
              inset: -8,
              zIndex: 0,
            }}
          />
          <img
            src={logoSrc}
            alt="Red Boi Gastrobar"
            width="80"
            height="80"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style={{
              width: 80,
              height: 80,
              objectFit: 'contain',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 4px 14px rgba(200,40,28,0.42))',
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 10,
            letterSpacing: '4px',
            color: isDark ? 'rgba(200,150,60,0.65)' : 'rgba(140,80,0,0.7)',
            textTransform: 'uppercase',
            marginTop: 4,
          }}
        >
          Cardápio Digital
        </div>
      </div>

      <div
        style={{
          height: 1,
          margin: '0 18px',
          background: 'linear-gradient(90deg,transparent,rgba(180,120,0,0.5),transparent)',
        }}
      />

      <NavPills
        navRef={navRef}
        activeId={activeId}
        onNavScroll={onNavScroll}
        scrollTo={scrollTo}
      />

      <div
        style={{ height: 2, background: `linear-gradient(90deg,${RED} 0%,${GOLD} 100%)` }}
      />
    </header>
  );
}
