export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Cari produk berdasarkan nama..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '0.7rem 0.9rem',
          border: '1px solid #cfd8dc',
          borderRadius: '8px',
          fontSize: '1rem',
        }}
      />
    </div>
  )
}
