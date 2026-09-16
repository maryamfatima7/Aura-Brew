import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Instagram, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { products } from '../../data/products'
import ToastHost from '../feedback/Toast'

export default function AppLayout() {
  const { cart, user, signOut, showToast } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const results = query.trim() ? products.filter((product) => `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query.toLowerCase())) : []
  const logout = () => { signOut(); showToast('Signed out successfully.') }
  return <div className="min-h-screen bg-ink text-cream"><header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}><Link className="brand" to="/" onClick={closeMenu}>AURA<span>BREW</span></Link><nav className="desktop-nav"><NavLink to="/">Home</NavLink><NavLink to="/menu">Menu</NavLink><a href="/#story">Our story</a><a href="/#contact">Contact</a></nav><div className="header-actions"><button className="icon-button search-button" aria-label="Search" onClick={() => setSearchOpen(true)}><Search size={17} /></button><Link aria-label="Account" className="account-link" to={user ? '/account' : '/login'}>{user ? <span className="user-name">{user.name}</span> : <UserRound size={17} />}</Link>{user && <button className="logout-button" onClick={logout}>Logout</button>}<Link aria-label="Cart" className="cart-link" to="/cart"><ShoppingBag size={17} /><span>{count}</span></Link><button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></header><AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}><NavLink onClick={closeMenu} to="/">Home</NavLink><NavLink onClick={closeMenu} to="/menu">Menu</NavLink><a onClick={closeMenu} href="/#story">Our Story</a><a onClick={closeMenu} href="/#contact">Contact</a><NavLink onClick={closeMenu} to={user ? '/account' : '/login'}>Account</NavLink><NavLink onClick={closeMenu} to="/cart">Cart <span>{count}</span></NavLink>{user && <button onClick={() => { closeMenu(); logout() }}>Logout</button>}</motion.div>}</AnimatePresence><AnimatePresence>{searchOpen && <motion.div className="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="search-panel"><button className="search-close" aria-label="Close search" onClick={() => { setSearchOpen(false); setQuery('') }}><X size={18} /></button><p className="eyebrow">Search the menu</p><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try latte, mocha, cold brew..." />{query && <div className="search-results">{results.length ? results.map((product) => <Link key={product.id} onClick={() => setSearchOpen(false)} to={`/product/${product.id}`}><span>{product.name}</span><small>{product.category} · ${product.price.toFixed(2)}</small></Link>) : <p className="muted">No coffee found.</p>}</div>}</div></motion.div>}</AnimatePresence><main><Outlet /></main><Footer /><ToastHost /></div>
}

function Footer() {
  return <footer className="site-footer" id="contact"><div className="footer-brand"><Link className="brand" to="/">AURA<span>BREW</span></Link><p>Crafted slowly.<br />Enjoyed deeply.</p></div><div className="footer-column"><p className="footer-label">Explore</p><Link to="/menu">Menu</Link><a href="/#story">Our Story</a><a href="/#contact">Contact</a><Link to="/account">Account</Link></div><div className="footer-column"><p className="footer-label">Visit</p><p>Mon–Fri<br />7:00 AM — 9:00 PM</p><p>Sat–Sun<br />8:00 AM — 10:00 PM</p></div><div className="footer-column"><p className="footer-label">Find us</p><p>Karachi, Pakistan</p><a href="mailto:hello@aurabrew.com">hello@aurabrew.com</a><div className="social-links"><a aria-label="Instagram" href="https://instagram.com"><Instagram size={16} /></a><a aria-label="X" href="https://x.com">X</a><a aria-label="Facebook" href="https://facebook.com">f</a></div></div><div className="footer-bottom"><span>© 2026 AURA BREW</span><span>Fictional brand / crafted for the web</span></div></footer>
}