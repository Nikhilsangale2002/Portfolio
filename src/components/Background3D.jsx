import React, { useEffect, useRef } from 'react'

const Background3D = () => {
  const sceneRef = useRef(null)
  const spheresRef = useRef([])

  useEffect(() => {
    // Parallax scroll effect for background spheres - MUCH MORE VISIBLE
    const handleScroll = () => {
      const scrolled = window.pageYOffset

      spheresRef.current.forEach((sphere, index) => {
        if (sphere) {
          // Dramatically increased speeds
          const speed = 0.5 + (index * 0.3)
          const rotation = scrolled * 0.08 * (index + 1)
          const scale = 1 + (scrolled * 0.0003)
          sphere.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg) scale(${scale})`
        }
      })
    }

    // Mouse/Touch parallax effect - MORE INTENSE
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e) => {
      currentX = e.clientX
      currentY = e.clientY
      applyParallax()
    }

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        currentX = e.touches[0].clientX
        currentY = e.touches[0].clientY
        applyParallax()
      }
    }

    const applyParallax = () => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (currentX - centerX) / 15
      const moveY = (currentY - centerY) / 15

      spheresRef.current.forEach((sphere, index) => {
        if (sphere) {
          const depth = (index + 1) * 1.2
          const scrolled = window.pageYOffset
          const speed = 0.5 + (index * 0.3)
          const rotation = scrolled * 0.08 * (index + 1)
          const scale = 1 + (scrolled * 0.0003)
          
          sphere.style.transform = `translate(${moveX * depth}px, ${moveY * depth + scrolled * speed}px) rotate(${rotation}deg) scale(${scale})`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchMove, { passive: true })
    
    // Initial call
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchMove)
    }
  }, [])

  return (
    <div className="scene-bg" ref={sceneRef}>
      <div className="orb orb-1" ref={el => spheresRef.current[0] = el}></div>
      <div className="orb orb-2" ref={el => spheresRef.current[1] = el}></div>
      <div className="orb orb-3" ref={el => spheresRef.current[2] = el}></div>
      <div className="parallax-sphere sphere-1" ref={el => spheresRef.current[3] = el}></div>
      <div className="parallax-sphere sphere-2" ref={el => spheresRef.current[4] = el}></div>
      <div className="parallax-sphere sphere-3" ref={el => spheresRef.current[5] = el}></div>
    </div>
  )
}

export default Background3D
