import React from 'react'

const Hero = () => {
  return (
    <section id="hero" className="section hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="typing">Nikhil Sangale</h1>
          <p className="hero-title">Full-Stack Developer & AI Enthusiast</p>
          <p className="hero-description">
            Crafting scalable web applications and AI-powered solutions.<br />
            Specialized in Backend development , cloud deployment, and modern frontend frameworks.
          </p>
          <div className="hero-social">
            <a href="https://github.com/Nikhilsangale2002" target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
              <i className="devicon-github-original"></i>
            </a>
            <a href="https://www.linkedin.com/in/nikhil-sangale-462465215/" target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
              <i className="devicon-linkedin-plain"></i>
            </a>
          </div>
          <div className="hero-actions">
            <a href="#projects" className="btn primary">View Projects</a>
            <a href="#contact" className="btn">Contact Me</a>
            <a href="Nikhil_Sangale_Resume.pdf" className="btn" target="_blank" rel="noreferrer" download>
              <i className="devicon-file-plain" style={{marginRight: '6px'}}></i>
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


