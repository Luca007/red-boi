import FullCard from './FullCard.jsx';
import CompactRow from './CompactRow.jsx';
import { COMPACT_IDS } from '../data/constants.js';

export default function Section({ sec, sectionRefs }) {
  const compact = COMPACT_IDS.has(sec.id);
  return (
    <div
      ref={(el) => {
        sectionRefs.current[sec.id] = el;
      }}
      style={{ paddingTop: 24, paddingBottom: 8, scrollMarginTop: 138 }}
    >
      <div style={{ margin: '0 14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              flexShrink: 0,
              background: 'var(--sec-icon)',
              border: '1px solid var(--sec-bdr)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            {sec.icon}
          </div>
          <div>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 28,
                letterSpacing: 2,
                color: 'var(--title)',
                lineHeight: 1,
              }}
            >
              {sec.label}
            </h2>
            {sec.sub && (
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 12,
                  color: 'var(--subtitle)',
                  fontStyle: 'italic',
                  marginTop: 2,
                }}
              >
                {sec.sub}
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            height: 2,
            borderRadius: 1,
            background:
              'linear-gradient(90deg,var(--sec-line-a),var(--sec-line-b),transparent)',
          }}
        />
      </div>
      <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sec.items.map((item, idx) =>
          compact ? (
            <CompactRow key={item.name} item={item} idx={idx} />
          ) : (
            <FullCard key={item.name} item={item} idx={idx} />
          )
        )}
      </div>
    </div>
  );
}
