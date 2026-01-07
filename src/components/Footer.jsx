import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="social-links">
        <a href="https://github.com/nikhilsangale2002" className="social-link" target="_blank" rel="noreferrer">
          <i className="devicon-github-original"></i>
        </a>
        <a href="https://linkedin.com/in/nikhilsangale" className="social-link" target="_blank" rel="noreferrer">
          <i className="devicon-linkedin-plain"></i>
        </a>
        <a href="mailto:nikhilsangale121@gmail.com" className="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      </div>
      <p>&copy; 2026 Nikhil Sangale. All rights reserved.</p>
    </footer>
  )
}

export default Footer


