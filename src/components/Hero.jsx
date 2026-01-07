import React from 'react'

const Hero = () => {
  return (
    <section id="home" className="hero">
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


