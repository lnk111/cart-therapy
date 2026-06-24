import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { krw } from '../lib/format.js'
import StatusBar from '../components/StatusBar.jsx'

const DARK = '#0b1220'

export default function Complete() {
  const navigate = useNavigate()
  const location = useLocation()
  const amount = location.state?.amount

  useEffect(() => {
    if (amount == null) navigate('/', { replace: true })
  }, [amount, navigate])

  useEffect(() => {
    if (amount == null) return
    confetti({ particleCount: 160, spread: 95, origin: { y: 0.55 } })
    const end = Date.now() + 1600
    let raf
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } })
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } })
      if (Date.now() < end) raf = requestAnimationFrame(frame)
    }
    frame()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      confetti.reset()
    }
  }, [amount])

  if (amount == null) return null

  return (
    <div
      style={{
        minHeight: '100svh',
        background: DARK,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StatusBar dark />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 28px',
        }}
      >
        <div style={{ position: 'relative', marginBottom: 30 }}>
          <span style={{ position: 'absolute', left: -52, top: 6, color: '#ef4444', fontSize: 18, fontWeight: 700 }}>
            짝
          </span>
          <span style={{ fontSize: 64 }}>👏</span>
          <span style={{ position: 'absolute', right: -50, top: 6, fontSize: 18, fontWeight: 700, color: '#fff' }}>
            짝
          </span>
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 800 }}>축하해요! 🎉</h1>
        <p style={{ fontSize: 15, color: '#94a3b8', marginTop: 10 }}>
          오늘 당신은 충동을 이겼어요
        </p>

        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 28 }}>
          {krw(amount)}
        </div>
        <p style={{ fontSize: 15, color: '#94a3b8', marginTop: 8 }}>
          을 현명하게 참았어요
        </p>
      </div>

      <div style={{ padding: '0 24px 40px' }}>
        <button
          type="button"
          onClick={() => navigate('/mood')}
          style={{
            width: '100%',
            height: 54,
            borderRadius: 12,
            border: 'none',
            background: '#fff',
            color: '#0f172a',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          기분 체크하기
        </button>
      </div>
    </div>
  )
}
