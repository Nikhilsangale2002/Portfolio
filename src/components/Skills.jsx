import React from 'react'
import ParticleRing from './ParticleRing'

const groups = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'Java', icon: 'devicon-java-plain colored' },
      { name: 'HTML5', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3', icon: 'devicon-css3-plain colored' }
    ]
  },
  {
    title: 'Frontend Development',
    items: [
      { name: 'React.js', icon: 'devicon-react-original colored' },
      { name: 'Vite', icon: 'devicon-vitejs-plain colored' },
      { name: 'Responsive Design', icon: 'devicon-css3-plain colored' }
    ]
  },
  {
    title: 'Backend Development',
    items: [
      { name: 'Flask', icon: 'devicon-flask-original' },
      { name: 'Spring Boot', icon: 'devicon-spring-plain colored' },
      { name: 'REST APIs', icon: 'devicon-openapi-plain colored' },
      { name: 'Microservices', icon: 'devicon-kubernetes-plain colored' },
      { name: 'Streamlit', icon: 'devicon-streamlit-plain colored' }
    ]
  },
  {
    title: 'Databases & Caching',
    items: [
      { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
      { name: 'Redis', icon: 'devicon-redis-plain colored' },
      { name: 'H2 Database', icon: 'devicon-spring-plain colored' }
    ]
  },
  {
    title: 'DevOps & Cloud',
    items: [
      { name: 'Docker', icon: 'devicon-docker-plain colored' },
      { name: 'AWS EC2', icon: 'devicon-amazonwebservices-plain colored' },
      { name: 'Nginx', icon: 'devicon-nginx-original colored' },
      { name: 'Linux', icon: 'devicon-linux-plain' }
    ]
  },
  {
    title: 'Version Control & Collaboration',
    items: [
      { name: 'Git', icon: 'devicon-git-plain colored' },
      { name: 'GitHub', icon: 'devicon-github-original' },
      { name: 'Bitbucket', icon: 'devicon-bitbucket-original colored' }
    ]
  },
  {
    title: 'Authentication & Security',
    items: [
      { name: 'JWT', icon: 'devicon-spring-plain colored' },
      { name: 'OAuth 2.0', icon: 'devicon-google-plain colored' },
      { name: 'Spring Security', icon: 'devicon-spring-plain colored' }
    ]
  },
  {
    title: 'AI & Machine Learning',
    items: [
      { name: 'Generative AI', icon: 'devicon-google-plain colored' },
      { name: 'Gemini Pro API', icon: 'devicon-google-plain colored' }
    ]
  },
  {
    title: 'Tools & Testing',
    items: [
      { name: 'Postman', icon: 'devicon-postman-plain colored' },
      { name: 'Jira', icon: 'devicon-jira-plain colored' },
      { name: 'VS Code', icon: 'devicon-vscode-plain colored' }
    ]
  },
  {
    title: 'Other Technologies',
    items: [
      { name: 'Chrome Extensions', icon: 'devicon-chrome-plain colored' }
    ]
  }
]

const Skills = () => {
  return (
    <section id="skills" className="section section-3d">
      <div className="section-3d-background">
        <ParticleRing />
      </div>
      <div className="section-content">
        <h2>Skills</h2>
      <div className="skill-groups">
        {groups.map((group) => (
          <div key={group.title} className="skill-group">
            <h3 className="skill-title">{group.title}</h3>
            <ul className="skills-list">
              {group.items.map((item) => (
                <li key={item.name} className="skill-chip">
                  <i className={`skill-icon ${item.icon}`} aria-hidden></i>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default Skills


