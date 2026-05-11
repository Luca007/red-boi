import Badge from './Badge.jsx';
import { GOLD, fmt } from '../data/constants.js';

export default function CompactRow({ item, idx }) {
  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1.5px solid var(--card-bdr)',
        borderRadius: 13,
        padding: '13px 15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        animation: `rise .35s ease ${idx * 0.05}s both`,
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ flex: 1 }}>
        <Badge item={item} />
        {item.tag && (
          <span
            style={{
              background: 'rgba(128,80,0,0.10)',
              color: 'var(--card-muted)',
              fontSize: 10,
              padding: '2px 7px',
              borderRadius: 4,
              marginLeft: item.badge ? 6 : 0,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {item.tag}
          </span>
        )}
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--card-text)',
            marginTop: item.badge || item.tag ? 5 : 0,
          }}
        >
          {item.name}
        </div>
        {item.desc && (
          <div
            style={{
              fontSize: 12,
              color: 'var(--card-sub)',
              marginTop: 3,
              lineHeight: 1.5,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {item.desc}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0, textAlign: 'right' }}>
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 11,
            color: 'var(--card-muted)',
          }}
        >
          R${' '}
        </span>
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 22,
            color: GOLD,
            letterSpacing: 1,
          }}
        >
          {fmt(item.price)}
        </span>
      </div>
    </div>
  );
}
