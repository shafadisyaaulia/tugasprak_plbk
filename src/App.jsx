import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import { useCart } from './context/CartContext'

function App() {
  const { notice, dismissNotice } = useCart()

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      {notice && (
        <button type="button" className="cart-toast" onClick={dismissNotice}>
          {notice}
        </button>
      )}
    </div>
  )
}

export default App
