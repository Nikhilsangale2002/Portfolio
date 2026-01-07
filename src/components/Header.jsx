import React, { useState, useEffect } from 'react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('nav')) {
        closeMenu()
      }
    }

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <nav>
      <div className="logo">Nikhil Sangale</div>
      
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <li><a href="#home" onClick={closeMenu}>Home</a></li>
        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
        <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
        <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
      </ul>
    </nav>
  )
}

export default Header


