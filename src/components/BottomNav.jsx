import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { IconHome, IconGrid, IconCart, IconUser } from './Icons.jsx'

const TABS = [
  { key: 'home', label: '홈', to: '/', Icon: IconHome, match: (p) => p === '/' },
  {
    key: 'cat',
    label: '카테고리',
    to: '/category',
    Icon: IconGrid,
    match: (p) => p.startsWith('/category'),
  },
  {
    key: 'cart',
    label: '장바구니',
    to: '/cart',
    Icon: IconCart,
    match: (p) => p === '/cart',
    badge: true,
  },
  { key: 'my', label: '마이', to: '/report', Icon: IconUser, match: (p) => p === '/report' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { count } = useCart()

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 430,
        maxWidth: '100%',
        background: '#ffffff',
        borderTop: '1px solid #eef2f6',
        display: 'flex',
        padding: '10px 0 26px',
        zIndex: 30,
      }}
    >
      {TABS.map((t) => {
        const active = t.match(pathname)
        const color = active ? '#0f172a' : '#94a3b8'
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => navigate(t.to)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
              color,
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <t.Icon size={24} color={color} />
              {t.badge && count > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -8,
                    minWidth: 17,
                    height: 17,
                    padding: '0 4px',
                    borderRadius: 9999,
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  {count}
                </span>
              )}
            </span>
            <span style={{ fontSize: 11, fontWeight: active ? 700 : 500 }}>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
