// Faux iOS status bar to match the design mockups (9:41 + signal/wifi/battery).
export default function StatusBar({ dark = false }) {
  const color = dark ? '#ffffff' : '#0f172a'
  return (
    <div
      style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 26px',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 700, color, letterSpacing: '0.02em' }}>
        9:41
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill={color} aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden>
          <path d="M8.5 2.2c2.6 0 5 1 6.8 2.7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8.5 5.6c1.7 0 3.3.7 4.5 1.9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8.5 9.2l1.8-1.8a2.5 2.5 0 0 0-3.6 0L8.5 9.2Z" fill={color} />
        </svg>
        {/* battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" aria-hidden>
          <rect x="0.6" y="0.6" width="22" height="11.8" rx="3" stroke={color} strokeOpacity="0.4" />
          <rect x="2.2" y="2.2" width="18" height="8.6" rx="1.8" fill={color} />
          <rect x="24" y="4" width="1.6" height="5" rx="0.8" fill={color} fillOpacity="0.4" />
        </svg>
      </span>
    </div>
  )
}
