import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { createPortal } from "react-dom"
import { ArrowUpRight, Github, X, Brain, Code2, Briefcase, Search } from "lucide-react"

const projectsData = [
  {
    title: 'HireLens',
    subtitle: 'AI Recruitment Platform',
    year: '2025',
    description: 'Full-stack AI recruitment platform automating resume screening with LLMs — Docker microservices with Nginx, Redis, and MySQL.',
    overview: 'An end-to-end AI recruitment platform that automates the entire hiring pipeline — from resume parsing to a secure, anti-cheat AI interview — cutting total hiring time by 70%.',
    highlights: [
      'Google Gemini AI for automated resume parsing, intelligent candidate scoring, and dynamic interview question generation with 95%+ accuracy.',
      'Secure AI interview system with anti-cheating mechanisms: device fingerprinting, tab-switch detection, and multi-device session validation.',
      'Flask REST APIs with JWT authentication and Redis-backed Token Bucket rate limiting for secure, scalable multi-user access.',
      'Deployed on AWS EC2 with Docker and Nginx; 99.9% uptime via container health checks, reducing total hiring pipeline time by 70%.',
    ],
    tags: ['Next.js', 'Flask', 'Docker', 'MySQL', 'Redis', 'AI'],
    link: 'https://github.com/Nikhilsangale2002/Hirelens',
    icon: 'Brain',
  },
  {
    title: 'ScrapeMind AI',
    subtitle: 'Universal AI Scraper Engine',
    year: '2025',
    description: 'Enterprise Chrome extension extracting product data from 500+ domains with multi-layer extraction and a Gemini-powered FastAPI backend (85%+ confidence).',
    overview: 'An enterprise-grade Chrome extension and FastAPI backend that extracts structured product data from 500+ e-commerce platforms using multi-layer extraction with an AI fallback.',
    highlights: [
      'Chrome Extension (Manifest V3) with Gemini LLM integration achieving 85%+ extraction confidence across 500+ e-commerce platforms.',
      'FastAPI backend with Token Bucket and Sliding Window rate-limiting at per-user and per-endpoint granularity.',
      'Real-time observability with Prometheus (40+ custom metrics) and Grafana dashboards, plus Sentry error tracking.',
      'Async job processing via RabbitMQ with dead-letter exchange and retry policies; GitHub Actions CI/CD for zero-downtime EC2 deploys.',
    ],
    tags: ['FastAPI', 'Gemini AI', 'RabbitMQ', 'Redis', 'Prometheus', 'CI/CD'],
    link: 'https://github.com/Nikhilsangale2002/ScraperMind-AI',
    icon: 'Search',
  },
  {
    title: 'ATS Resume Scoring',
    subtitle: 'Offline AI/NLP Scoring System',
    year: '2025',
    description: 'Production ATS scoring resumes against job descriptions with a 7-category weighted engine — spaCy extraction, Sentence Transformers, fully offline, <3s per resume.',
    overview: 'A production-grade ATS that analyzes resumes against job descriptions using local AI/NLP — no external API keys required and fully offline capable.',
    highlights: [
      '7-category weighted scoring engine: Technical Skills, Experience, Education, Certifications, Semantic Match, Format, and Soft Skills.',
      'PDF/DOCX parsing with multi-library fallback, spaCy skill extraction, and Sentence Transformers semantic matching.',
      'JWT auth with refresh tokens, Redis sliding-window rate limiting, and Celery async workers.',
      'Processes resumes in <3s with 500+ skill normalizations and handles 100+ req/min.',
    ],
    tags: ['FastAPI', 'Next.js', 'spaCy', 'Sentence Transformers', 'Redis', 'Docker'],
    link: 'https://github.com/Nikhilsangale2002/Resume_ATS_System',
    icon: 'Briefcase',
  },
  {
    title: 'Portfolio',
    subtitle: 'This Website',
    year: '2026',
    description: 'Personal portfolio built with React + Vite — editorial type, scroll-linked motion, and a print-to-PDF hero.',
    overview: 'This site — a personal portfolio focused on editorial typography, scroll-linked motion, and interaction details.',
    highlights: [
      'Built with React + Vite and Tailwind CSS with a custom editorial design system.',
      'Scroll-linked parallax and staggered reveal animations powered by Framer Motion.',
      'Print-to-PDF hero export that preserves the dark theme.',
    ],
    tags: ['React', 'Vite', 'Framer Motion', 'Tailwind'],
    link: 'https://nikhilsangale2002.github.io/Portfolio/',
    icon: 'Code2',
  },
]

