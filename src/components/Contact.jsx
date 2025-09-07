import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p>
        Want to collaborate? Reach me at
        {' '}<a href="mailto:nikhilsangale121@gamil.com">nikhilsangale121@gamil.com</a>
      </p>
      <div className="socials">
        <a href="https://github.com/Nikhilsangale2002" aria-label="GitHub" className="btn small" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/nikhil-sangale-053921292" aria-label="LinkedIn" className="btn small" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  )
}

export default Contact


