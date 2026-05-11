import Badge from './Badge.jsx';
import { RED, GOLD, fmt } from '../data/constants.js';

export default function FullCard({ item, idx }) {
  const isStar = !!item.star;
  return (
    <div
      style={{
        background: 'var(--card)',
        border: `1.5px solid ${isStar ? 'rgba(180,120,0,0.5)' : 'var(--card-bdr)'}`,
        borderRadius: 18,
        padding: '18px 16px',
        animation: `rise .4s ease ${idx * 0.07}s both`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isStar
          ? '0 0 0 1px rgba(180,120,0,0.18), 0 6px 20px rgba(180,120,0,0.10)'
          : '0 2px 12px rgba(0,0,0,0.07)',
      }}
    >
      {isStar && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg,#B87A00,#C8281C,#D49A18,#B87A00)',
            backgroundSize: '300% 100%',
            animation: 'gshift 4s linear infinite',
          }}
        />
      )}
      {isStar && (
        <span
          style={{
            position: 'absolute',
            top: 8,
            right: 10,
            fontSize: 12,
            color: 'rgba(180,120,0,0.45)',
            animation: 'fsp 3s ease-in-out infinite',
          }}
        >
          ✦
        </span>
      )}
      <Badge item={item} />
      {item.tag && (
        <span
          style={{
            background: 'rgba(128,80,0,0.10)',
            color: 'var(--card-muted)',
            fontSize: 10,
            padding: '3px 8px',
            borderRadius: 4,
            marginLeft: item.badge ? 6 : 0,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {item.tag}
        </span>
      )}
      <h3
        style={{
          fontFamily: "'Playfair Display',serif",
          fontWeight: 700,
          fontSize: 16,
          color: 'var(--card-text)',
          lineHeight: 1.3,
          marginBottom: 6,
        }}
      >
        {item.name}
      </h3>
      {item.desc && (
        <p
          style={{
            fontSize: 13,
            color: 'var(--card-sub)',
            lineHeight: 1.65,
            fontFamily: "'DM Sans',sans-serif",
            marginBottom: 12,
          }}
        >
          {item.desc}
        </p>
      )}
      {item.opts && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {item.opts.map((o) => (
            <span
              key={o}
              style={{
                background: 'var(--chip-bg)',
                border: '1px solid var(--chip-bdr)',
                color: 'var(--chip-text)',
                fontSize: 11,
                padding: '3px 9px',
                borderRadius: 20,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {o}
            </span>
          ))}
        </div>
      )}
      {item.variants ? (
        <div style={{ display: 'flex', gap: 10 }}>
          {item.variants.map((v) => (
            <div
              key={v.label}
              style={{
                flex: 1,
                background: 'var(--var-bg)',
                border: '1px solid var(--var-bdr)',
                borderRadius: 10,
                padding: '10px 12px',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--card-muted)',
                  fontFamily: "'DM Sans',sans-serif",
                  marginBottom: 3,
                }}
              >
                {v.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 11,
                    color: 'var(--card-muted)',
                  }}
                >
                  R$
                </span>
                <span
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 24,
                    color: RED,
                    letterSpacing: 1,
                  }}
                >
                  {fmt(v.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12,
              color: 'var(--card-muted)',
            }}
          >
            R$
          </span>
          <span
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 30,
              color: isStar ? RED : GOLD,
              letterSpacing: 1,
            }}
          >
            {fmt(item.price)}
          </span>
        </div>
      )}
    </div>
  );
}