const iconMap = { Brain, Code2, Briefcase, Search }

const Projects = () => {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 250, damping: 28, mass: 0.4 })
  const y = useSpring(my, { stiffness: 250, damping: 28, mass: 0.4 })

  const handleMouseMove = (e) => {
    mx.set(e.clientX)
    my.set(e.clientY)
  }

  const openModal = (project) => {
    setSelected(project)
    document.body.style.overflow = 'hidden'
  }
  const closeModal = () => {
    setSelected(null)
    document.body.style.overflow = ''
  }

  const HoverIcon = hovered !== null ? iconMap[projectsData[hovered].icon] : null
  const SelectedIcon = selected ? iconMap[selected.icon] : null

  return (
    <section id="projects" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase">02</span>
          <span className="h-px flex-1 max-w-[80px] bg-border" />
          <p className="text-muted-foreground font-display text-sm tracking-[0.3em] uppercase">Selected Work</p>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-display font-bold mb-3">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground text-sm mb-12 md:mb-16">Click a project to see details &amp; open the repository.</p>

        {/* Index rows */}
        <div onMouseMove={handleMouseMove}>
          {projectsData.map((project, i) => {
            const Icon = iconMap[project.icon]
            const isHovered = hovered === i
            const dimmed = hovered !== null && !isHovered
            return (
              <motion.button
                key={project.title}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => openModal(project)}
                className="group relative block w-full text-left border-t border-border last:border-b"
              >
                {/* sweep fill on hover */}
                <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-primary/[0.04] transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <div
                  className={`relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-8 py-7 md:py-9 transition-all duration-500 ${
                    dimmed ? "opacity-40" : "opacity-100"
                  }`}
                >
                  {/* index + mobile icon */}
                  <div className="flex items-center gap-4">
                    <span className={`font-display text-sm tabular-nums transition-colors duration-300 ${isHovered ? "text-primary" : "text-muted-foreground/50"}`}>
                      0{i + 1}
                    </span>
                    <span className="md:hidden w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </span>
                  </div>

                  {/* title block */}
                  <div className="min-w-0 md:flex md:items-baseline md:gap-4 md:transition-transform md:duration-500 md:group-hover:translate-x-3">
                    <h3 className={`font-display font-bold text-2xl md:text-4xl tracking-tight transition-colors duration-300 ${isHovered ? "text-primary" : "text-foreground"}`}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base mt-1 md:mt-0">{project.subtitle}</p>
                  </div>

                  {/* meta */}
                  <div className="flex items-center gap-4 md:gap-6 shrink-0">
                    <span className="hidden sm:block text-sm text-muted-foreground tabular-nums">{project.year}</span>
                    <ArrowUpRight
                      className={`w-6 h-6 md:w-7 md:h-7 transition-all duration-300 ${
                        isHovered ? "text-primary translate-x-1 -translate-y-1" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                </div>

                {/* tags row */}
                <div className="relative z-10 flex flex-wrap gap-2 pb-7 md:pb-8 md:pl-[3.25rem]">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Cursor-following preview (desktop) */}
      <AnimatePresence>
        {hovered !== null && !selected && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-2xl bg-gradient-to-br from-primary to-amber-300 flex flex-col items-center justify-center gap-3 shadow-2xl shadow-primary/30">
              {HoverIcon && <HoverIcon className="w-10 h-10 text-primary-foreground" />}
              <span className="font-display font-bold text-primary-foreground text-sm tracking-wide">
                {projectsData[hovered].title}
              </span>
              <span className="text-primary-foreground/70 text-[11px] font-display uppercase tracking-[0.2em]">
                View Details
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail modal */}
      {selected && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative glass rounded-2xl p-7 md:p-9 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
              onClick={closeModal}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                {SelectedIcon && <SelectedIcon className="w-7 h-7 text-primary" />}
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold">{selected.title}</h3>
                <p className="text-primary/80 text-sm">{selected.subtitle} · {selected.year}</p>
              </div>
            </div>

            <p className="text-foreground/90 leading-relaxed mb-7">{selected.overview}</p>

            <h4 className="text-sm font-display font-semibold uppercase tracking-wider text-muted-foreground mb-3">Highlights</h4>
            <ul className="space-y-3 mb-8">
              {selected.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-8">
              {selected.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={selected.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-medium rounded-lg hover:brightness-110 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              View Repository
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>,
        document.body
      )}
    </section>
  )
}

export default Projects
