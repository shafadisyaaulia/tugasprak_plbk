import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import Loading from '../components/Loading'
import { getProducts } from '../services/api'

export default function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadProducts = async () => {
      try {
        const data = await getProducts()
        if (isMounted) {
          setProducts(data)
        }
      } catch (err) {
        if (isMounted) {
          setError('Gagal mengambil data produk.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()
    return () => {
      isMounted = false
    }
  }, [])

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return products
    }

    return products.filter((product) => product.title.toLowerCase().includes(query))
  }, [products, searchQuery])

  return (
    <section>
      <div className="home-hero">
        <p className="hero-eyebrow">CBSE Praktikum Storefront</p>
        <h2>Belanja Cepat, Komponen Reusable, dan UX yang Jelas</h2>
        <p>
          Jelajahi produk, cari nama barang dengan cepat, lalu tambahkan ke keranjang dengan
          notifikasi real-time.
        </p>
      </div>

      <h2 style={{ marginBottom: '0.8rem' }}>Daftar Produk</h2>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {isLoading && <Loading text="Memuat produk..." />}
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {!isLoading && !error && (
        <>
          <p style={{ color: '#64748b', marginTop: 0 }}>
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
