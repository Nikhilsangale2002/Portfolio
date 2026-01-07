import { useEffect } from 'react'
import './App-New.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background3D from './components/Background3D'
import { usePerformanceOptimization } from './hooks/usePerformanceOptimization'

function App() {
  // Apply performance optimizations
  usePerformanceOptimization()
  
  useEffect(() => {
    // Custom Cursor
    const cursor = document.createElement('div')
    const cursorFollower = document.createElement('div')
    cursor.className = 'cursor'
    cursorFollower.className = 'cursor-follower'
    document.body.appendChild(cursor)
    document.body.appendChild(cursorFollower)

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = `${mouseX}px`
      cursor.style.top = `${mouseY}px`
      
      // Keep rotation for card hover
      if (!cursor.classList.contains('hover-card')) {
        cursor.style.transform = `translate(-50%, -50%)`
      }
    }

    const moveFollower = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      cursorFollower.style.left = `${followerX}px`
      cursorFollower.style.top = `${followerY}px`
      cursorFollower.style.transform = `translate(-50%, -50%)`
      requestAnimationFrame(moveFollower)
    }

    const handleHoverLink = () => {
      cursor.className = 'cursor hover-link'
      cursorFollower.className = 'cursor-follower hover-link'
    }

    const handleHoverCard = () => {
      cursor.className = 'cursor hover-card'
      cursorFollower.className = 'cursor-follower hover-card'
    }

    const handleHoverInput = () => {
      cursor.className = 'cursor hover-input'
      cursorFollower.className = 'cursor-follower hover-input'
    }

    const handleLeave = () => {
      cursor.className = 'cursor'
      cursorFollower.className = 'cursor-follower'
    }

    document.addEventListener('mousemove', moveCursor)
    moveFollower()

    // Add hover effects to different interactive elements
    const links = document.querySelectorAll('a, button')
    links.forEach(el => {
      el.addEventListener('mouseenter', handleHoverLink)
      el.addEventListener('mouseleave', handleLeave)
    })

    const cards = document.querySelectorAll('.project-card, .skill-item, .experience-card, .floating-card')
    cards.forEach(el => {
      el.addEventListener('mouseenter', handleHoverCard)
      el.addEventListener('mouseleave', handleLeave)
    })

    const inputs = document.querySelectorAll('input, textarea')
    inputs.forEach(el => {
      el.addEventListener('mouseenter', handleHoverInput)
      el.addEventListener('mouseleave', handleLeave)
    })

    // Smooth scroll handler - let CSS handle smooth scroll and padding
    const handleClick = (e) => {
      // Ignore clicks on buttons or elements with button parent
      if (e.target.closest('button')) {
        return
      }

      const target = e.target
      const anchor = target.tagName === 'A' && target.getAttribute('href')?.startsWith('#') 
        ? target 
        : target.closest('a[href^="#"]')
      
      if (anchor) {
        const href = anchor.getAttribute('href')
        
        e.preventDefault()
        e.stopPropagation()
        
        const section = document.querySelector(href)
        if (section) {
          // Use scrollIntoView instead of window.scrollTo
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    // Add listener
    document.addEventListener('click', handleClick, true)

    // Scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, index * 150)
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll('.project-card, .skill-item, .experience-card, .contact-form')
    elements.forEach(el => observer.observe(el))
    
    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('click', handleClick, true)
      cursor.remove()
      cursorFollower.remove()
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Background3D />
      <div className="bg-shapes">
        <div className="shape shape-circle shape-1"></div>
        <div className="shape shape-square shape-2"></div>
        <div className="shape shape-triangle shape-3"></div>
        <div className="shape shape-ring shape-4"></div>
        <div className="shape shape-circle shape-5"></div>
        <div className="shape shape-square shape-6"></div>
        <div className="shape shape-circle shape-7"></div>
        <div className="shape shape-ring shape-8"></div>
      </div>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
