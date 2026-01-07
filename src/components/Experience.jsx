import React, { useState } from 'react'
import { createPortal } from 'react-dom'

const experienceData = [
  {
    number: '01',
    role: 'Full-stack Developer',
    company: 'Reclaim',
    period: 'July 2025 – Present',
    location: 'Remote, India',
    highlights: [
      'Architected microservices with Flask REST APIs (100+ endpoints)',
      'Implemented JWT, OAuth, and OTP authentication systems',
      'Built gamification engine increasing engagement by 40%',
      'Deployed on AWS with Docker and zero-downtime strategy'
    ],
    fullDetails: {
      description: 'Leading full-stack development for a social impact platform focused on environmental sustainability and community engagement.',
      responsibilities: [
        'Architected and developed 100+ RESTful API endpoints using Flask, handling 10K+ daily requests',
        'Implemented comprehensive authentication system with JWT, OAuth 2.0, and OTP verification',
        'Built gamification engine with points, badges, and leaderboards, increasing user engagement by 40%',
        'Designed and implemented microservices architecture with Docker containerization',
        'Deployed on AWS EC2 with CI/CD pipeline, achieving 99.9% uptime and zero-downtime deployments',
        'Integrated Redis for caching and session management, reducing response time by 60%',
        'Implemented real-time notifications using WebSockets and Celery task queues'
      ],
      technologies: ['Flask', 'React', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Nginx', 'JWT', 'OAuth', 'Celery', 'WebSockets']
    }
  },
  {
    number: '02',
    role: 'Software Developer',
    company: 'RSL Solution',
    period: 'January 2025 – July 2025',
    location: 'Pune, India',
    highlights: [
      'Developed full-stack web applications using React.js and Flask',
      'Built AI-powered resume analysis with 90% accuracy',
      'Integrated RESTful APIs with MySQL databases',
      'Collaborated in Agile teams using Jira and Git'
    ],
    fullDetails: {
      description: 'Developed enterprise-level web applications and AI-powered solutions for HR tech and recruitment automation.',
      responsibilities: [
        'Developed HireLens AI recruitment platform with Next.js frontend and Flask backend',
        'Built AI-powered resume screening system using LLMs achieving 90% accuracy in candidate matching',
        'Designed and implemented RESTful APIs with comprehensive error handling and validation',
        'Integrated MySQL database with optimized queries and proper indexing for 5K+ records',
        'Implemented Docker-based microservices architecture with Nginx load balancing',
        'Collaborated in Agile/Scrum teams with daily standups, sprint planning, and retrospectives',
        'Used Git for version control and Jira for project management and issue tracking',
        'Conducted code reviews and mentored junior developers on best practices'
      ],
      technologies: ['React.js', 'Next.js', 'Flask', 'MySQL', 'Docker', 'Nginx', 'Redis', 'OpenAI API', 'Jira', 'Git', 'Postman']
    }
  },
  {
    number: '03',
    role: 'Software Developer',
    company: 'Hashedbit Innovation',
    period: 'March 2024 – July 2024',
    location: 'Remote, India',
    highlights: [
      'Developed responsive web interfaces with React.js',
      'Designed and implemented backend RESTful APIs',
      'Optimized MySQL queries and database schemas',
      'Performed API testing using Postman'
    ],
    fullDetails: {
      description: 'Started my professional journey building full-stack web applications and learning industry best practices.',
      responsibilities: [
        'Developed responsive and accessible web interfaces using React.js and modern CSS',
        'Designed and implemented RESTful APIs following REST principles and OpenAPI specifications',
        'Created and optimized MySQL database schemas with proper normalization and relationships',
        'Wrote complex SQL queries with joins, subqueries, and aggregations for efficient data retrieval',
        'Performed comprehensive API testing using Postman, creating test collections and automation',
        'Implemented authentication and authorization with JWT tokens',
        'Used Git for version control and collaborated with team through pull requests',
        'Participated in code reviews and learned software development best practices'
      ],
      technologies: ['React.js', 'Node.js', 'Express', 'MySQL', 'JavaScript', 'HTML/CSS', 'Git', 'Postman', 'REST APIs']
    }
  }
]

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (exp, e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    setSelectedExp(exp)
    setIsModalOpen(true)
    console.log('Opening modal for:', exp.company) // Debug log
  }

  const closeModal = (e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    setIsModalOpen(false)
    setTimeout(() => setSelectedExp(null), 300)
  }

  return (
    <>
      <section id="experience" className="section">
        <div className="section-shapes">
          <div className="shape shape-ring section-shape-7"></div>
          <div className="shape shape-square section-shape-8"></div>
          <div className="shape shape-circle section-shape-9"></div>
          <div className="shape shape-triangle section-shape-19"></div>
          <div className="shape shape-ring section-shape-20"></div>
          <div className="shape shape-square section-shape-21"></div>
        </div>
        <div className="section-header">
          <h2>Work Experience</h2>
          <p>My professional journey</p>
        </div>

        <div className="experience-timeline">
          {experienceData.map((exp, idx) => (
            <div 
              key={idx} 
              className="experience-card"
              onClick={(e) => openModal(exp, e)}
              style={{ cursor: 'pointer' }}
            >
              <div className="experience-number">{exp.number}</div>
              <div className="experience-content">
                <h3>{exp.role}</h3>
                <div className="experience-meta">
                  <span className="company">{exp.company}</span>
                  <span className="separator">•</span>
                  <span className="location">{exp.location}</span>
                </div>
                <div className="experience-period">{exp.period}</div>
                <ul className="experience-highlights">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
                <div className="view-more">Click to view full details →</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal - Rendered at document root using Portal */}
      {isModalOpen && selectedExp && createPortal(
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <h2>{selectedExp.role}</h2>
              <div className="modal-meta">
                <span className="modal-company">{selectedExp.company}</span>
                <span className="separator">•</span>
                <span className="modal-location">{selectedExp.location}</span>
              </div>
              <div className="modal-period">{selectedExp.period}</div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>About the Role</h3>
                <p>{selectedExp.fullDetails.description}</p>
              </div>

              <div className="modal-section">
                <h3>Key Responsibilities</h3>
                <ul className="modal-list">
                  {selectedExp.fullDetails.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3>Technologies Used</h3>
                <div className="modal-tech-tags">
                  {selectedExp.fullDetails.technologies.map((tech, i) => (
                    <span key={i} className="modal-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Experience


