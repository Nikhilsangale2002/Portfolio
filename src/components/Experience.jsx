import React from 'react'

const defaultExperience = [
  {
    role: 'Full-stack Developer',
    company: 'Reclaim • Remote, India',
    period: 'July 2025 – Present',
    points: [
      'Architected and developed a full-stack e-commerce platform using microservices with Flask REST APIs (100+ endpoints), React.js frontend, MySQL database, and Redis caching, deployed in Docker containers.',
      'Implemented a comprehensive authentication system supporting JWT tokens, Facebook/Google OAuth, and OTP-based verification with password recovery flows.',
      'Designed and built an order management system with QR code-based tracking, automated status workflows, and real-time order updates.',
      'Developed a gamification engine with a multi-tier reward system, referral tracking, and brand voting mechanisms, increasing user engagement by 40%.',
      'Configured Nginx as a reverse proxy and API gateway handling CORS, SSL termination, and request routing across 6 microservices.',
      'Integrated a monitoring service for real-time API metrics with async logging using threading, reducing response latency by 30%.',
      'Built a Chrome extension for wishlist management with page scraping capabilities and seamless API integration.',
      'Deployed production infrastructure on AWS using Docker Compose orchestration, custom domain configuration, and a zero-downtime deployment strategy.',
      'Tech Stack: Python, Flask, React.js, MySQL, Redis, Docker, Nginx, Git, JWT, OAuth, REST APIs.'
    ]
  },
  {
    role: 'Software Developer',
    company: 'RSL Solution • Pune',
    period: 'January 2025 – July 2025',
    points: [
      'RSL Solution is an IT firm that designs, architects, and develops software products for web, mobile, and branding purposes.',
      'Developed and maintained full-stack web applications using Python, React.js, and Flask.',
      'Built an AI-powered application with 90% accuracy for analyzing and matching resumes using GenAI, Streamlit, and MySQL.',
      'Created and integrated RESTful APIs with MySQL for efficient data handling.',
      'Designed responsive and interactive user interfaces with React.js and JavaScript to enhance user experience.',
      'Collaborated in Agile teams using Jira, managed version control with Git/GitHub, and tested APIs via Postman.'
    ]
  },
  {
    role: 'Software Developer',
    company: 'Hashedbit Innovation • Noida, India',
    period: 'March 2024 – July 2024',
    points: [
      'Developed and maintained responsive and interactive web interfaces using HTML, CSS, JavaScript, and React.js, ensuring optimal user experience across devices.',
      'Designed and implemented backend services and RESTful APIs to support dynamic front-end functionality.',
      'Created and managed relational database schemas in MySQL, optimizing queries and ensuring data integrity for seamless application performance.',
      'Performed thorough API testing and validation using Postman to ensure reliability and functionality.',
      'Gained exposure to Agile methodologies and project management tools like Jira, Git, and GitHub.'
    ]
  }
]

const Experience = ({ items = defaultExperience }) => {
  return (
    <section id="experience" className="section">
      <h2>Experience</h2>
      <div className="timeline stagger-animation">
        {items.map((exp, idx) => (
          <article key={idx} className="exp-card">
            <div className="exp-meta">
              <h3 className="exp-role">{exp.role}</h3>
              {(exp.company || exp.period) && (
                <p className="exp-sub">{[exp.company, exp.period].filter(Boolean).join(' • ')}</p>
              )}
            </div>
            <ul className="exp-list">
              {exp.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience


