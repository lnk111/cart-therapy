import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { krw } from '../lib/format.js'
import StatusBar from '../components/StatusBar.jsx'
import Button from '../components/Button.jsx'
import { IconChevronLeft, IconLock } from '../components/Icons.jsx'

const tints = {
  light: 'radial-gradient(120% 120% at 35% 25%, #f8fafc, #e2e8f0)',
  mid: 'radial-gradient(120% 120% at 35% 25%, #f1f5f9, #cbd5e1)',
  dark: 'radial-gradient(120% 120% at 35% 25%, #e2e8f0, #94a3b8)',
}

const card = {
  background: '#fff',
  border: '1px solid #eef2f6',
  borderRadius: 14,
  padding: 18,
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, total, count, addSavings, clear } = useCart()
  const [pay, setPay] = useState('card')

  const handleConfirm = () => {
    if (total <= 0) return
    const amount = total
    addSavings(amount, items)
    clear()
    navigate('/complete', { state: { amount } })
  }

  return (
    <div style={{ paddingBottom: 110 }}>
      <StatusBar />

      <header style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 16px 14px' }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}
        >
          <IconChevronLeft size={26} color="#0f172a" />
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>주문 / 결제</h1>
      </header>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Shipping */}
        <section style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800 }}>배송지</h2>
            <button type="button" style={{ border: 'none', background: 'transparent', fontSize: 13, color: '#94a3b8', cursor: 'pointer' }}>
              변경
            </button>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: '#0f172a', fontWeight: 600 }}>
            김민지 · 010-1234-5678
          </div>
          <div style={{ marginTop: 6, fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>
            서울특별시 강남구 테헤란로 123<br />
            101동 1503호
          </div>
        </section>

        {/* Order items */}
        <section style={card}>
          <h2 style={{ fontSize: 15, fontWeight: 800 }}>주문 상품 {count}건</h2>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {items.map((it) => (
              <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: tints[it.tone] || tints.mid,
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, fontSize: 14, color: '#0f172a' }}>{it.name}</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{krw(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Payment method */}
        <section style={card}>
          <h2 style={{ fontSize: 15, fontWeight: 800 }}>결제 수단</h2>

          <button
            type="button"
            onClick={() => setPay('card')}
            style={{
              width: '100%',
              marginTop: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px 16px',
              borderRadius: 10,
              border: `2px solid ${pay === 'card' ? '#0f172a' : '#e2e8f0'}`,
              background: '#fff',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Radio active={pay === 'card'} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>신용 / 체크카드</span>
          </button>

          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            {[
              { id: 'kakao', label: '카카오페이' },
              { id: 'toss', label: '토스' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPay(m.id)}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  borderRadius: 10,
                  border: `1px solid ${pay === m.id ? '#0f172a' : '#e2e8f0'}`,
                  background: pay === m.id ? '#0f172a' : '#fff',
                  color: pay === m.id ? '#fff' : '#475569',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section style={card}>
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
            <span style={{ fontSize: 16, fontWeight: 800 }}>최종 결제금액</span>
            <span style={{ fontSize: 20, fontWeight: 800 }}>{krw(total)}</span>
          </div>
        </section>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            fontSize: 13,
            color: '#94a3b8',
            padding: '4px 0',
          }}
        >
          <IconLock size={14} color="#94a3b8" />
          실제 결제는 일어나지 않아요
        </div>
      </div>

      {/* Sticky CTA */}
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
          label={`${krw(total)} 결제하기`}
          onClick={handleConfirm}
        />
      </div>
    </div>
  )
}

function Radio({ active }) {
  return (
    <span
      style={{
        width: 22,
        height: 22,
        borderRadius: 9999,
        border: `2px solid ${active ? '#0f172a' : '#cbd5e1'}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {active && (
        <span style={{ width: 11, height: 11, borderRadius: 9999, background: '#0f172a' }} />
      )}
    </span>
  )
}
