import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function ToastHost() {
  const { toast, dismissToast } = useApp()
  return <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}><Check size={15} /> <span>{toast}</span><button aria-label="Dismiss notification" onClick={dismissToast}><X size={14} /></button></motion.div>}</AnimatePresence>
}
