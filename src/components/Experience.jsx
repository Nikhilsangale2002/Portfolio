import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const experienceData = [
  {
    role: 'AI Software Developer',
    company: 'CareCaller',
    project: 'AI Voice Companion',
    period: 'Jun 2026 — Present',
    location: 'Self-Initiated • Remote',
    description: 'Architected and built a production real-time AI voice platform delivering realistic, low-latency conversations across six companions.',
    responsibilities: [
      'Production voice platform on AWS EC2 with Cloudflare edge, an Nginx reverse proxy with rate limiting, and a Docker Compose dual-service backend — Go Fiber relay for audio + FastAPI for auth, credits & payments.',
      'Low-latency pipeline (Flutter → Cloudflare → Nginx → Go Relay → Gemini Live) hitting ~433ms TTFT (~309ms best-case) by removing DB/Redis from the hot path and parallel goroutine tool calls.',
      'Gemini 2.5 Flash native-audio-dialog with server-side VAD, on-device AEC + barge-in, and auto-reconnect with exponential backoff across 6 companions.',
      'Full observability — Prometheus (8 metrics incl. TTFT histogram), Grafana, Sentry — plus Razorpay HMAC-SHA256 billing and async S3 recording storage.',
    ],
    technologies: ['Go (Fiber)', 'FastAPI', 'Gemini Live', 'Flutter', 'AWS EC2','AWS SES', 'AWS S3', 'Cloudflare', 'Nginx', 'Docker', 'Redis', 'Prometheus', 'Grafana', 'Sentry', 'Razorpay'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Alhat Holdings',
    project: 'Reclaim — Shopping Platform',
    period: 'Jan 2025 — Jun 2026',
    location: 'Remote',
    description: 'Owned full-stack development of Reclaim — a microservices backend, React frontend, and an AI-driven product-data pipeline.',
    responsibilities: [
      'Gemini Vision API for multi-image attribute extraction + OCR fusion; a confidence-scoring pipeline cut manual data entry by 60% across 900+ domains.',
      'Full-stack e-commerce platform with 100+ Flask REST APIs and a React.js frontend across a 6-service microservices architecture.',
      'Chrome Extension (Manifest V3) with a multi-layer scraping engine supporting 900+ domains via JSON-LD, Microdata & DOM parsing.',
      'Production infra on AWS EC2 with Docker Compose + Nginx, holding 99.9% uptime and sub-100ms routing overhead via health checks.',
    ],
    technologies: ['Flask', 'React.js', 'Gemini Vision', 'MySQL', 'Redis', 'Docker', 'Nginx', 'AWS EC2', 'Microservices', 'Chrome Extension'],
  },
]

const Experience = () => {
  const [active, setActive] = useState(0)
  const exp = experienceData[active]

  return (
    <section id="experience" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase">03</span>
          <span className="h-px flex-1 max-w-[80px] bg-border" />
          <p className="text-muted-foreground font-display text-sm tracking-[0.3em] uppercase">Experience</p>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 md:mb-16">
          Where I've <span className="text-gradient">Worked</span>
        </h2>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14">
          {/* Master: selectable role list */}
          <div className="flex flex-col">
            {experienceData.map((item, i) => {
              const isActive = i === active
              return (
                <button
                  key={item.company}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group relative text-left py-6 border-t border-border last:border-b"
                >
                  {/* active accent bar */}
                  <span
                    className={`absolute left-0 top-0 h-full w-[2px] bg-primary origin-top transition-transform duration-500 ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                  <div className="flex items-baseline gap-4 pl-5">
                    <span
                      className={`font-display text-sm tabular-nums transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground/50"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <h3
                        className={`font-display font-bold text-xl md:text-2xl transition-colors duration-300 ${
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {item.role}
                      </h3>
                      <p className={`text-sm mt-1 transition-colors duration-300 ${isActive ? "text-primary/90" : "text-muted-foreground"}`}>
                        {item.company} · {item.period}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Detail: animated panel for active role */}
          <div className="relative min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.article
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative glass rounded-2xl p-7 md:p-9 overflow-hidden"
              >
                {/* watermark index */}
                <span className="pointer-events-none absolute -top-8 -right-2 font-display font-bold text-[9rem] leading-none text-primary/[0.06] select-none">
                  0{active + 1}
                </span>

                <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-3">
                  {exp.project}
                </p>
                <h3 className="text-2xl md:text-3xl font-display font-bold">{exp.role}</h3>
                <p className="text-muted-foreground text-sm mt-2 mb-6">
                  {exp.company} · {exp.location}
                </p>

                <p className="text-foreground/90 leading-relaxed mb-7">{exp.description}</p>

                <ul className="space-y-3 mb-8">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                  {exp.technologies.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
