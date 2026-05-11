import { SECTIONS } from './data/menu.js';
import { THEMES } from './theme/themes.js';
import { useTheme } from './hooks/useTheme.js';
import { useActiveSection } from './hooks/useActiveSection.js';
import Header from './components/Header.jsx';
import Section from './components/Section.jsx';
import Footer from './components/Footer.jsx';

const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

export default function App() {
  const { mode, isDark, cycleTheme } = useTheme();
  const { activeId, scrolled, sectionRefs, navRef, onNavScroll, scrollTo } =
    useActiveSection();

  const T = isDark ? THEMES.dark : THEMES.light;

  return (
    <div
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingBottom: 40,
        transition: 'background .3s',
        ...T,
      }}
    >
      <Header
        mode={mode}
        isDark={isDark}
        cycleTheme={cycleTheme}
        scrolled={scrolled}
        navRef={navRef}
        activeId={activeId}
        onNavScroll={onNavScroll}
        scrollTo={scrollTo}
        logoSrc={LOGO_SRC}
      />

      <div style={{ textAlign: 'center', padding: '26px 20px 4px' }}>
        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--tagline)',
            letterSpacing: '.5px',
            fontStyle: 'italic',
          }}
        >
          "Feito com fogo, servido com paixão"
        </p>
        <div
          style={{
            height: 1,
            margin: '12px auto 0',
            maxWidth: 120,
            background:
              'linear-gradient(90deg,transparent,rgba(180,120,0,0.4),transparent)',
          }}
        />
      </div>

      {SECTIONS.map((sec) => (
        <Section key={sec.id} sec={sec} sectionRefs={sectionRefs} />
      ))}

      <div
        style={{
          margin: '0 14px 24px',
          background: 'var(--combo-bg)',
          border: '1px dashed var(--combo-bdr)',
          borderRadius: 14,
          padding: '14px 16px',
          color: 'var(--combo-text)',
          fontSize: 13,
          fontFamily: "'DM Sans',sans-serif",
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: 'var(--combo-gold)', fontWeight: 700 }}>
          🎉 Combos incluem:
        </span>{' '}
        1 bebida + balde com gelo + 4 latas de energético
      </div>

      <Footer logoSrc={LOGO_SRC} />
    </div>
  );
}
