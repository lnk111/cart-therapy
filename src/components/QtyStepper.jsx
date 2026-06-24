import { useState } from 'react';
export default function QtyStepper({ value = 1, onChange }) {
  const [qty, setQty] = useState(value);
  const update = (n) => { setQty(n); onChange?.(n); };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
      <button type="button" onClick={() => update(Math.max(1, qty - 1))}
        style={{ width: 30, height: 30, border: 'none', background: 'transparent', color: '#64748b', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
      <span style={{ minWidth: 28, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{qty}</span>
      <button type="button" onClick={() => update(qty + 1)}
        style={{ width: 30, height: 30, border: 'none', background: 'transparent', color: '#0f172a', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
    </div>
  );
}
