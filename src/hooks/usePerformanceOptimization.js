// Performance optimization hook for better mobile experience
import { useEffect } from 'react'

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Detect if running on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // Optimize scrolling performance
    if (isMobile) {
      // Add passive event listeners for better scroll performance
      const scrollContainer = document.querySelector('.scroll-container')
      if (scrollContainer) {
        scrollContainer.addEventListener('touchstart', () => {}, { passive: true })
        scrollContainer.addEventListener('touchmove', () => {}, { passive: true })
      }
    }
    
    // Preload critical assets
    const preloadFonts = () => {
      const devIconFont = document.createElement('link')
      devIconFont.rel = 'preload'
      devIconFont.as = 'style'
      devIconFont.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
      document.head.appendChild(devIconFont)
    }
    
    // Run after initial render
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(preloadFonts)
    } else {
      setTimeout(preloadFonts, 1)
    }
    
    // Optimize viewport height for mobile browsers with debouncing
    let resizeTimeout
    let ticking = false
    
    const setVH = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const vh = window.innerHeight * 0.01
          document.documentElement.style.setProperty('--vh', `${vh}px`)
          ticking = false
        })
        ticking = true
      }
    }
    
    // Debounced version for resize event
    const debouncedSetVH = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(setVH, 100)
    }
    
    // Set initial value
    setVH()
    
    // Use debounced version for resize events
    window.addEventListener('resize', debouncedSetVH, { passive: true })
    window.addEventListener('orientationchange', setVH, { passive: true })
    
    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', debouncedSetVH)
      window.removeEventListener('orientationchange', setVH)
    }
  }, [])
}
