import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AccountPage from './pages/AccountPage'
import OrdersPage from './pages/OrdersPage'
import NotFoundPage from './pages/NotFoundPage'
import StoryPage from './pages/StoryPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const location = useLocation()
  useEffect(() => { document.title = location.pathname === '/menu' ? 'AURA BREW | Menu' : location.pathname === '/checkout' ? 'AURA BREW | Checkout' : location.pathname === '/account' ? 'AURA BREW | Account' : location.pathname === '/orders' ? 'AURA BREW | Orders' : location.pathname.startsWith('/product/') || location.pathname.startsWith('/menu/') ? 'AURA BREW | Coffee' : 'AURA BREW | Premium Coffee' }, [location.pathname])
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="menu/:productId" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        <Route path="orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path="story" element={<StoryPage />} />
        <Route path="our-story" element={<StoryPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}