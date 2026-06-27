import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, Download, ArrowUpRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1]

const Reveal = ({ children, delay = 0, className = "" }) => (
  // pb/-mb give descenders (e.g. the "g") room so the mask doesn't clip them
  <div className="overflow-hidden pb-[0.35em] -mb-[0.35em]">
    <motion.div
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  </div>
)

const skills = [
  "React", "Next.js", "Python", "Flask", "Node.js", "Docker", "AWS",
  "MySQL", "Redis", "MongoDB", "TypeScript", "Tailwind", "CI/CD", "RabbitMQ",
]

const Hero = () => {
  const handleDownloadPdf = () => window.print()

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  // Parallax: content drifts up + fades, glow sinks, marquee slides as you scroll
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute -top-32 right-[8%] w-[520px] h-[520px] rounded-full bg-primary/10 blur-[140px] pointer-events-none"
      />

      {/* Top meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-28 md:pt-32 text-[11px] md:text-xs font-body uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for work
        </span>
        <span className="hidden sm:block">Portfolio &mdash; 2026</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex items-center px-6 md:px-12"
      >
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left: role + name */}
          <div className="lg:col-span-8">
            <Reveal delay={0.15} className="text-primary font-display text-xs md:text-sm tracking-[0.35em] uppercase mb-6">
              Software Developer / Full-Stack Engineer / AI/GenAI Engineer
            </Reveal>

            <h1 className="font-display font-bold leading-[0.86] tracking-tight text-[clamp(3.25rem,12vw,11rem)]">
              <Reveal delay={0.3}>
                <span className="block">Nikhil</span>
              </Reveal>
              <Reveal delay={0.42}>
                {/* pb extends the gradient's paint box so the "g" descender isn't dropped */}
                <span className="block text-gradient pb-[0.2em] -mb-[0.2em]">Sangale</span>
              </Reveal>
            </h1>
          </div>

          {/* Right: description + actions */}
          <div className="lg:col-span-4 lg:pb-3">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 1.2, ease }}
              className="h-px bg-border origin-left mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease }}
              className="text-muted-foreground text-base leading-relaxed font-body mb-8"
            >
              Crafting scalable web applications and AI-powered solutions.
              Specialized in backend architecture, cloud deployment, and modern frontend frameworks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease }}
              className="flex flex-wrap items-center gap-3 no-print"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-medium rounded-lg hover:brightness-110 transition-all duration-300"
              >
                View Projects
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border text-foreground font-display font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                Get in Touch
              </a>
              <button
                onClick={handleDownloadPdf}
                aria-label="Download as PDF"
                className="group flex items-center justify-center w-12 h-12 border border-border rounded-lg text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Skills marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-10 border-t border-border py-4 overflow-hidden"
      >
        <motion.div style={{ x: marqueeX }} className="marquee-track">
          {[...skills, ...skills].map((skill, i) => (
            <span key={i} className="flex items-center whitespace-nowrap font-body text-sm text-muted-foreground/70">
              <span className="mx-7">{skill}</span>
              <span className="text-primary/40">&#9679;</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-24 right-6 md:right-12 z-10 no-print"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
