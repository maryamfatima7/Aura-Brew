import { useState } from 'react'
import { Heart, Plus, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { categories, products } from '../data/products'
import { useApp } from '../context/AppContext'

export default function MenuPage() {
  const [category, setCategory] = useState('All')
  const { addToCart, favorites, toggleFavorite, showToast } = useApp()
  const visible = category === 'All' ? products : products.filter((product) => product.category === category)
  const add = (product) => { addToCart(product); showToast(`${product.name} added to your cart.`) }
  return <section className="menu-page page-section"><div className="menu-header"><div><p className="eyebrow">A considered selection</p><h1 className="page-title">OUR MENU</h1><p className="menu-subtitle">Something for every kind of coffee moment.</p></div><span className="menu-count">{visible.length} / {products.length} pours</span></div><div className="category-tabs" role="tablist">{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="menu-grid">{visible.map((product, index) => <motion.article layout className="menu-card" key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .04 }}><Link to={`/product/${product.id}`} className="menu-visual" style={{ '--accent': product.accent }}><span>0{index + 1}</span><div className="visual-cup" /></Link><div className="menu-card-copy"><div><p className="eyebrow">{product.category}</p><h2>{product.name}</h2><p>{product.description}</p></div><button aria-label={`${favorites.includes(product.id) ? 'Remove' : 'Add'} ${product.name} favorite`} className={`favorite-button ${favorites.includes(product.id) ? 'is-favorite' : ''}`} onClick={() => { toggleFavorite(product.id); showToast(favorites.includes(product.id) ? 'Removed from favorites.' : 'Added to favorites.') }}><Heart size={16} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button></div><div className="menu-card-bottom"><strong>${product.price.toFixed(2)}</strong><button className="add-button" onClick={() => add(product)} aria-label={`Add ${product.name} to cart`}><Plus size={17} /></button></div><Link className="card-detail-link" to={`/product/${product.id}`}>View details <ArrowUpRight size={14} /></Link></motion.article>)}</div>{visible.length === 0 && <p className="empty-copy">No coffee found.</p>}</section>
}
