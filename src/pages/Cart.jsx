import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <section>
        <h2>Keranjang Belanja</h2>
        <p>Keranjang masih kosong.</p>
        <Link to="/" style={{ color: '#1d4ed8' }}>
          Kembali belanja
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h2>Keranjang Belanja</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={updateQuantity}
            onDecrease={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button
          onClick={clearCart}
          style={{
            marginTop: '0.4rem',
            padding: '0.6rem 1rem',
            border: 'none',
            borderRadius: '8px',
            background: '#dc2626',
            color: '#fff',
          }}
        >
          Kosongkan Keranjang
        </button>
      </div>
    </section>
  )
}
