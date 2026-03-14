export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        className="search-input"
        type="text"
        placeholder="Cari produk berdasarkan nama..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
