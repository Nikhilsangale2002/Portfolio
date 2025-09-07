import React, { useState } from 'react'

const Header = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <a href="#hero" className="brand">Nikhil Sangale</a>
      <button className={`mobile-toggle ${open ? 'open' : ''}`} aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </button>
      <nav className={`nav ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

export default Header


