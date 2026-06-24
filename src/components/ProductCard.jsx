import { useState } from 'react'
import Badge from './Badge.jsx'
import RatingStars from './RatingStars.jsx'
import { IconHeart } from './Icons.jsx'
import { krw } from '../lib/format.js'

const tints = {
  light: 'radial-gradient(130% 130% at 30% 20%, #f8fafc, #e2e8f0)',
  mid: 'radial-gradient(130% 130% at 30% 20%, #f1f5f9, #cbd5e1)',
  dark: 'radial-gradient(130% 130% at 30% 20%, #e2e8f0, #94a3b8)',
}

export default function ProductCard({
  brand,
  brandUpper,
  name,
  price,
  original,
  discount,
  rating,
  reviews,
  tone = 'mid',
  fav = false,
  showRating = true,
  image,
  onClick,
}) {
  // Show the image when present; if it fails to load, fall back to the
  // gradient + brand-name tile.
  const [imgOk, setImgOk] = useState(true)
  const showImg = image && imgOk

  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
    >
      <div
        style={{
          aspectRatio: '1/1',
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
          background: tints[tone] || tints.mid,
        }}
      >
        {showImg && (
          <img
            src={image}
            alt={name}
            onError={() => setImgOk(false)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
        {discount > 0 && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
            <Badge variant="destructive" label={`-${discount}%`} />
          </div>
        )}
        <span style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
          <IconHeart size={20} color={showImg ? '#fff' : '#94a3b8'} filled={fav} />
        </span>
        {!showImg && (
          <span
            style={{
              position: 'absolute',
              bottom: 14,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: 12,
              letterSpacing: '0.16em',
              fontWeight: 500,
              color: '#64748b',
            }}
          >
            {brandUpper || (brand || '').toUpperCase()}
          </span>
        )}
      </div>

      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 10 }}>{brand}</div>
      <div style={{ fontSize: 14, color: '#0f172a', lineHeight: 1.3, marginTop: 1 }}>
        {name}
      </div>
      {original > 0 && (
        <span
          style={{
            fontSize: 12,
            color: '#cbd5e1',
            textDecoration: 'line-through',
            marginTop: 3,
          }}
        >
          {Number(original).toLocaleString('en-US')}
        </span>
      )}
      <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
        {krw(price)}
      </div>
      {showRating && rating > 0 && (
        <div style={{ marginTop: 6 }}>
          <RatingStars value={rating} count={reviews} showCount />
        </div>
      )}
    </div>
  )
}
