import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

const AppContext = createContext(null)

function readCart() {
  const saved = readStorage('aura-brew-cart', [])
  return Array.isArray(saved) ? saved.filter((item) => item?.product?.id).map((item) => ({ ...item, size: item.size || item.product.size || 'Medium', price: Number(item.price || item.product.price || 0), quantity: Math.max(1, Number(item.quantity) || 1) })) : []
}

function readUser() {
  const saved = readStorage('aura-brew-user', null)
  return saved && typeof saved.email === 'string' && typeof saved.name === 'string' ? saved : null
}

function readOrders() {
  const saved = readStorage('aura-brew-orders', [])
  if (!Array.isArray(saved)) return []
  return saved.filter((order) => order && typeof order.id === 'string' && Array.isArray(order.items)).map((order) => {
    const items = order.items.filter((item) => item?.product?.id).map((item) => ({ ...item, size: item.size || item.product.size || 'Medium', price: Number(item.price || item.product.price || 0), quantity: Math.max(1, Number(item.quantity) || 1) }))
    const subtotal = Number(order.subtotal ?? order.total ?? items.reduce((sum, item) => sum + item.price * item.quantity, 0)) || 0
    const tax = Number(order.tax ?? subtotal * .08) || 0
    return { ...order, items, subtotal, tax, total: Number(order.total ?? subtotal + tax) || 0, status: order.status || 'Preparing', createdAt: order.createdAt || new Date().toISOString() }
  })
}

function readFavorites() {
  const saved = readStorage('aura-brew-favorites', [])
  return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : []
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(readUser)
  const [cart, setCart] = useState(readCart)
  const [orders, setOrders] = useState(readOrders)
  const [favorites, setFavorites] = useState(readFavorites)
  const [toast, setToast] = useState('')

  useEffect(() => writeStorage('aura-brew-user', user), [user])
  useEffect(() => writeStorage('aura-brew-cart', cart), [cart])
  useEffect(() => writeStorage('aura-brew-orders', orders), [orders])
  useEffect(() => writeStorage('aura-brew-favorites', favorites), [favorites])

  const addToCart = (product, quantity = 1) => setCart((current) => {
    if (!product?.id || !Number.isFinite(Number(product.price))) return current
    const safeQuantity = Math.max(1, Math.floor(Number(quantity) || 1))
    const cartProduct = { product, size: product.size || 'Medium', price: Number(product.price), quantity: safeQuantity }
    const existing = current.find((item) => item.product.id === product.id && item.size === cartProduct.size)
    if (existing) return current.map((item) => item.product.id === product.id && item.size === cartProduct.size ? { ...item, quantity: item.quantity + quantity } : item)
    return [...current, cartProduct]
  })
  const removeFromCart = (productId, size) => setCart((current) => current.filter((item) => !(item.product.id === productId && (!size || item.size === size))))
  const updateQuantity = (productId, quantity, size) => setCart((current) => current.map((item) => item.product.id === productId && (!size || item.size === size) ? { ...item, quantity: Math.max(1, quantity) } : item))
  const signIn = (email, name = email.split('@')[0]) => setUser({ email, name })
  const signOut = () => setUser(null)
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const dismissToast = () => setToast('')
  const toggleFavorite = (productId) => setFavorites((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId])
  const placeOrder = (details = {}) => {
    if (!cart.length) return null
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const order = { id: `AB-${Date.now().toString().slice(-6)}`, items: cart, subtotal, tax: subtotal * .08, total: subtotal * 1.08, createdAt: new Date().toISOString(), status: 'Preparing', ...details }
    setOrders((current) => [order, ...current]); setCart([]); return order
  }
  const value = useMemo(() => ({ user, cart, orders, favorites, toast, addToCart, removeFromCart, updateQuantity, signIn, signOut, toggleFavorite, placeOrder, showToast, dismissToast }), [user, cart, orders, favorites, toast])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}