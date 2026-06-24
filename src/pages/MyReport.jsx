import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { krw, krwM } from '../lib/format.js'
import StatusBar from '../components/StatusBar.jsx'
import { IconShare } from '../components/Icons.jsx'

const DAYS = ['월', '화', '수', '목', '금', '토', '일']
const BARS = [40, 65, 30, 80, 55, 95, 50] // demo weekly trend (%)

const tints = {
  light: 'radial-gradient(120% 120% at 35% 25%, #f8fafc, #e2e8f0)',
  mid: 'radial-gradient(120% 120% at 35% 25%, #f1f5f9, #cbd5e1)',
  dark: 'radial-gradient(120% 120% at 35% 25%, #e2e8f0, #94a3b8)',
}

const card = {
  background: '#fff',
  border: '1px solid #eef2f6',
  borderRadius: 16,
  padding: 18,
}

export default function MyReport() {
  const navigate = useNavigate()
  const { savedTotal, resistCount, recentResisted } = useCart()

  const handleShare = () => {
    const text = `Cart Therapy로 지금까지 ${krw(savedTotal)} 아꼈어요!`
    if (navigator.share) {
      navigator.share({ title: 'Cart Therapy', text }).catch(() => {})
    } else {
      alert(text)
    }
  }

  return (
    <div style={{ paddingBottom: 110 }}>
      <StatusBar />

      <div style={{ padding: '6px 20px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>마이 리포트</h1>
      </div>

      <div style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Cumulative savings */}
        <div style={{ background: '#0f172a', color: '#fff', borderRadius: 16, padding: '22px 22px' }}>
          <div style={{ fontSize: 13, color: '#94a3b8' }}>누적 절약 금액</div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', margin: '6px 0 8px' }}>
            {krw(savedTotal)}
          </div>
          <div style={{ fontSize: 14, color: '#cbd5e1' }}>
            이번 달 {resistCount}번 현명하게 참았어요
          </div>
        </div>

        {/* Weekly trend */}
        <section style={card}>
          <h2 style={{ fontSize: 15, fontWeight: 800 }}>주간 절약 추이</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 110, marginTop: 18 }}>
            {BARS.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    width: '100%',
                    height: `${h}%`,
                    borderRadius: 6,
                    background: i === 5 ? '#0f172a' : '#e2e8f0',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            {DAYS.map((d) => (
              <div key={d} style={{ flex: 1, textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
                {d}
              </div>
            ))}
          </div>
        </section>

        {/* Recent resisted */}
        <section style={card}>
          <h2 style={{ fontSize: 15, fontWeight: 800 }}>최근 참은 항목</h2>
          <div style={{ marginTop: 8 }}>
            {recentResisted.length === 0 && (
              <p style={{ fontSize: 14, color: '#94a3b8', padding: '12px 0' }}>
                아직 참은 항목이 없어요.
              </p>
            )}
            {recentResisted.map((it, i) => (
              <div
                key={`${it.name}-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : '1px solid #f1f5f9',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: tints[it.tone] || tints.mid,
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, fontSize: 14, color: '#0f172a' }}>{it.name}</span>
                <span style={{ fontSize: 15, fontWeight: 800 }}>{krwM(it.price)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky actions */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 430,
          maxWidth: '100%',
          background: '#f8f9fa',
          padding: '14px 20px 26px',
          display: 'flex',
          gap: 12,
          boxSizing: 'border-box',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/category')}
          style={{
            flex: 1,
            height: 52,
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            background: '#fff',
            fontSize: 15,
            fontWeight: 700,
            color: '#0f172a',
            cursor: 'pointer',
          }}
        >
          더 둘러보기
        </button>
        <button
          type="button"
          onClick={handleShare}
          style={{
            flex: 1,
            height: 52,
            borderRadius: 12,
            border: 'none',
            background: '#0f172a',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <IconShare size={18} color="#fff" />
          공유하기
        </button>
      </div>
    </div>
  )
}
