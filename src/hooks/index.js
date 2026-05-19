import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (options.once !== false) {
            observer.unobserve(element)
          }
        } else {
          if (options.once === false) {
            setIsInView(false)
          }
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)

    return () => observer.unobserve(element)
  }, [options.threshold, options.rootMargin, options.once])

  return [ref, isInView]
}

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

export { useDebounce, useMediaQuery, useIsMobile, useIsTablet, useIsDesktop, useIsTouchDevice } from './useUtils'
export { useProducts, useProductFilters, useRelatedProducts, useProductRecommendations } from './useProducts'
export { useRecentlyViewed } from './useRecentlyViewed'