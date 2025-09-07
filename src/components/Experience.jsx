import React from 'react'

const defaultExperience = [
  {
    role: 'Full-stack Developer',
    company: 'Reclaim • Remote, India',
    period: 'July 2025 – Present',
    points: [
      'Build data‑driven web solutions and automation tools across frontend and backend.',
      'Frontend: React.js apps with responsive UI and smooth API integrations.',
      'Backend: Flask (Python) REST APIs with MySQL; MongoDB for unstructured data.',
      'Web scraping & automation using BeautifulSoup/Spider with robust fallbacks and throttling.',
      'Developed a Chrome Extension for fashion e‑commerce scraping with advanced DOM parsing.',
      'Deploy and manage services on AWS EC2; containerize workflows with Docker.',
      'Short: Shipping scalable, end‑to‑end solutions that connect UI, APIs, and data.'
    ]
  },
  {
    role: 'Software Developer',
    company: 'RSL Solution • Pune',
    period: 'January 2025 – July 2025',
    points: [
      'RSL Solution is an IT firm that designs, architects, and develops software products for web, mobile, and branding purposes.',
      'Developed and maintained full-stack web applications using Python, Java, React.js, and Spring Boot.',
      'Built an AI-powered application with 90% accuracy for analyzing and matching resumes using GenAI, Streamlit, and MySQL.',
      'Created and integrated RESTful APIs; used Spring JPA with H2 and MySQL for efficient data handling.',
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
      <div className="timeline">
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


