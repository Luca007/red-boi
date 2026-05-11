import { RED, GOLD } from '../data/constants.js';

export default function Badge({ item }) {
  if (!item.badge) return null;
  const bg = item.badgeRed
    ? RED
    : item.badgeGreen
    ? '#1E6B3A'
    : item.badgeBlue
    ? '#1A4A7A'
    : item.badgePurple
    ? '#5A2A7A'
    : GOLD;
  return (
    <span
      style={{
        background: bg,
        color: '#fff',
        fontSize: 10,
        fontWeight: 700,
        padding: '3px 9px',
        borderRadius: 4,
        letterSpacing: '.8px',
        fontFamily: "'DM Sans',sans-serif",
        display: 'inline-block',
        textTransform: 'uppercase',
        marginBottom: 7,
      }}
    >
      {item.badge}
    </span>
  );
}
