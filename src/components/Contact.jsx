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
        <a href="https://github.com/Nikhilsangale2002" aria-label="GitHub" className="icon-btn" target="_blank" rel="noreferrer" title="GitHub">
          <i className="devicon-github-original" aria-hidden></i>
        </a>
        <a href="https://www.linkedin.com/in/nikhil-sangale-053921292" aria-label="LinkedIn" className="icon-btn" target="_blank" rel="noreferrer" title="LinkedIn">
          <i className="devicon-linkedin-plain colored" aria-hidden></i>
        </a>
      </div>
    </section>
  )
}

export default Contact


