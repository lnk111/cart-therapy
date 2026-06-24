// Shared SVG icons. All accept { size, color, strokeWidth } and use currentColor
// by default so they inherit text color.

const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
})

const stroke = (color, w) => ({
  stroke: color,
  strokeWidth: w,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

export function IconSearch({ size = 22, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <circle cx="11" cy="11" r="7" {...stroke(color, strokeWidth)} />
      <path d="m21 21-4.3-4.3" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconBell({ size = 22, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        {...stroke(color, strokeWidth)}
      />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconHome({ size = 24, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <path d="M3 10.5 12 3l9 7.5" {...stroke(color, strokeWidth)} />
      <path d="M5 9.5V20h14V9.5" {...stroke(color, strokeWidth)} />
      <path d="M9.5 20v-5h5v5" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconGrid({ size = 24, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" {...stroke(color, strokeWidth)} />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" {...stroke(color, strokeWidth)} />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" {...stroke(color, strokeWidth)} />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconCart({ size = 24, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <circle cx="9" cy="20" r="1.4" fill={color} />
      <circle cx="18" cy="20" r="1.4" fill={color} />
      <path
        d="M2.5 3h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21 6H6"
        {...stroke(color, strokeWidth)}
      />
    </svg>
  )
}

export function IconUser({ size = 24, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="8" r="4" {...stroke(color, strokeWidth)} />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconHeart({ size = 22, color = 'currentColor', strokeWidth = 2, filled = false }) {
  return (
    <svg {...base(size)}>
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"
        fill={filled ? color : 'none'}
        {...stroke(color, strokeWidth)}
      />
    </svg>
  )
}

export function IconShare({ size = 20, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <circle cx="18" cy="5" r="2.5" {...stroke(color, strokeWidth)} />
      <circle cx="6" cy="12" r="2.5" {...stroke(color, strokeWidth)} />
      <circle cx="18" cy="19" r="2.5" {...stroke(color, strokeWidth)} />
      <path d="m8.2 10.7 7.6-4.4M8.2 13.3l7.6 4.4" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconChevronLeft({ size = 24, color = 'currentColor', strokeWidth = 2.2 }) {
  return (
    <svg {...base(size)}>
      <path d="m15 5-7 7 7 7" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconSort({ size = 16, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <path d="M4 6h16M6 12h12M9 18h6" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconLock({ size = 14, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <rect x="4.5" y="10" width="15" height="10" rx="2" {...stroke(color, strokeWidth)} />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" {...stroke(color, strokeWidth)} />
    </svg>
  )
}

export function IconSparkle({ size = 16, color = 'currentColor' }) {
  return (
    <svg {...base(size)}>
      <path
        d="M12 2.5c.7 4.6 2.4 6.3 7 7-4.6.7-6.3 2.4-7 7-.7-4.6-2.4-6.3-7-7 4.6-.7 6.3-2.4 7-7Z"
        fill={color}
      />
    </svg>
  )
}

export function IconBag({ size = 24, color = 'currentColor', strokeWidth = 2 }) {
  return (
    <svg {...base(size)}>
      <path d="M5 8h14l-1 12H6L5 8Z" {...stroke(color, strokeWidth)} />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" {...stroke(color, strokeWidth)} />
    </svg>
  )
}
