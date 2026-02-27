import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const skillsData = {
  'All': [
    'JavaScript', 'HTML5', 'CSS3', 'React', 'Next.js', 'Tailwind CSS',
    'Node.js', 'Python', 'Flask', 'MongoDB', 'MySQL', 'Docker', 'Git', 'AWS'
  ],
  'Frontend': ['JavaScript', 'HTML5', 'CSS3', 'React', 'Next.js', 'Tailwind CSS'],
  'Backend': ['Node.js', 'Python', 'Flask', 'MongoDB', 'MySQL'],
  'DevOps': ['Docker', 'Git', 'Linux', 'AWS']
}

const Skills = () => {
  const [activeTab, setActiveTab] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Technical <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {Object.keys(skillsData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-display text-sm transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {skillsData[activeTab].map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="px-4 py-2 glass rounded-lg text-sm font-medium text-foreground"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { num: "2+", label: "Years Exp." },
            { num: "10+", label: "Projects" },
            { num: "5+", label: "Technologies" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-display font-bold text-primary">{stat.num}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills


