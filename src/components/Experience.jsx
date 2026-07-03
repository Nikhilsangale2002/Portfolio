import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Reveal from "./Reveal"
import reclaimIcon from "../assets/reclaim/reclaim-icon.jpg"
import carecallerIcon from "../assets/app_icon_carecaller.svg"
import reclaimPhone1 from "../assets/reclaim/phone-1.png"
import reclaimPhone2 from "../assets/reclaim/phone-2.png"
import reclaimPhone3 from "../assets/reclaim/phone-3.png"
import reclaimPhone4 from "../assets/reclaim/phone-4.png"
import reclaimPhone5 from "../assets/reclaim/phone-5.png"
import reclaimPhone6 from "../assets/reclaim/phone-6.png"

const AppleIcon = (props) => (
  <svg viewBox="0 0 384 512" fill="currentColor" {...props}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
)

const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.25.92-.59 1.19l-2.27 1.31-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
  </svg>
)

const ChromeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 20l3.46-6h-.01c.34-.6.55-1.27.55-2 0-1.2-.54-2.27-1.38-3h4.79c.38.93.59 1.94.59 3a8 8 0 0 1-8 8M4 12c0-1.46.39-2.82 1.07-4l3.47 6h.01A3.99 3.99 0 0 0 12 16c.45 0 .88-.08 1.29-.21l-2.4 4.15C7 19.4 4 16.05 4 12m11 0a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3M12 4c2.96 0 5.54 1.61 6.92 4H12c-1.94 0-3.55 1.38-3.92 3.21L5.7 7.08C7.16 5.21 9.44 4 12 4m0-2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z" />
  </svg>
)

const badgeCopy = {
  apple: { hint: "Download on the", label: "App Store", Icon: AppleIcon },
  play: { hint: "Get it on", label: "Google Play", Icon: PlayIcon },
  chrome: { hint: "Available in the", label: "Chrome Web Store", Icon: ChromeIcon },
}

const StoreBadge = ({ href, kind }) => {
  const { hint, label, Icon } = badgeCopy[kind]
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 px-4 py-2 rounded-lg border border-border bg-secondary/40 hover:border-primary/50 hover:bg-secondary/70 transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{hint}</span>
        <span className="text-sm font-display font-semibold">{label}</span>
      </span>
    </a>
  )
}

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
    technologies: ['Go (Fiber)', 'FastAPI', 'Gemini Live', 'Flutter', 'AWS EC2','AWS SES', 'AWS S3', 'Cloudflare', 'Nginx','CICD', 'Git Actions', 'Docker', 'Redis', 'Prometheus', 'Grafana', 'Sentry', 'Razorpay'],
    app: {
      icon: carecallerIcon,
    },
  },
  {
    role: 'Full Stack Developer',
    company: 'Alhat Holdings',
    project: 'Reclaim — Shopping Platform',
    period: 'Jan 2025 — Jun 2026',
    location: 'Remote',
    description: 'Developing an AI-powered sustainable fashion platform that simplifies resale and recycling. Built a cross-platform mobile app with AI image analysis, digital closet management, donation logistics, and a rewards ecosystem.',
    responsibilities: [
      'Gemini Vision API for multi-image attribute extraction + OCR fusion; a confidence-scoring pipeline cut manual data entry by 60% across 900+ domains.',
      'Full-stack e-commerce platform with 100+ Flask REST APIs and a React.js frontend across a 6-service microservices architecture.',
      'Chrome Extension (Manifest V3) with a multi-layer scraping engine supporting 900+ domains via JSON-LD, Microdata & DOM parsing.',
      'Production infra on AWS EC2 with Docker Compose + Nginx, holding 99.9% uptime and sub-100ms routing overhead via health checks.',
      'AI-powered image analysis for automatic clothing categorization',
      'Digital closet management with smart organization',
      'Donation logistics and pickup scheduling',
      'Rewards ecosystem with gamification elements',
      'Real-time push notifications & in-app events',
      'Social features – invite friends & referral system',
      'Multi-authentication (Google, Apple, Email, Phone)',
    ],
    technologies: ['Flask', 'React.js', 'Gemini Vision', 'MySQL', 'Redis', 'CICD', 'Git Actions', 'Docker', 'Nginx', 'AWS EC2','AWS S3' , 'AWS RDS' , 'Brevo', 'Chrome Extension'],
    app: {
      icon: reclaimIcon,
      screens: [reclaimPhone1, reclaimPhone2, reclaimPhone3, reclaimPhone4, reclaimPhone5, reclaimPhone6],
      appStore: 'https://apps.apple.com/in/app/reclaim/id6744350699',
      playStore: 'https://play.google.com/store/apps/details?id=com.world.Reclaim',
      chromeStore: 'https://chromewebstore.google.com/detail/reclaim/loihekpmijphnlhoegfphgpnegohefkl',
    },
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
          <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase">03</span>
          <span className="h-px flex-1 max-w-[80px] bg-border" />
          <p className="text-muted-foreground font-mono text-xs tracking-[0.25em] uppercase">/Experience</p>
        </motion.div>

        <Reveal onScroll className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Where I've <span className="text-gradient">Worked</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-14">
          {/* Master: selectable role list */}
          <div className="flex flex-col min-w-0">
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
          <div className="relative min-h-[420px] min-w-0">
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

                <div className="flex items-start gap-4">
                  {exp.app && (
                    <img
                      src={exp.app.icon}
                      alt={`${exp.project} app icon`}
                      className="w-14 h-14 rounded-2xl border border-border shadow-lg shadow-primary/10 shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-primary font-display text-xs tracking-[0.25em] uppercase mb-3">
                      {exp.project}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-display font-bold">{exp.role}</h3>
                    <p className="text-muted-foreground text-sm mt-2 mb-6">
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                </div>

                <p className="text-foreground/90 leading-relaxed mb-7">{exp.description}</p>

                {exp.app?.appStore && (
                  <div className="flex flex-wrap items-center gap-3 mb-7 no-print">
                    <StoreBadge href={exp.app.appStore} kind="apple" />
                    <StoreBadge href={exp.app.playStore} kind="play" />
                    {exp.app.chromeStore && <StoreBadge href={exp.app.chromeStore} kind="chrome" />}
                  </div>
                )}
                {exp.app?.screens && (
                  <div className="screens-wrap relative overflow-hidden mb-8 no-print">
                    <div className="screens-track">
                      {[...exp.app.screens, ...exp.app.screens].map((src, i) => (
                        <div key={i} className="phone-frame">
                          <img src={src} alt={`${exp.project} app screenshot`} loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
