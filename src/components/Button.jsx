export default function Button({ variant = 'primary', size = 'md', full = false, label = 'Button', onClick, children }) {
  const pad = { sm: '0 12px', md: '0 16px', lg: '0 20px' }[size];
  const h   = { sm: 32, md: 40, lg: 50 }[size];
  const fs  = { sm: 13, md: 14, lg: 15 }[size];
  const variants = {
    primary:     { background: '#0f172a', color: '#f8fafc', border: '1px solid #0f172a' },
    secondary:   { background: '#f1f5f9', color: '#0f172a', border: '1px solid #f1f5f9' },
    outline:     { background: '#fff',    color: '#0f172a', border: '1px solid #e2e8f0' },
    ghost:       { background: 'transparent', color: '#0f172a', border: '1px solid transparent' },
    destructive: { background: '#ef4444', color: '#fff',    border: '1px solid #ef4444' },
  };
  return (
    <button type="button" onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      height: h, padding: pad, borderRadius: 8,
      fontSize: fs, fontWeight: 600, lineHeight: 1,
      cursor: 'pointer', whiteSpace: 'nowrap', boxSizing: 'border-box',
      width: full ? '100%' : 'auto', ...variants[variant],
    }}>{label || children}</button>
  );
}
