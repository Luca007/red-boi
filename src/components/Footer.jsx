import SuggestionForm from './SuggestionForm.jsx';

export default function Footer({ logoSrc }) {
  return (
    <footer
      style={{
        margin: '32px 0 0',
        background: 'linear-gradient(180deg,var(--footer) 0%,var(--bg) 100%)',
        borderTop: '1px solid rgba(180,120,0,0.2)',
        transition: 'background .3s',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '36px 20px 24px',
        }}
      >
        <img
          src={logoSrc}
          alt="Red Boi Gastrobar"
          width="120"
          height="132"
          loading="lazy"
          decoding="async"
          style={{
            width: 120,
            height: 'auto',
            marginBottom: 12,
            filter: 'drop-shadow(0 6px 20px rgba(200,40,28,0.38))',
          }}
        />
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 12,
            color: 'var(--foot-text)',
            letterSpacing: '.5px',
            marginBottom: 4,
          }}
        >
          📸 @redboigastrobar
        </p>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            color: 'var(--foot-muted)',
            lineHeight: 1.8,
            textAlign: 'center',
          }}
        >
          Preços em R$ · Sujeitos a alteração sem aviso prévio
        </p>
      </div>

      <div
        style={{
          height: 1,
          margin: '0 18px',
          background: 'linear-gradient(90deg,transparent,rgba(180,120,0,0.35),transparent)',
        }}
      />

      <div style={{ padding: '28px 18px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 22,
              letterSpacing: 3,
              color: 'var(--title)',
              marginBottom: 6,
            }}
          >
            💬 Sentiu falta de algum item?
          </div>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13,
              color: 'var(--subtitle)',
              lineHeight: 1.65,
              maxWidth: 340,
              margin: '0 auto',
            }}
          >
            Conta pra gente! Toda sugestão é bem-vinda e pode virar o próximo hit da casa.
          </p>
        </div>
        <SuggestionForm />
      </div>
    </footer>
  );
}
