import React from 'react'

const defaultProjects = [
  {
    title: 'HireLens – AI Recruitment Platform',
    org: '',
    period: '',
    link: 'https://github.com/Nikhilsangale2002/Hirelens',
    bullets: [
      'Built a full-stack AI recruitment platform using Next.js and Flask, automating resume screening and candidate ranking with LLMs (Gemini/OpenAI).',
      'Designed Docker-based microservices architecture with Nginx reverse proxy, Redis caching, and MySQL for scalable, production-ready deployment.',
      'Implemented secure authentication with JWT + OAuth 2.0, bcrypt hashing, rate limiting, account lockout, and audit logging.',
      'Optimized performance using Redis session storage and caching, reducing API latency for frequently accessed endpoints.'
    ]
  },
  {
    title: 'Portfolio Website',
    org: '',
    period: '',
    link: 'https://nikhilsangale2002.github.io/Portfolio/',
    bullets: [
      'Personal portfolio built with React + Vite featuring modern glassmorphism design and 3D interactive background elements.',
      'Implemented custom scroll animations with Intersection Observer API, including fade-in, slide, scale, and staggered effects for enhanced UX.',
      'Created scroll-only content area with hidden scrollbar, keeping header fixed while content scrolls smoothly within viewport.',
      'Responsive layout with mobile-optimized navigation, gradient text effects, and smooth transitions across all components.',
      'Integrated Devicon for technology icons; organized sections for About, Skills, Projects, Experience, and Contact with animated cards.'
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
  }
]

const Projects = ({ projects = defaultProjects }) => {
  return (
    <section id="projects" className="section">
      <h2>Projects</h2>
      <div className="project-grid stagger-animation">
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


