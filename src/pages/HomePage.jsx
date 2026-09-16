import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import CoffeeScene from '../components/scene/CoffeeScene'
import Reveal from '../components/motion/Reveal'
import { products } from '../data/products'
import { useApp } from '../context/AppContext'

const reveal = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

export default function HomePage() {
  const { addToCart, showToast } = useApp()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const favorites = products.slice(0, 4)
  const addProduct = (product) => { addToCart(product); showToast(`${product.name} added to your cart.`) }
  const subscribe = (event) => { event.preventDefault(); if (email.trim()) setSubscribed(true) }

  return <div className="home-page">
    <section className="hero home-hero"><div className="hero-copy"><motion.p className="eyebrow" initial="hidden" animate="show" variants={reveal} transition={{ delay: .15 }}>Small batch / slow moments</motion.p><motion.h1 initial="hidden" animate="show" variants={reveal} transition={{ delay: .28, duration: .9 }}>COFFEE,<br /><em>REIMAGINED.</em></motion.h1><motion.p className="hero-description" initial="hidden" animate="show" variants={reveal} transition={{ delay: .48 }}>Small-batch coffee crafted for slow mornings, late nights, and everything between.</motion.p><motion.div className="hero-actions" initial="hidden" animate="show" variants={reveal} transition={{ delay: .62 }}><Link className="button button-light" to="/menu">Explore menu <ArrowUpRight size={15} /></Link><Link className="text-link" to="/menu">Order coffee <span>↗</span></Link></motion.div></div><motion.div className="hero-scene-wrap" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, .3, 1] }}><CoffeeScene /></motion.div><div className="hero-meta"><span>Est. 2024</span><span>Karachi / Pakistan</span></div><motion.a className="scroll-cue" href="#intro" animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}><span>Scroll to discover</span><ArrowDown size={14} /></motion.a></section>

    <section className="intro-section content-band" id="intro"><Reveal className="intro-number"><span>01</span><i /></Reveal><Reveal className="intro-heading"><p className="eyebrow">A different kind of coffee house</p><h2>WE BELIEVE COFFEE<br />SHOULD FEEL LIKE<br /><em>A RITUAL.</em></h2></Reveal><Reveal className="intro-copy" delay={.15}><p>There is a quiet alchemy in taking something ordinary and giving it your full attention. AURA BREW is a space for that feeling: thoughtful beans, patient hands, and a little more time in the day.</p><Link className="text-link" to="/menu">Discover our approach <ArrowUpRight size={15} /></Link></Reveal></section>

    <section className="favorites-section content-band"><Reveal className="section-heading"><div><p className="eyebrow">Curated for the curious</p><h2>THE HOUSE<br /><em>FAVORITES</em></h2></div><Link className="text-link desktop-only" to="/menu">View all coffee <ArrowUpRight size={15} /></Link></Reveal><div className="favorite-grid">{favorites.map((product, index) => <Reveal className={`favorite-card favorite-card-${index + 1}`} delay={index * .08} key={product.id}><div className="favorite-art" style={{ '--accent': product.accent }}><span className="product-index">0{index + 1}</span><div className="visual-cup" /></div><div className="favorite-info"><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p></div><div className="favorite-bottom"><strong>${product.price.toFixed(2)}</strong><button className="add-button" onClick={() => addProduct(product)} aria-label={`Add ${product.name} to cart`}><Plus size={17} /></button></div></div><Link className="card-detail-link" to={`/menu/${product.id}`}>View details <ArrowUpRight size={14} /></Link></Reveal>)}</div><Link className="text-link mobile-only" to="/menu">View all coffee <ArrowUpRight size={15} /></Link></section>

    <section className="story-section" id="story"><div className="story-scene"><CoffeeScene compact /></div><div className="story-content"><Reveal><p className="eyebrow">A study in patience</p><h2>THE ART<br />OF THE <em>POUR.</em></h2></Reveal><div className="story-steps"><Reveal delay={.1}><StoryStep number="01" title="THE BEAN" text="We source expressive lots with a point of view, then let their character lead." /></Reveal><Reveal delay={.2}><StoryStep number="02" title="THE ROAST" text="A slower, gentler roast draws out clarity without sanding away the soul." /></Reveal><Reveal delay={.3}><StoryStep number="03" title="THE POUR" text="The final act is yours. A little ceremony makes the everyday feel rare." /></Reveal></div></div></section>

    <section className="ritual-section content-band"><Reveal className="ritual-heading"><p className="eyebrow">No shortcuts, just good habits</p><h2>YOUR DAILY<br /><em>RITUAL.</em></h2></Reveal><div className="ritual-steps"><RitualStep number="01" title="SELECT" text="Choose your favorite roast." /><RitualStep number="02" title="BREW" text="We take our time with every cup." /><RitualStep number="03" title="ENJOY" text="Slow down and enjoy the moment." /></div></section>

    <section className="cta-section"><div className="cta-mark">AB</div><Reveal><p className="eyebrow">Make time for the good stuff</p><h2>YOUR NEXT FAVORITE<br /><em>CUP IS WAITING.</em></h2><Link className="button button-light" to="/menu">Explore the menu <ArrowUpRight size={15} /></Link></Reveal></section>

    <section className="newsletter-section content-band" id="newsletter"><Reveal><p className="eyebrow">A note from the roastery</p><h2>STAY IN THE <em>LOOP.</em></h2><p>New roasts, seasonal drinks, and stories from the AURA BREW kitchen.</p></Reveal>{subscribed ? <div className="success-message">You're on the list.</div> : <form className="newsletter-form" onSubmit={(event) => { subscribe(event); showToast("You're on the list.") }}><input aria-label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" required /><button type="submit">Subscribe <ArrowUpRight size={15} /></button></form>}</section>
  </div>
}

function StoryStep({ number, title, text }) { return <div className="story-step"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div> }
function RitualStep({ number, title, text }) { return <div className="ritual-step"><span>{number}</span><h3>{title}</h3><p>{text}</p></div> }
