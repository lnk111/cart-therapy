import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/StatusBar.jsx'
import Button from '../components/Button.jsx'

const OPTIONS = [
  { id: 'better', title: '한결 나아졌어요', sub: '충동이 가라앉았어요', face: 'smile' },
  { id: 'want', title: '아직 사고싶어요', sub: '조금 더 둘러볼래요', face: 'neutral' },
]

export default function MoodCheck() {
  const navigate = useNavigate()
  const [mood, setMood] = useState('better')

  const handleConfirm = () => {
    navigate(mood === 'want' ? '/category' : '/report')
  }

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', paddingBottom: 110 }}>
      <StatusBar />

      <div style={{ padding: '20px 28px 0' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.3 }}>
          지금 기분이<br />좀 나아졌나요?
        </h1>
        <p style={{ fontSize: 15, color: '#94a3b8', marginTop: 12 }}>
          담고 비운 뒤의 마음을 알려주세요
        </p>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
          padding: '0 24px',
        }}
      >
        {OPTIONS.map((o) => {
          const active = mood === o.id
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setMood(o.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '18px 20px',
                borderRadius: 14,
                border: `2px solid ${active ? '#0f172a' : '#eef2f6'}`,
                background: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Face type={o.face} color={active ? '#0f172a' : '#94a3b8'} />
              <span>
                <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: '#0f172a' }}>
                  {o.title}
                </span>
                <span style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginTop: 3 }}>
                  {o.sub}
                </span>
              </span>
            </button>
          )
        })}
      </div>

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
          boxSizing: 'border-box',
        }}
      >
        <Button variant="primary" size="lg" full label="확인" onClick={handleConfirm} />
      </div>
    </div>
  )
}

function Face({ type, color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="2" />
      <circle cx="11.5" cy="13.5" r="1.6" fill={color} />
      <circle cx="20.5" cy="13.5" r="1.6" fill={color} />
      {type === 'smile' ? (
        <path d="M10.5 19.5c1.4 2 3.3 3 5.5 3s4.1-1 5.5-3" stroke={color} strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M11 20.5h10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  )
}
