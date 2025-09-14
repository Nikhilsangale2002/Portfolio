import React from 'react'

const Hero = () => {
  // Auto-pick the clearest asset from src/assets: prefer names (profile/avatar/me/nikhil) and larger resolution
  return (
    <section id="hero" className="section hero">
      <div className="hero-content">
        <h1 className="typing">Nikhil Sangale</h1>
        <p>Software Developer • Passionate about AI-driven apps and web dev</p>
        <div className="hero-actions">
          <a href="#projects" className="btn primary">View Projects</a>
          <a href="#contact" className="btn">Contact Me</a>
          <a href="Nikhil_Sangale_Resume.pdf" className="btn" target="_blank" rel="noreferrer" download>Resume</a>
        </div>
      </div>
    </section>
  )
}

export default Hero


