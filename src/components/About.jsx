import { motion, useInView, animate, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Reveal, { BlurIn } from "./Reveal"

const skillGroups = [
  { title: "Frontend", items: ["React.js", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"] },
  { title: "Backend & DB", items: ["Python (Flask, FastAPI)", "Go (Fiber)", "REST APIs", "PostgreSQL", "MySQL", "Redis"] },
  { title: "AI / GenAI", items: ["Gemini AI (Vision, Live)", "GPT-4o Realtime", "RAG", "Prompt Engineering", "NLP", "Sentence Transformers"] },
  { title: "Cloud & DevOps", items: ["AWS (EC2, S3, SES, RDS)", "Docker", "Docker Compose", "Nginx", "GitHub Actions CI/CD", "Cloudflare"] },
  { title: "Monitoring", items: ["Prometheus", "Grafana", "Sentry", "RabbitMQ"] },
  { title: "Other", items: ["Flutter", "WebSocket", "Firebase Auth", "Razorpay", "Git", "Linux", "Postman", "Agile/Scrum"] },
]

const stats = [
  { to: 1.5, decimals: 1, suffix: "+", label: "Years Exp." },
  { to: 10, decimals: 0, suffix: "+", label: "Projects" },
  { to: 25, decimals: 0, suffix: "+", label: "Technologies" },
]

const Counter = ({ to, decimals = 0, suffix = "", inView }) => {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Subtle depth: the dossier card drifts against the scroll direction
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], [48, -48])

  return (
    <section id="about" className="relative py-28 md:py-36 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-primary font-mono text-xs tracking-[0.25em] uppercase">01</span>
          <span className="h-px flex-1 max-w-[80px] bg-border" />
          <p className="text-muted-foreground font-mono text-xs tracking-[0.25em] uppercase">/About Me</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: profile dossier card */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <motion.div style={{ y: cardY }} className="relative glass rounded-2xl p-7 md:p-8 overflow-hidden">
              {/* monogram watermark */}
              <span className="pointer-events-none absolute -top-10 -right-4 font-display font-bold text-[10rem] leading-none text-primary/[0.05] select-none">
                NS
              </span>

              {/* identity */}
              <div className="relative flex items-center gap-4 mb-7">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="font-display font-bold text-2xl text-primary-foreground">NS</span>
                </div>
                <div>
                  <p className="font-display font-bold text-xl leading-tight">Nikhil Sangale</p>
                  <p className="text-muted-foreground text-sm">Full Stack &amp; AI/GenAI Engineer</p>
                </div>
              </div>

              {/* status chips */}
              <div className="relative flex flex-wrap gap-2 mb-8">
                <span className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Available for work
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">Based in India</span>
                <span className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">Remote</span>
              </div>

              {/* animated stats */}
              <div className="relative grid grid-cols-3 gap-4 pt-7 border-t border-border">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl md:text-4xl font-display font-bold text-gradient">
                      <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} inView={isInView} />
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1.5 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.aside>

          {/* Right: statement + bio + capabilities */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <Reveal onScroll className="mb-7">
              <h2 className="text-3xl md:text-[2.75rem] font-display font-bold leading-[1.1]">
                I design and ship{" "}
                <span className="text-gradient">full-stack products</span> &mdash; from API
                architecture to <span className="text-gradient">production AI</span>.
              </h2>
            </Reveal>
            <BlurIn className="text-muted-foreground text-lg leading-relaxed mb-5 max-w-2xl">
              Full Stack Developer and AI/GenAI Engineer with 1.5+ years building scalable
              web apps and production AI features &mdash; LLM integration, RAG pipelines, and
              real-time voice systems.
            </BlurIn>
            <BlurIn delay={0.1} className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-2xl">
              I own the full lifecycle: system architecture, API design, and containerized
              deployment on AWS with Docker and CI/CD &mdash; with a track record of 99.9%
              uptime and sub-100ms latency.
            </BlurIn>

            {/* Capabilities index */}
            <p className="text-sm text-muted-foreground uppercase tracking-[0.3em] mb-2 font-display">
              Capabilities
            </p>
            <div>
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + gi * 0.08 }}
                  className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 py-4 border-t border-border last:border-b"
                >
                  <p className="text-primary/90 text-sm font-display font-semibold uppercase tracking-wider pt-0.5">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
