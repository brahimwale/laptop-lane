import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useScrollPosition } from '../hooks'

export default function BackToTop() {
  const scrollY = useScrollPosition()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {scrollY > 500 && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}