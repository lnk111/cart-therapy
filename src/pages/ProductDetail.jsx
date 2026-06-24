import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { krw } from '../lib/format.js'
import StatusBar from '../components/StatusBar.jsx'
import Button from '../components/Button.jsx'
import {
  IconChevronLeft,
  IconShare,
  IconHeart,
  IconSparkle,
} from '../components/Icons.jsx'

const tints = {
  light: 'radial-gradient(120% 120% at 35% 25%, #f8fafc, #dde3ea)',
  mid: 'radial-gradient(120% 120% at 35% 25%, #f1f5f9, #cbd5e1)',
  dark: 'radial-gradient(120% 120% at 35% 25%, #e2e8f0, #94a3b8)',
}

const circleBtn = {
  width: 40,
  height: 40,
  borderRadius: 9999,
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(4px)',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

export default function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const product = getProductById(productId)

  if (!product) {
    return (
      <div style={{ padding: 24 }}>
        <StatusBar />
        <h1 style={{ fontSize: 20 }}>상품을 찾을 수 없어요</h1>
        <Link to="/category" style={{ color: '#64748b' }}>← 카테고리로</Link>
      </div>
    )
  }

  const handleAdd = () => {
    add(product, 1)
    navigate('/cart')
  }

  return (
    <div style={{ paddingBottom: 96 }}>
      {/* Image area */}
      <div
        style={{
          position: 'relative',
          background: tints[product.tone] || tints.mid,
          aspectRatio: '1 / 1',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <StatusBar />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 52,
            left: 16,
            right: 16,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button type="button" onClick={() => navigate(-1)} style={circleBtn}>
            <IconChevronLeft size={22} color="#0f172a" />
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" style={circleBtn}>
              <IconShare size={19} color="#0f172a" />
            </button>
            <button type="button" style={circleBtn}>
              <IconHeart size={20} color="#0f172a" />
            </button>
          </div>
        </div>
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            textAlign: 'center',
            fontSize: 18,
            letterSpacing: '0.22em',
            fontWeight: 500,
            color: '#64748b',
          }}
        >
          {product.brandUpper}
        </span>
        <div
          style={{
            position: 'absolute',
            bottom: 22,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: i === 0 ? 18 : 6,
                height: 6,
                borderRadius: 9999,
                background: i === 0 ? '#0f172a' : '#cbd5e1',
              }}
            />
          ))}
        </div>
      </div>

      {/* Detail sheet */}
      <div
        style={{
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          marginTop: -20,
          position: 'relative',
          padding: '24px 20px 0',
        }}
      >
        <div style={{ fontSize: 12, color: '#94a3b8', letterSpacing: '0.04em' }}>
          {product.brandUpper} · {product.brand}
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginTop: 6, lineHeight: 1.3 }}>
          {product.name}
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 10,
            fontSize: 13,
            color: '#334155',
          }}
        >
          <span style={{ color: '#0f172a' }}>★</span>
          <span style={{ fontWeight: 700 }}>{product.rating.toFixed(1)}</span>
          <span style={{ color: '#94a3b8' }}>
            리뷰 {product.reviews.toLocaleString('en-US')}개
          </span>
        </div>

        <div style={{ marginTop: 16 }}>
          {product.discount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#ef4444' }}>
                {product.discount}%
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: '#cbd5e1',
                  textDecoration: 'line-through',
                }}
              >
                {Number(product.original).toLocaleString('en-US')}
              </span>
            </div>
          )}
          <div style={{ fontSize: 30, fontWeight: 800, marginTop: 4 }}>
            {krw(product.price)}
          </div>
        </div>

        {/* Savings highlight */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 16,
            padding: '14px 16px',
            background: '#eef2f7',
            borderRadius: 12,
            fontSize: 14,
            color: '#334155',
            fontWeight: 600,
          }}
        >
          <IconSparkle size={16} color="#0f172a" />
          담으면 <strong>{krw(product.price)}</strong> 절약돼요
        </div>

        <div style={{ height: 1, background: '#eef2f6', margin: '24px 0' }} />

        {/* Product info */}
        <h2 style={{ fontSize: 16, fontWeight: 800 }}>상품 정보</h2>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {product.specs.map(([label, value]) => (
            <div key={label} style={{ display: 'flex', fontSize: 14 }}>
              <span style={{ width: 80, color: '#94a3b8' }}>{label}</span>
              <span style={{ color: '#0f172a' }}>{value}</span>
            </div>
          ))}
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
          display: 'flex',
          gap: 12,
          boxSizing: 'border-box',
        }}
      >
        <button
          type="button"
          style={{
            width: 54,
            height: 50,
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            background: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <IconHeart size={22} color="#0f172a" />
        </button>
        <div style={{ flex: 1 }}>
          <Button variant="primary" size="lg" full label="장바구니 담기" onClick={handleAdd} />
        </div>
      </div>
    </div>
  )
}
