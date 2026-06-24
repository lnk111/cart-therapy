// Currency helpers (KRW).
export const krw = (n) => '₩' + Number(n || 0).toLocaleString('en-US')

// Compact millions: 12400000 -> "₩12.4M"
export const krwM = (n) => '₩' + (Number(n || 0) / 1_000_000).toFixed(1) + 'M'
