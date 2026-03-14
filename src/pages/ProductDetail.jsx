import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Loading from '../components/Loading'
import { getProductById } from '../services/api'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProduct = async () => {
      setIsLoading(true)
      setError('')

      try {
        const data = await getProductById(id)
        if (isMounted) {
          setProduct(data)
        }
      } catch (err) {
        if (isMounted) {
          setError('Produk tidak ditemukan atau gagal dimuat.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()
    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return <Loading text="Memuat detail produk..." />
  }

  if (error) {
    return <p style={{ color: '#dc2626' }}>{error}</p>
  }

  if (!product) {
    return <p>Produk tidak tersedia.</p>
  }

  return (
    <section style={{ display: 'grid', gap: '1.5rem' }}>
      <Link to="/" style={{ color: '#1d4ed8' }}>
        {'<- Kembali ke Home'}
      </Link>

      <div className="detail-layout">
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            maxWidth: '350px',
            background: '#fff',
            borderRadius: '10px',
            padding: '1rem',
            border: '1px solid #e2e8f0',
          }}
        />

        <div>
          <h2 style={{ marginTop: 0 }}>{product.title}</h2>
          <p style={{ color: '#64748b', textTransform: 'capitalize' }}>{product.category}</p>
          <p style={{ lineHeight: 1.6 }}>{product.description}</p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ea580c' }}>
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addItem(product)}
            style={{
              padding: '0.7rem 1.1rem',
              border: 'none',
              borderRadius: '8px',
              background: '#16a34a',
              color: '#fff',
            }}
          >
            + Tambah ke Keranjang
          </button>
        </div>
      </div>
    </section>
  )
}
