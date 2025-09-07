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
          <a href="Nikhil%20Sangale%20Software%20Engineer%20(2)%20(1).pdf" className="btn" target="_blank" rel="noreferrer">Resume</a>
        </div>
      </div>
    </section>
  )
}

export default Hero


