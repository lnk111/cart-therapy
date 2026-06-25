import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, getProductsByCategory } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { krw } from '../lib/format.js'
import StatusBar from '../components/StatusBar.jsx'
import BottomNav from '../components/BottomNav.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Input from '../components/Input.jsx'
import { IconSearch, IconBell, IconBag } from '../components/Icons.jsx'

// "지금 인기": 100 products, drawn evenly across categories.
const POPULAR_QUOTA = {
  luxury: 30,
  appliance: 20,
  furniture: 15,
  clothing: 20,
  food: 15,
}
const popular = Object.entries(POPULAR_QUOTA).flatMap(([cat, n]) =>
  getProductsByCategory(cat).slice(0, n)
)

const INITIAL = 6
const PAGE = 12

export default function Landing() {
  const navigate = useNavigate()
  const { todaySaved } = useCart()

  const [visible, setVisible] = useState(INITIAL)
  const sentinelRef = useRef(null)

  // Load 12 more each time the sentinel scrolls into view.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + PAGE, popular.length))
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const shown = popular.slice(0, visible)

  return (
    <div style={{ paddingBottom: 96 }}>
      <StatusBar />

      {/* App bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 20px 14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: '#0f172a',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconBag size={20} color="#fff" />
          </span>
          <span style={{ fontSize: 20, fontWeight: 700 }}>CartTherapy</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <IconSearch size={23} color="#0f172a" />
          <IconBell size={23} color="#0f172a" />
        </div>
      </header>

      <div style={{ padding: '0 20px' }}>
        {/* Hero card */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#0f172a',
            color: '#fff',
            borderRadius: 16,
            padding: '24px 22px',
          }}
        >
          <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>
            오늘 안 쓴 돈
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', margin: '6px 0 10px' }}>
            {krw(todaySaved)}
          </div>
          <div style={{ fontSize: 14, color: '#cbd5e1' }}>
            마음껏 담아보세요. 여기선 사도 괜찮아요.
          </div>
          <span style={{ position: 'absolute', right: 18, top: 24, opacity: 0.18 }}>
            <IconBag size={120} color="#fff" strokeWidth={1.4} />
          </span>
        </div>

        {/* Search */}
        <div style={{ marginTop: 18 }}>
          <Input search placeholder="사고 싶은 걸 검색해보세요" />
        </div>

        {/* Category chips */}
        <div
          className="no-scrollbar"
          style={{ display: 'flex', gap: 9, marginTop: 18, overflowX: 'auto' }}
        >
          {categories.map((c, i) => {
            const active = i === 0
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => navigate(`/category/${c.id}`)}
                style={{
                  flexShrink: 0,
                  padding: '9px 18px',
                  borderRadius: 9999,
                  border: `1px solid ${active ? '#0f172a' : '#e2e8f0'}`,
                  background: active ? '#0f172a' : '#fff',
                  color: active ? '#fff' : '#475569',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {c.name}
              </button>
            )
          })}
        </div>

        {/* Popular */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginTop: 26,
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>지금 인기</h2>
          <button
            type="button"
            onClick={() => navigate('/category/luxury')}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 13,
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            전체보기
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginTop: 16,
          }}
        >
          {shown.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
              showRating={false}
              onClick={() => navigate(`/product/${p.id}`)}
            />
          ))}
        </div>

        {/* Infinite-scroll sentinel */}
        {visible < popular.length && (
          <div
            ref={sentinelRef}
            style={{
              height: 40,
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#cbd5e1',
              fontSize: 13,
            }}
          >
            불러오는 중…
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
