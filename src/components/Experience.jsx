import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Briefcase } from "lucide-react"

const experienceData = [
  {
    role: 'Full-stack Developer',
    company: 'Reclaim',
    period: 'July 2025 – Present',
    location: 'Remote, India',
    description: 'Leading full-stack development for a social impact platform focused on environmental sustainability.',
    tags: ['Flask', 'React', 'AWS', 'Docker'],
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
      technologies: ['Flask', 'React', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Nginx', 'JWT']
    }
  },
  {
    role: 'Software Developer',
    company: 'RSL Solution',
    period: 'Jan 2025 – July 2025',
    location: 'Pune, India',
    description: 'Developed enterprise-level web applications and AI-powered solutions for HR tech and recruitment.',
    tags: ['Next.js', 'Flask', 'MySQL', 'AI'],
    fullDetails: {
      description: 'Developed enterprise-level web applications and AI-powered solutions for HR tech and recruitment automation.',
      responsibilities: [
        'Developed HireLens AI recruitment platform with Next.js and Flask',
        'Built AI-powered resume screening system using LLMs achieving 90% accuracy',
        'Designed RESTful APIs with comprehensive error handling',
        'Implemented Docker-based microservices architecture',
        'Collaborated in Agile/Scrum teams with daily standups'
      ],
      technologies: ['React.js', 'Next.js', 'Flask', 'MySQL', 'Docker', 'Nginx', 'Redis', 'OpenAI API']
    }
  },
  {
    role: 'Software Developer',
    company: 'Hashedbit Innovation',
    period: 'Mar 2024 – July 2024',
    location: 'Remote, India',
    description: 'Built full-stack web applications and learned industry best practices in a startup environment.',
    tags: ['React', 'Node.js', 'MySQL', 'Git'],
    fullDetails: {
      description: 'Started my professional journey building full-stack web applications and learning industry best practices.',
      responsibilities: [
        'Developed responsive web interfaces using React.js and modern CSS',
        'Designed RESTful APIs following REST principles',
        'Created and optimized MySQL database schemas',
        'Performed API testing using Postman',
        'Used Git for version control and code reviews'
      ],
      technologies: ['React.js', 'Node.js', 'Express', 'MySQL', 'JavaScript', 'HTML/CSS', 'Git', 'Postman']
    }
  }
]

const Experience = () => {
  const containerRef = useRef(null)
  const [selectedExp, setSelectedExp] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"])

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
    <div className="max-w-5xl mx-auto px-6 mb-10">
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
      className="glass rounded-xl p-8 md:p-10 w-[85vw] md:w-[480px] lg:w-[620px] min-h-[400px] flex-shrink-0 group hover:border-primary/30 transition-all duration-500 cursor-pointer snap-center"
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
      {/* Mobile: touch snap scroll */}
      <section id="experience" className="md:hidden py-20">
        <div className="mb-10">{expHeader}</div>
        <div
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pl-6 pr-6 pb-4"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {expCards}
        </div>
        <div className="flex justify-center gap-1.5 mt-5">
          {experienceData.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          ))}
        </div>
      </section>

      {/* Desktop: scroll-driven sticky */}
      <section ref={containerRef} className="relative hidden md:block" style={{ height: "250vh" }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {expHeader}
          <motion.div style={{ x }} className="flex gap-6 pl-24 w-max">
            {expCards}
          </motion.div>
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
