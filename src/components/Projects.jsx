import React from 'react'

const projectsData = [
  {
    number: '01',
    title: 'HireLens – AI Recruitment Platform',
    description: 'Full-stack AI recruitment platform using Next.js and Flask, automating resume screening with LLMs. Docker-based microservices with Nginx, Redis, and MySQL.',
    tags: ['Next.js', 'Flask', 'Docker', 'MySQL', 'Redis', 'AI'],
    link: 'https://github.com/Nikhilsangale2002/Hirelens',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  },
  {
    number: '02',
    title: 'Portfolio Website',
    description: 'Personal portfolio built with React + Vite featuring modern glassmorphism design, 3D interactive elements, and custom scroll animations.',
    tags: ['React', 'Vite', 'Three.js', 'CSS'],
    link: 'https://nikhilsangale2002.github.io/Portfolio/',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  },
  {
    number: '03',
    title: 'Resume ATS System',
    description: 'AI-powered ATS using Python, Streamlit and Generative AI (Gemini Pro API) with ~90% accuracy for resume analysis and JD matching.',
    tags: ['Python', 'Streamlit', 'Gemini AI', 'MySQL'],
    link: 'https://github.com/Nikhilsangale2002/Resume_ATS_System',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  }
]

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="section-shapes">
        <div className="shape shape-circle section-shape-1"></div>
        <div className="shape shape-square section-shape-2"></div>
        <div className="shape shape-ring section-shape-3"></div>
        <div className="shape shape-triangle section-shape-13"></div>
        <div className="shape shape-circle section-shape-14"></div>
        <div className="shape shape-square section-shape-15"></div>
      </div>
      <div className="section-header">
        <h2>Featured Projects</h2>
        <p>Showcase of my latest work</p>
      </div>

      <div className="projects-grid">
        {projectsData.map((project, idx) => (
          <div key={idx} className="project-card" onClick={() => project.link && window.open(project.link, '_blank')} style={{ cursor: project.link ? 'pointer' : 'default' }}>
            <div className="project-image" style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="project-content">
              <div className="project-number">{project.number}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="project-link" onClick={(e) => e.stopPropagation()}>
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects


