import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { categories, getProductsByCategory } from '../data/products.js'
import StatusBar from '../components/StatusBar.jsx'
import BottomNav from '../components/BottomNav.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { IconChevronLeft, IconSearch, IconSort } from '../components/Icons.jsx'

const FILTERS = [
  { label: '추천순', sort: true },
  { label: '가격대' },
  { label: '브랜드' },
]

const PAGE = 12

export default function Category() {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const category = categories.find((c) => c.id === categoryId) || categories[0]
  const list = getProductsByCategory(category.id)

  const [visible, setVisible] = useState(PAGE)
  const sentinelRef = useRef(null)

  // Reset paging whenever the category changes.
  useEffect(() => {
    setVisible(PAGE)
  }, [category.id])

  // Load 12 more each time the sentinel scrolls into view.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + PAGE, list.length))
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [category.id, list.length])

  const shown = list.slice(0, visible)

  return (
    <div style={{ paddingBottom: 96 }}>
      <StatusBar />

      {/* App bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 16px 12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}
          >
            <IconChevronLeft size={26} color="#0f172a" />
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>{category.name}</h1>
        </div>
        <button
          type="button"
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}
        >
          <IconSearch size={23} color="#0f172a" />
        </button>
      </header>

      {/* Filter chips */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: 9,
          padding: '4px 20px 14px',
          overflowX: 'auto',
          borderBottom: '1px solid #eef2f6',
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.label}
            type="button"
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 9999,
              border: '1px solid #e2e8f0',
              background: '#fff',
              fontSize: 13,
              fontWeight: 600,
              color: '#475569',
              cursor: 'pointer',
            }}
          >
            {f.sort && <IconSort size={15} color="#475569" />}
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ padding: '16px 20px 8px', fontSize: 13, color: '#94a3b8' }}>
        총 {category.total.toLocaleString('en-US')}개
      </div>

      {/* Product grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          padding: '0 20px',
        }}
      >
        {shown.map((p) => (
          <ProductCard
            key={p.id}
            {...p}
            showRating
            onClick={() => navigate(`/product/${p.id}`)}
          />
        ))}
      </div>

      {/* Infinite-scroll sentinel */}
      {visible < list.length && (
        <div
          ref={sentinelRef}
          style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: 13 }}
        >
          불러오는 중…
        </div>
      )}

      <BottomNav />
    </div>
  )
}
