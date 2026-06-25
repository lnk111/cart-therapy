import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { krw } from '../lib/format.js'
import StatusBar from '../components/StatusBar.jsx'
import Button from '../components/Button.jsx'
import QtyStepper from '../components/QtyStepper.jsx'
import { IconChevronLeft, IconSparkle } from '../components/Icons.jsx'

const tints = {
  light: 'radial-gradient(120% 120% at 35% 25%, #f8fafc, #e2e8f0)',
  mid: 'radial-gradient(120% 120% at 35% 25%, #f1f5f9, #cbd5e1)',
  dark: 'radial-gradient(120% 120% at 35% 25%, #e2e8f0, #94a3b8)',
}

const card = {
  background: '#fff',
  border: '1px solid #eef2f6',
  borderRadius: 14,
}

// Cart thumbnail: show the stored product image, falling back to the tinted
// gradient tile (same pattern as ProductCard) when it's missing or fails.
function CartThumb({ image, tone, alt }) {
  const [imgOk, setImgOk] = useState(true)
  const showImg = image && imgOk
  return (
    <span
      style={{
        width: 64,
        height: 64,
        borderRadius: 10,
        overflow: 'hidden',
        background: tints[tone] || tints.mid,
        flexShrink: 0,
      }}
    >
      {showImg && (
        <img
          src={image}
          alt={alt}
          onError={() => setImgOk(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
    </span>
  )
}

export default function Cart() {
  const navigate = useNavigate()
  const { items, update, remove, total, count } = useCart()

  return (
    <div style={{ paddingBottom: 120 }}>
      <StatusBar />

      <header style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px 14px' }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}
        >
          <IconChevronLeft size={26} color="#0f172a" />
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>
          장바구니 <span style={{ color: '#0f172a' }}>{count}</span>
        </h1>
      </header>

      {items.length === 0 ? (
        <div style={{ padding: '90px 24px', textAlign: 'center', color: '#94a3b8' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
          <p style={{ fontSize: 15 }}>아직 담은 게 없어요.</p>
          <div style={{ marginTop: 18 }}>
            <Link to="/category" style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
              구경하러 가기 →
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Items */}
          {items.map((it) => (
            <div key={it.id} style={{ ...card, padding: 16, display: 'flex', gap: 14 }}>
              <CartThumb image={it.image} tone={it.tone} alt={it.name} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{it.brand}</div>
                    <div style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.3 }}>{it.name}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    aria-label="삭제"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#cbd5e1',
                      fontSize: 18,
                      lineHeight: 1,
                      cursor: 'pointer',
                      flexShrink: 0,
                      padding: 0,
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <QtyStepper value={it.qty} onChange={(n) => update(it.id, n)} />
                  <span style={{ fontSize: 16, fontWeight: 800 }}>{krw(it.price * it.qty)}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div style={{ ...card, padding: '18px 18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#64748b' }}>
              <span>상품금액</span>
              <span style={{ color: '#0f172a' }}>{krw(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#64748b', marginTop: 10 }}>
              <span>배송비</span>
              <span style={{ color: '#0f172a' }}>무료</span>
            </div>
            <div style={{ height: 1, background: '#eef2f6', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>합계</span>
              <span style={{ fontSize: 20, fontWeight: 800 }}>{krw(total)}</span>
            </div>
          </div>

          {/* Savings highlight */}
          <div
            style={{
              background: '#0f172a',
              color: '#fff',
              borderRadius: 14,
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <IconSparkle size={20} color="#fff" />
            <div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>주문하면 절약되는 금액</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>{krw(total)}</div>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 430,
            maxWidth: '100%',
            background: '#fff',
            borderTop: '1px solid #eef2f6',
            padding: '14px 20px 26px',
            boxSizing: 'border-box',
          }}
        >
          <Button
            variant="primary"
            size="lg"
            full
            label={`주문하기 · ${krw(total)}`}
            onClick={() => navigate('/checkout')}
          />
        </div>
      )}
    </div>
  )
}
