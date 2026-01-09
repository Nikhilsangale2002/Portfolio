import React, { useEffect, useRef } from 'react'

const Hero = () => {
  const heroRef = useRef(null)
  const parallaxRef = useRef({
    leftContent: null,
    rightCards: [],
    spheres: []
  })

  useEffect(() => {
    const heroSection = heroRef.current
    if (!heroSection) return

    // Get all parallax elements
    const leftContent = heroSection.querySelector('.hero-left')
    const rightCards = heroSection.querySelectorAll('.floating-card')
    const label = heroSection.querySelector('.hero-label')
    const heading = heroSection.querySelector('h1')
    const description = heroSection.querySelector('.hero-description')
    const stats = heroSection.querySelector('.hero-stats')
    const buttons = heroSection.querySelector('.hero-buttons')

    // Parallax scroll effect - MUCH MORE VISIBLE
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const heroHeight = heroSection.offsetHeight
      const scrollProgress = Math.min(scrolled / heroHeight, 1)

      // Parallax effect for left content (slower movement)
      if (leftContent) {
        leftContent.style.transform = `translateY(${scrolled * 0.5}px)`
      }

      // Individual parallax for text elements - INCREASED SPEEDS
      if (label) {
        label.style.transform = `translateY(${scrolled * 0.3}px)`
      }
      if (heading) {
        heading.style.transform = `translateY(${scrolled * 0.6}px)`
      }
      if (description) {
        description.style.transform = `translateY(${scrolled * 0.8}px)`
      }
      if (stats) {
        stats.style.transform = `translateY(${scrolled * 1}px)`
      }
      if (buttons) {
        buttons.style.transform = `translateY(${scrolled * 1.2}px)`
      }

      // Parallax for floating cards (MUCH faster movement with rotation)
      rightCards.forEach((card, index) => {
        const speed = 1.0 + (index * 0.3)
        const rotation = scrolled * 0.1 * (index + 1)
        card.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`
      })
    }

    // Mouse/Touch parallax effect - MORE INTENSE
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      currentX = clientX
      currentY = clientY
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
      const moveX = (currentX - centerX) / 20
      const moveY = (currentY - centerY) / 20

      // Apply mouse/touch parallax to cards
      rightCards.forEach((card, index) => {
        const depth = (index + 1) * 0.8
        const scrolled = window.pageYOffset
        const speed = 1.0 + (index * 0.3)
        const rotation = scrolled * 0.1 * (index + 1)
        
        card.style.transform = `translate(${moveX * depth}px, ${moveY * depth + scrolled * speed}px) rotate(${rotation}deg)`
      })

      // Apply to heading
      if (heading) {
        const scrolled = window.pageYOffset
        heading.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5 + scrolled * 0.6}px)`
      }
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
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-left">
        <div className="hero-label">Software Developer</div>
        <h1>
          <span className="line">Hi, I'm</span>
          <span className="line">Nikhil Sangale</span>
        </h1>
        <p className="hero-description">
          Crafting scalable web applications and AI-powered solutions.
          Specialized in Backend development , cloud deployment, and modern frontend frameworks.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">5+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat-number">1+</div>
            <div className="stat-label">Years Exp</div>
          </div>

        </div>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="floating-card">
          <div className="card-icon">
            <i className="devicon-react-original colored"></i>
          </div>
          <h3>Fast Performance</h3>
          <p>Optimized code for lightning-fast load times</p>
        </div>

        <div className="floating-card">
          <div className="card-icon">
            <i className="devicon-figma-plain colored"></i>
          </div>
          <h3>Modern Design</h3>
          <p>Beautiful interfaces that users love</p>
        </div>

        <div className="floating-card">
          <div className="card-icon">
            <i className="devicon-docker-plain colored"></i>
          </div>
          <h3>Scalable Solutions</h3>
          <p>Built to grow with your business</p>
        </div>
      </div>
    </section>
  )
}

export default Hero


