export default function Badge({ variant = 'default', label = 'Badge' }) {
  const variants = {
    default:     { background: '#0f172a', color: '#f8fafc', border: '1px solid transparent' },
    secondary:   { background: '#f1f5f9', color: '#0f172a', border: '1px solid transparent' },
    destructive: { background: '#ef4444', color: '#fff',    border: '1px solid transparent' },
    outline:     { background: 'transparent', color: '#0f172a', border: '1px solid #e2e8f0' },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '3px 8px', borderRadius: 9999,
      fontSize: 11, fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap',
      ...variants[variant],
    }}>{label}</span>
  );
}
