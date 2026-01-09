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
    // Smooth scroll handler
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
      document.removeEventListener('click', handleClick, true)
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
