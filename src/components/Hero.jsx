import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, lazy, Suspense } from "react"
import { ArrowDown, Download, ArrowUpRight } from "lucide-react"
import Reveal from "./Reveal"

const AuroraBackground = lazy(() => import("./AuroraBackground"))

const ease = [0.22, 1, 0.36, 1]

const skills = [
  "React", "Next.js", "Python", "Flask", "Node.js", "Docker", "AWS",
  "MySQL", "Redis", "MongoDB", "TypeScript", "Tailwind", "CI/CD", "RabbitMQ",
]

// Black hero in the Charn style: giant edge-to-edge wordmark, molten orange
// aurora rising from the bottom, tiny mono meta labels.
const Hero = () => {
  const handleDownloadPdf = () => window.print()

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  // Parallax: content drifts up + fades, marquee slides as you scroll
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -120])
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505] text-white">
      {/* Molten orange silk */}
      <Suspense fallback={null}>
        <AuroraBackground />
      </Suspense>

      {/* Top meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-24 md:pt-28 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50"
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff7a00] opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff7a00]" />
          </span>
          Available for work
        </span>
        <span className="hidden sm:block">Portfolio &mdash; 2026</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex flex-col justify-center"
      >
        {/* Giant edge-to-edge wordmark */}
        <motion.h1
          style={{ scale: nameScale }}
          className="origin-center px-2 md:px-4 font-display font-bold uppercase leading-[0.9] tracking-[-0.03em] text-center text-[clamp(3.5rem,12.5vw,12rem)]"
        >
          <Reveal delay={0.25}>
            <span className="block">Nikhil</span>
          </Reveal>
          <Reveal delay={0.4}>
            <span className="block">Sangale</span>
          </Reveal>
        </motion.h1>

        {/* Role: italic + light, like the reference */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease }}
          className="mt-10 md:mt-14 text-center"
        >
          <p className="font-body italic font-light text-xl md:text-3xl text-white/85">
            Full-Stack Developer
          </p>
          <p className="font-body italic font-light text-xl md:text-3xl text-[#ff9a3c] mt-1">
            &amp; AI/GenAI Engineer
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 no-print"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-display font-medium rounded-full hover:bg-white/90 transition-all duration-300"
          >
            View Projects
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-white/25 text-white font-display font-medium rounded-full hover:border-white/60 transition-all duration-300"
          >
            Get in Touch
          </a>
          <button
            onClick={handleDownloadPdf}
            aria-label="Download as PDF"
            className="group flex items-center justify-center w-12 h-12 border border-white/25 rounded-full text-white hover:border-white/60 transition-all duration-300"
          >
            <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </motion.div>
      </motion.div>

      {/* Skills marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-10 border-t border-white/10 py-4 overflow-hidden"
      >
        <motion.div style={{ x: marqueeX }} className="marquee-track">
          {[...skills, ...skills].map((skill, i) => (
            <span key={i} className="flex items-center whitespace-nowrap font-mono text-xs uppercase tracking-[0.15em] text-white/40">
              <span className="mx-7">{skill}</span>
              <span className="text-[#ff7a00]/50">&#9679;</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-24 right-6 md:right-10 z-10 no-print"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
