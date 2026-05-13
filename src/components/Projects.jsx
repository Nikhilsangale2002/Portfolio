import { motion } from "framer-motion"
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
    title: 'ATS Resume Scoring System',
    description: 'Production-grade ATS that analyzes resumes against job descriptions using local AI/NLP — no external API keys required. Features a 7-category weighted scoring engine (Technical Skills, Experience, Education, Certifications, Semantic Match, Format, Soft Skills), PDF/DOCX parsing with multi-library fallback, spaCy skill extraction, Sentence Transformers semantic matching, JWT auth with refresh tokens, Redis sliding-window rate limiting, and Celery async workers. Processes resumes in <3s with 500+ skill normalizations, handles 100+ req/min, fully offline capable.',
    tags: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'MySQL', 'Redis', 'Docker', 'spaCy', 'Sentence Transformers'],
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
  const header = (
    <div className="max-w-5xl mb-12">
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
        className="group glass rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-500 w-full min-h-[360px] cursor-pointer"
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
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {header}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {cards}
        </div>
      </div>
    </section>
  )
}

export default Projects


