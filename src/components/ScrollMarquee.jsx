import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// Giant outlined text strip that slides horizontally as the page scrolls past it.
// `direction` 1 slides left, -1 slides right.
const ScrollMarquee = ({ text, direction = 1 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const x = useTransform(scrollYProgress, [0, 1], direction === 1 ? ["2%", "-22%"] : ["-22%", "2%"])

  return (
    <div ref={ref} aria-hidden="true" className="relative overflow-hidden py-6 md:py-10 select-none no-print">
      <motion.div
        style={{ x }}
        className="whitespace-nowrap font-display font-bold uppercase leading-none tracking-tight text-outline text-[clamp(4.5rem,11vw,10rem)]"
      >
        {Array.from({ length: 6 }, () => text).join("  —  ")}
      </motion.div>
    </div>
  )
}

export default ScrollMarquee
