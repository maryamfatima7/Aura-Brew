import { useState } from 'react'
import { ArrowLeft, Heart, Minus, Plus } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../data/products'
import { useApp } from '../context/AppContext'

export default function ProductPage() {
  const product = getProduct(useParams().productId)
  const { addToCart, favorites, toggleFavorite, showToast } = useApp()
  const [size, setSize] = useState('Medium')
  const [quantity, setQuantity] = useState(1)
  if (!product) return <section className="page-section"><p className="eyebrow">404</p><h1 className="page-title">That cup left the bar.</h1><Link className="button button-light" to="/menu">Continue shopping</Link></section>
  const sizePrice = { Small: product.price, Medium: product.price + .75, Large: product.price + 1.25 }
  const add = () => { addToCart({ ...product, size, price: sizePrice[size] }, quantity); showToast(`${product.name} added to your cart.`) }
  return <section className="product-detail page-section"><Link className="back-link" to="/menu"><ArrowLeft size={16} /> Back to menu</Link><div className="product-detail-grid"><div className="product-detail-art" style={{ '--accent': product.accent }}><div className="visual-cup" /></div><div className="product-copy"><div className="detail-title-row"><div><p className="eyebrow">{product.category}</p><h1 className="page-title">{product.name}</h1></div><button aria-label="Toggle favorite" className={`favorite-button large ${favorites.includes(product.id) ? 'is-favorite' : ''}`} onClick={() => { toggleFavorite(product.id); showToast(favorites.includes(product.id) ? 'Removed from favorites.' : 'Added to favorites.') }}><Heart size={20} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button></div><p className="detail-description">{product.description}</p><p className="ingredients"><span>Ingredients</span>{product.ingredients}</p><div className="size-picker"><span className="field-label">Choose a size</span><div>{Object.keys(sizePrice).map((option) => <button className={size === option ? 'active' : ''} key={option} onClick={() => setSize(option)}>{option}<small>${sizePrice[option].toFixed(2)}</small></button>)}</div></div><div className="detail-buy"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div><button className="button button-light" onClick={add}>Add to cart · ${(sizePrice[size] * quantity).toFixed(2)}</button></div><Link className="back-link" to="/menu">Continue shopping</Link></div></div></section>
}
