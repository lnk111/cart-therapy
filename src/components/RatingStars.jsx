export default function RatingStars({ value = 4.8, count = 0, showCount = true }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#0f172a">
        <path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z"/>
      </svg>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{Number(value).toFixed(1)}</span>
      {showCount && count > 0 && (
        <span style={{ fontSize: 11, color: '#94a3b8' }}>({count.toLocaleString('en-US')})</span>
      )}
    </div>
  );
}
