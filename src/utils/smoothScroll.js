// Enhanced smooth scrolling for better mobile experience
export const smoothScrollTo = (targetId) => {
  const target = document.querySelector(targetId)
  if (!target) return
  
  // Get the scroll container
  const scrollContainer = document.querySelector('.scroll-container')
  if (!scrollContainer) return
  
  // Calculate position accounting for fixed header
  const header = document.querySelector('.site-header')
  const headerHeight = header ? header.offsetHeight : 0
  const targetPosition = target.offsetTop - headerHeight - 20 // 20px extra padding
  
  // Use native smooth scroll with fallback
  try {
    scrollContainer.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  } catch (e) {
    // Fallback for older browsers
    scrollContainer.scrollTop = targetPosition
  }
}

// Debounce function for scroll events
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for better performance
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
