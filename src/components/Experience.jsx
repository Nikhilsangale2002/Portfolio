import { motion } from "framer-motion"
import { useState } from "react"
import { createPortal } from "react-dom"
import { Briefcase } from "lucide-react"

const experienceData = [
  {
    role: 'Full-stack Developer',
    company: 'Reclaim',
    period: 'Jan 2025 – Present',
    location: 'Remote, India',
    description: 'Leading full-stack development for a social impact platform focused on environmental sustainability.',
    tags: ['Flask', 'React', 'AWS', 'Docker' , 'MySQL', 'Redis' , 'GenAi'],
    fullDetails: {
      description: 'Leading full-stack development for a social impact platform focused on environmental sustainability and community engagement.',
      responsibilities: [
        'Architected and developed 100+ RESTful API endpoints using Flask',
        'Implemented comprehensive authentication system with JWT, OAuth 2.0, and OTP verification',
        'Built gamification engine with points, badges, and leaderboards',
        'Designed microservices architecture with Docker containerization',
        'Deployed on AWS EC2 with CI/CD pipeline and zero-downtime deployments',
        'Integrated Redis for caching, reducing response time by 60%'
      ],
      technologies: ['Flask', 'React', 'MySQL', 'Redis', 'Docker', 'AWS', 'Nginx', 'JWT' , 'GenAi']
    }
  },
  
]

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isSingle = experienceData.length === 1

  const openModal = (exp) => {
    setSelectedExp(exp)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = ''
    setTimeout(() => setSelectedExp(null), 300)
  }

  const expHeader = (
    <div className="max-w-5xl mb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">
          Experience
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-bold">
          Where I've <span className="text-gradient">Worked</span>
        </h2>
      </motion.div>
    </div>
  )

  const expCards = experienceData.map((exp, i) => (
    <motion.div
      key={exp.company}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onClick={() => openModal(exp)}
      className="glass rounded-xl p-8 md:p-10 w-full min-h-[360px] group hover:border-primary/30 transition-all duration-500 cursor-pointer"
      style={isSingle ? { maxWidth: "820px" } : undefined}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground font-display">{exp.period}</p>
      </div>
      <h3 className="text-xl font-display font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
        {exp.role}
      </h3>
      <p className="text-primary/80 font-display text-sm mb-3">{exp.company}</p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {exp.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  ))

  return (
    <>
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {expHeader}
          <div className={`grid gap-6 md:gap-8 ${isSingle ? "md:grid-cols-1 justify-items-center" : "md:grid-cols-2"}`}>
            {expCards}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedExp && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={closeModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative glass rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl" onClick={closeModal}>×</button>

            <div className="mb-6">
              <h2 className="text-2xl font-display font-bold mb-2">{selectedExp.role}</h2>
              <p className="text-primary font-display">{selectedExp.company}</p>
              <p className="text-sm text-muted-foreground">{selectedExp.period} • {selectedExp.location}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-display font-semibold mb-2">About the Role</h3>
                <p className="text-muted-foreground">{selectedExp.fullDetails.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-display font-semibold mb-2">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {selectedExp.fullDetails.responsibilities.map((resp, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-display font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExp.fullDetails.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Experience
