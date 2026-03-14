export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '90px 1fr auto',
        gap: '1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '1rem',
        alignItems: 'center',
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: '90px', height: '90px', objectFit: 'contain' }}
      />
      <div>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>{item.title}</h3>
        <p style={{ margin: '0.4rem 0', color: '#475569' }}>
          ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#dc2626',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Hapus
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button onClick={() => onDecrease(item.id, item.quantity - 1)}>-</button>
        <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id, item.quantity + 1)}>+</button>
      </div>
    </div>
  )
}
