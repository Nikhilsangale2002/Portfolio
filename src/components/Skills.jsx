import React, { useState } from 'react'

const skillsData = {
  'All': [
    { icon: 'devicon-javascript-plain colored', name: 'JavaScript', level: 'Expert' },
    { icon: 'devicon-html5-plain colored', name: 'HTML5', level: 'Expert' },
    { icon: 'devicon-css3-plain colored', name: 'CSS3', level: 'Expert' },
    { icon: 'devicon-react-original colored', name: 'React', level: 'Expert' },
    { icon: 'devicon-nextjs-line', name: 'Next.js', level: 'Advanced' },
    { icon: 'devicon-redux-original colored', name: 'Redux', level: 'Advanced' },
    { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind', level: 'Expert' },
    { icon: 'devicon-nodejs-plain colored', name: 'Node.js', level: 'Expert' },
    { icon: 'devicon-python-plain colored', name: 'Python', level: 'Advanced' },
    { icon: 'devicon-flask-original', name: 'Flask', level: 'Advanced' },
    { icon: 'devicon-mongodb-plain colored', name: 'MongoDB', level: 'Advanced' },
    { icon: 'devicon-postgresql-plain colored', name: 'PostgreSQL', level: 'Advanced' },
    { icon: 'devicon-mysql-plain colored', name: 'MySQL', level: 'Advanced' },
    { icon: 'devicon-redis-plain colored', name: 'Redis', level: 'Intermediate' },
    { icon: 'devicon-docker-plain colored', name: 'Docker', level: 'Intermediate' },
    { icon: 'devicon-nginx-original colored', name: 'Nginx', level: 'Intermediate' },
    { icon: 'devicon-linux-plain', name: 'Linux', level: 'Advanced' },
    { icon: 'devicon-amazonwebservices-plain-wordmark colored', name: 'AWS', level: 'Advanced' },
    { icon: 'devicon-git-plain colored', name: 'Git', level: 'Expert' },
    { icon: 'devicon-github-original', name: 'GitHub', level: 'Expert' },
    { icon: 'devicon-bitbucket-original colored', name: 'Bitbucket', level: 'Advanced' },
    { icon: 'devicon-chrome-plain colored', name: 'Chrome Ext', level: 'Advanced' },
    { icon: 'devicon-jira-plain colored', name: 'Jira', level: 'Advanced' },
    { icon: 'devicon-postman-plain colored', name: 'Postman', level: 'Advanced' },
    { icon: 'devicon-python-plain colored', name: 'Gen AI', level: 'Advanced' }
  ],
  'Frontend': [
    { icon: 'devicon-javascript-plain colored', name: 'JavaScript', level: 'Expert' },
    { icon: 'devicon-html5-plain colored', name: 'HTML5', level: 'Expert' },
    { icon: 'devicon-css3-plain colored', name: 'CSS3', level: 'Expert' },
    { icon: 'devicon-react-original colored', name: 'React', level: 'Expert' },
    { icon: 'devicon-nextjs-line', name: 'Next.js', level: 'Advanced' },
    { icon: 'devicon-redux-original colored', name: 'Redux', level: 'Advanced' },
    { icon: 'devicon-tailwindcss-plain colored', name: 'Tailwind', level: 'Expert' },
  ],
  'Backend': [
    { icon: 'devicon-nodejs-plain colored', name: 'Node.js', level: 'Expert' },
    { icon: 'devicon-python-plain colored', name: 'Python', level: 'Advanced' },
    { icon: 'devicon-flask-original', name: 'Flask', level: 'Advanced' },
  ],
  'Database': [
    { icon: 'devicon-mongodb-plain colored', name: 'MongoDB', level: 'Advanced' },
    { icon: 'devicon-postgresql-plain colored', name: 'PostgreSQL', level: 'Advanced' },
    { icon: 'devicon-mysql-plain colored', name: 'MySQL', level: 'Advanced' },
    { icon: 'devicon-redis-plain colored', name: 'Redis', level: 'Intermediate' },
  ],
  'DevOps': [
    { icon: 'devicon-docker-plain colored', name: 'Docker', level: 'Intermediate' },
    { icon: 'devicon-nginx-original colored', name: 'Nginx', level: 'Intermediate' },
    { icon: 'devicon-linux-plain', name: 'Linux', level: 'Advanced' },
    { icon: 'devicon-amazonwebservices-plain-wordmark colored', name: 'AWS', level: 'Advanced' },
    { icon: 'devicon-git-plain colored', name: 'Git', level: 'Expert' },
    { icon: 'devicon-github-original', name: 'GitHub', level: 'Expert' },
  ],
  'Tools': [
    { icon: 'devicon-bitbucket-original colored', name: 'Bitbucket', level: 'Advanced' },
    { icon: 'devicon-chrome-plain colored', name: 'Chrome Ext', level: 'Advanced' },
    { icon: 'devicon-jira-plain colored', name: 'Jira', level: 'Advanced' },
    { icon: 'devicon-postman-plain colored', name: 'Postman', level: 'Advanced' },
    { icon: 'devicon-python-plain colored', name: 'Gen AI', level: 'Advanced' }
  ]
}

const Skills = () => {
  const [activeTab, setActiveTab] = useState('All')

  const handleTabClick = (e, tabName) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Tab clicked:', tabName)
    setActiveTab(tabName)
  }

  return (
    <section id="skills" className="section">
      <div className="section-shapes">
        <div className="shape shape-square section-shape-4"></div>
        <div className="shape shape-circle section-shape-5"></div>
        <div className="shape shape-triangle section-shape-6"></div>
        <div className="shape shape-ring section-shape-16"></div>
        <div className="shape shape-square section-shape-17"></div>
        <div className="shape shape-circle section-shape-18"></div>
      </div>
      <div className="section-header">
        <h2>Technical Skills</h2>
        <p>Technologies I work with</p>
      </div>

      <div className="skills-tabs">
        {Object.keys(skillsData).map((tab) => (
          <button
            key={tab}
            className={`skills-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={(e) => handleTabClick(e, tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {skillsData[activeTab].map((skill, idx) => (
          <div key={`${activeTab}-${idx}`} className="skill-item visible">
            <i className={`${skill.icon} skill-icon`}></i>
            <h4>{skill.name}</h4>
            <p>{skill.level}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills


