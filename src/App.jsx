import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { CartProvider } from './context/CartContext.jsx'
import Landing from './pages/Landing.jsx'
import Category from './pages/Category.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Complete from './pages/Complete.jsx'
import MoodCheck from './pages/MoodCheck.jsx'
import MyReport from './pages/MyReport.jsx'

// GitHub Pages serves the app under "/cart-therapy/", so use Vite's BASE_URL
// as the router basename (trailing slash stripped — React Router expects none).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/mood" element={<MoodCheck />} />
          <Route path="/report" element={<MyReport />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
