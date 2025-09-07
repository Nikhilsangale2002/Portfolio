import React from 'react'

const groups = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'Java', icon: 'devicon-java-plain colored' }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Flask', icon: 'devicon-flask-original' },
      { name: 'Spring Boot', icon: 'devicon-spring-plain colored' }
    ]
  },
  {
    title: 'Databases',
    items: [
      { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' }
    ]
  },
  {
    title: 'DevOps',
    items: [
      { name: 'Docker', icon: 'devicon-docker-plain colored' }
    ]
  },
  {
    title: 'Version Control',
    items: [
      { name: 'Git', icon: 'devicon-git-plain colored' },
      { name: 'GitHub', icon: 'devicon-github-original' },
      { name: 'Bitbucket', icon: 'devicon-bitbucket-original colored' }
    ]
  },
  {
    title: 'API & Testing',
    items: [
      { name: 'Postman', icon: 'devicon-postman-plain colored' },
      { name: 'REST APIs', icon: 'devicon-openapi-plain colored' }
    ]
  },
  {
    title: 'Project Management',
    items: [
      { name: 'Jira', icon: 'devicon-jira-plain colored' }
    ]
  },
  {
    title: 'Cloud',
    items: [
      { name: 'AWS EC2', icon: 'devicon-amazonwebservices-plain colored' }
    ]
  }
]

const Skills = () => {
  return (
    <section id="skills" className="section">
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
    </section>
  )
}

export default Skills


