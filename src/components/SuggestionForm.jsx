import { useState } from 'react';
import { RED, RED_DK } from '../data/constants.js';

export default function SuggestionForm() {
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  const send = () => {
    if (!text.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setText('');
    }, 3500);
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0', animation: 'rise .4s ease' }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🙏</div>
        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 17,
            color: 'var(--title)',
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Obrigado pela sugestão!
        </p>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 13,
            color: 'var(--subtitle)',
          }}
        >
          Vamos avaliar e quem sabe virar hit da casa!
        </p>
      </div>
    );
  }

  const hasText = !!text.trim();

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ex: sobremesa, drink especial, prato vegetariano..."
        rows={3}
        style={{
          width: '100%',
          background: 'var(--sug-bg)',
          border: '1.5px solid var(--sug-bdr)',
          borderRadius: 14,
          padding: '13px 15px',
          color: 'var(--sug-text)',
          fontSize: 14,
          fontFamily: "'DM Sans',sans-serif",
          resize: 'none',
          outline: 'none',
          marginBottom: 12,
          lineHeight: 1.6,
          transition: 'border-color .2s',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'rgba(200,40,28,0.55)')}
        onBlur={(e) => (e.target.style.borderColor = '')}
      />
      <button
        onClick={send}
        style={{
          width: '100%',
          background: hasText
            ? `linear-gradient(135deg,${RED},${RED_DK})`
            : 'var(--sug-bg)',
          border: hasText ? 'none' : '1.5px solid var(--sug-bdr)',
          color: hasText ? '#fff' : 'var(--subtitle)',
          padding: '14px 0',
          borderRadius: 14,
          fontFamily: "'DM Sans',sans-serif",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '.3px',
          transition: 'all .25s',
          cursor: 'pointer',
          boxShadow: hasText ? '0 4px 18px rgba(200,40,28,0.3)' : 'none',
        }}
      >
        {hasText ? 'Enviar sugestão 🚀' : 'Escreva sua sugestão...'}
      </button>
    </div>
  );
}
