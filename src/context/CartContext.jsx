import { createContext, useContext, useState, useEffect } from 'react'
import { getProductById } from '../data/products.js'

const CartContext = createContext(null)

const KEYS = {
  today: 'cartTherapy.todaySaved',
  total: 'cartTherapy.savedTotal',
  count: 'cartTherapy.resistCount',
  recent: 'cartTherapy.recentResisted',
}

// Demo defaults so the screens match the design on first load.
const DEFAULTS = {
  today: 1240000,
  total: 3680000,
  count: 14,
  recent: [
    { name: '샤넬 클래식 플랩백', price: 12400000, tone: 'mid' },
    { name: '롤렉스 서브마리너', price: 14900000, tone: 'light' },
  ],
}

// Cart starts pre-filled with the two items shown in the mockups
// (₩16,600,000 total). In-memory, so a reload restores the demo state.
// Seed with Chanel 클래식 플랩백 (luxury-4) + Hermès 가든파티 (luxury-10) = ₩16,600,000.
const seedCart = () =>
  [
    { ...getProductById('luxury-4'), qty: 1 },
    { ...getProductById('luxury-10'), qty: 1 },
  ].filter((i) => i.id)

const readNum = (key, fallback) => {
  const raw = localStorage.getItem(key)
  return raw != null ? Number(raw) || 0 : fallback
}
const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(seedCart)

  const [todaySaved, setTodaySaved] = useState(() => readNum(KEYS.today, DEFAULTS.today))
  const [savedTotal, setSavedTotal] = useState(() => readNum(KEYS.total, DEFAULTS.total))
  const [resistCount, setResistCount] = useState(() => readNum(KEYS.count, DEFAULTS.count))
  const [recentResisted, setRecentResisted] = useState(() =>
    readJSON(KEYS.recent, DEFAULTS.recent)
  )

  useEffect(() => localStorage.setItem(KEYS.today, String(todaySaved)), [todaySaved])
  useEffect(() => localStorage.setItem(KEYS.total, String(savedTotal)), [savedTotal])
  useEffect(() => localStorage.setItem(KEYS.count, String(resistCount)), [resistCount])
  useEffect(
    () => localStorage.setItem(KEYS.recent, JSON.stringify(recentResisted)),
    [recentResisted]
  )

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  const update = (id, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    )
  }

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const clear = () => setItems([])

  // Bank a resisted order into the savings stats.
  const addSavings = (amount, banked = []) => {
    setTodaySaved((v) => v + amount)
    setSavedTotal((v) => v + amount)
    setResistCount((v) => v + 1)
    setRecentResisted((prev) =>
      [
        ...banked.map((i) => ({
          name: `${i.brand} ${i.name}`,
          price: i.price * i.qty,
          tone: i.tone,
        })),
        ...prev,
      ].slice(0, 6)
    )
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        update,
        remove,
        clear,
        total,
        count,
        todaySaved,
        savedTotal,
        resistCount,
        recentResisted,
        addSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
