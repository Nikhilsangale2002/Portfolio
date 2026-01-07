import { useEffect } from 'react'

export const useScrollAnimation = () => {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
      threshold: 0.15 // More forgiving threshold for mobile
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // For reduced motion, add class immediately without delay
          if (prefersReducedMotion) {
            entry.target.classList.add('animate-in')
          } else {
            // Small delay for smoother appearance
            requestAnimationFrame(() => {
              entry.target.classList.add('animate-in')
            })
          }
          // Stop observing once animated (performance optimization)
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale, .stagger-animation'
    )

    animatedElements.forEach(el => observer.observe(el))

    return () => {
      animatedElements.forEach(el => observer.unobserve(el))
    }
  }, [])
}
