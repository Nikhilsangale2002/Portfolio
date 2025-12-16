import React from 'react'
import FloatingCube from './FloatingCube'

const About = () => {
  return (
    <section id="about" className="section section-3d">
      <div className="section-3d-background">
        <FloatingCube />
      </div>
      <div className="section-content">
        <h2>About Me</h2>
      <p>
        I'm <strong>Nikhil Sangale</strong>, a full-stack developer who builds scalable web applications and AI-powered solutions. 
        I work with React, Python and cloud technologies to create impactful software that solves real-world problems.
      </p>
      </div>
    </section>
  )
}

export default About


