import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function LoginPage() {
  const { signIn, showToast } = useApp(); const navigate = useNavigate(); const location = useLocation(); const [params] = useSearchParams(); const [form, setForm] = useState({ email: '', password: '' }); const [error, setError] = useState('')
  const destination = params.get('redirect') || location.state?.from || '/'
  const submit = (event) => { event.preventDefault(); if (form.email !== 'demo@aurabrew.com' || form.password !== 'demo123') { setError('Email or password is incorrect.'); return } signIn(form.email, 'AURA Member'); showToast('Welcome back to AURA BREW.'); navigate(destination) }
  const demo = () => { signIn('demo@aurabrew.com', 'AURA Member'); showToast('Welcome back to AURA BREW.'); navigate(destination) }
  return <section className="auth-page page-section"><div className="auth-wrap"><p className="eyebrow">AURA BREW / MEMBERS</p><h1 className="page-title">WELCOME<br /><em>BACK.</em></h1><p className="auth-intro">A demo account for a more intentional coffee habit.</p><form onSubmit={submit}><label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="demo@aurabrew.com" required /></label><label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="demo123" required />{error && <small className="form-error">{error}</small>}</label><button className="button button-light" type="submit">Login</button><button className="button button-outline" type="button" onClick={demo}>Continue as demo user</button></form><p className="demo-credentials">Demo access: <strong>demo@aurabrew.com</strong> / <strong>demo123</strong></p><p className="muted">New here? <Link to="/signup">Create an account</Link></p></div></section>
}
