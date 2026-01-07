import React, { useState, useEffect } from 'react'
import { smoothScrollTo } from '../utils/smoothScroll'

const Header = () => {
  const [open, setOpen] = useState(false)
  
  // Handle smooth scroll on navigation click
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    
    // Small delay for mobile menu close animation
    setTimeout(() => {
      smoothScrollTo(href)
    }, 100)
  }
  
  // Close menu when clicking outside on mobile
  useEffect(() => {
    if (!open) return
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.site-header')) {
        setOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [open])
  
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])
  
  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (open && window.innerWidth <= 820) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
  
  return (
    <header className="site-header">
      <a href="#hero" className="brand" onClick={(e) => handleNavClick(e, '#hero')}>Nikhil Sangale</a>
      <button 
        className={`mobile-toggle ${open ? 'open' : ''}`} 
        aria-label="Toggle navigation" 
        aria-expanded={open} 
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`nav ${open ? 'open' : ''}`}>
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a>
        <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a>
        <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
        <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
      </nav>
    </header>
  )
}

export default Header


