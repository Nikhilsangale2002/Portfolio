import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Code2, Brain, Briefcase, Search } from "lucide-react"

const projectsData = [
  {
    title: 'HireLens – AI Recruitment Platform',
    description: 'Full-stack AI recruitment platform using Next.js and Flask, automating resume screening with LLMs. Docker-based microservices with Nginx, Redis, and MySQL.',
    tags: ['Next.js', 'Flask', 'Docker', 'MySQL', 'Redis', 'AI'],
    link: 'https://github.com/Nikhilsangale2002/Hirelens',
    icon: 'Brain'
  },
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio built with React + Vite featuring modern glassmorphism design, 3D interactive elements, and custom scroll animations.',
    tags: ['React', 'Vite', 'Three.js', 'CSS'],
    link: 'https://nikhilsangale2002.github.io/Portfolio/',
    icon: 'Code2'
  },
  {
    title: 'Resume ATS System',
    description: 'AI-powered ATS using Python, Streamlit and Generative AI (Gemini Pro API) with ~90% accuracy for resume analysis and JD matching.',
    tags: ['Python', 'Streamlit', 'Gemini AI', 'MySQL'],
    link: 'https://github.com/Nikhilsangale2002/Resume_ATS_System',
    icon: 'Briefcase'
  },
  {
    title: 'ScrapeMind AI – Universal AI Scraper Engine',
    description: 'Enterprise-grade Chrome extension (Manifest V3) extracting product data from 500+ e-commerce domains using multi-layer extraction (JSON-LD, Microdata, DOM, AI fallback). FastAPI backend with Gemini LLM achieving 85%+ extraction confidence, Token Bucket rate limiting, abuse detection with threat classification, Prometheus/Grafana monitoring (40+ metrics), RabbitMQ async processing, JWT auth with RBAC, and CI/CD via GitHub Actions with Sentry integration.',
    tags: ['FastAPI', 'Gemini AI', 'MySQL', 'Redis', 'RabbitMQ', 'Docker', 'Chrome Extension', 'CI/CD'],
    link: 'https://github.com/Nikhilsangale2002/ScraperMind-AI',
    icon: 'Search'
  }
]

const iconMap = { Brain, Code2, Briefcase, Search }

const Projects = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"])

  const header = (
    <div className="max-w-5xl mx-auto px-6 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">
          Selected Work
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-bold">
          Featured <span className="text-gradient">Projects</span>
        </h2>
      </motion.div>
    </div>
  )

  const cards = projectsData.map((project, i) => {
    const Icon = iconMap[project.icon]
    return (
      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 * i }}
        onClick={() => project.link && window.open(project.link, '_blank')}
        className="group glass rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-500 w-[85vw] md:w-[480px] lg:w-[620px] min-h-[400px] flex-shrink-0 cursor-pointer snap-center"
      >
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <div className="flex gap-2">
              {project.link && (
                <button className="p-2.5 glass rounded-full hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    )
  })

  return (
    <>
      {/* Anchor for #projects link */}
      <div id="projects" />

      {/* Mobile: touch snap scroll */}
      <section className="md:hidden py-20 px-0">
        <div className="px-6 mb-10">{header}</div>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pl-6 pr-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {cards}
        </div>
        <div className="flex justify-center gap-1.5 mt-5">
          {projectsData.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          ))}
        </div>
      </section>

      {/* Desktop: scroll-driven sticky */}
      <section ref={containerRef} className="relative hidden md:block" style={{ height: "320vh" }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {header}
          <motion.div style={{ x }} className="flex gap-8 pl-24 w-max">
            {cards}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Projects


