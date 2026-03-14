import { createContext, useContext, useMemo, useReducer, useRef, useState } from 'react'

const initialState = {
  items: [],
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== productId),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [notice, setNotice] = useState('')
  const noticeTimerRef = useRef(null)

  const showNotice = (message) => {
    setNotice(message)
    if (noticeTimerRef.current) {
      clearTimeout(noticeTimerRef.current)
    }

    noticeTimerRef.current = setTimeout(() => {
      setNotice('')
    }, 1800)
  }

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
    showNotice(`"${product.title}" masuk ke keranjang`)
  }

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  )

  const totalPrice = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items],
  )

  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    notice,
    addItem,
    removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', payload: productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    dismissNotice: () => setNotice(''),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
