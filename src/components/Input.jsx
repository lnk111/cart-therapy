export default function Input({ placeholder = '', search = false, value, onChange }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 8, width: '100%',
      background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8,
      padding: '0 12px', height: 42, boxSizing: 'border-box',
    }}>
      {search && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
      )}
      <input type="text" placeholder={placeholder} value={value} onChange={onChange} style={{
        flex: 1, border: 'none', outline: 'none', background: 'transparent',
        fontSize: 14, color: '#0f172a', minWidth: 0,
      }} />
    </label>
  );
}
