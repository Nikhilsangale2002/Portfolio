import React from 'react'

const defaultProjects = [
  {
    title: 'Portfolio Website',
    org: '',
    period: '',
    link: 'https://nikhilsangale2002.github.io/Portfolio',
    bullets: [
      'Personal portfolio built with React + Vite and modern UI design.',
      'Responsive layout, glassmorphism cards, and smooth interactions.',
      'Real tech icons via Devicon; organized sections for About, Skills, Projects.'
    ]
  },
  {
    title: 'Resume ATS System',
    org: 'RSL Solution',
    period: 'March 2025 – April 2025',
    link: 'https://github.com/Nikhilsangale2002/Resume_ATS_System',
    bullets: [
      'Built an ATS using Python, Streamlit and Generative AI (Gemini Pro API).',
      'Engineered AI logic to extract key info and match to JDs with ~90% accuracy.',
      'Implemented scoring to rank resumes by relevance for faster shortlisting.',
      'Parsed resumes across Excel, Word, and PDF for comprehensive extraction.'
    ]
  },
  {
    title: 'Talkpal Chat Application',
    org: 'Pimpri Chinchwad University',
    period: 'February 2024 – May 2024',
    bullets: [
      'Real-time chat app in Java + Spring Boot with secure auth and registration.',
      'RESTful APIs via Spring MVC/Security to manage sessions and messaging.',
      'Spring JPA with MySQL and H2 for accounts, chat data, and logs.',
      'Thorough API testing with Postman; clean, modular architecture.'
    ]
  }
]

const Projects = ({ projects = defaultProjects }) => {
  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((p, idx) => (
          <article key={idx} className="project-card">
            <h3>{p.title}</h3>
            {(p.org || p.period) && (
              <p style={{ marginTop: 4, opacity: 0.85 }}>{[p.org, p.period].filter(Boolean).join(' • ')}</p>
            )}
            {p.bullets ? (
              <ul style={{ margin: '10px 0 0 16px' }}>
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : (
              <p>{p.description}</p>
            )}
            {p.link && (
              <a className="btn small" href={p.link} target="_blank" rel="noreferrer" style={{ marginTop: 12, display: 'inline-block' }}>View</a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects


