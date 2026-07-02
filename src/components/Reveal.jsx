import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1]

// Masked line reveal. Animates on mount by default; pass `onScroll` to
// trigger when the element enters the viewport instead.
// pb/-mb give descenders (e.g. the "g") room so the mask doesn't clip them
const Reveal = ({ children, delay = 0, className = "", onScroll = false }) => {
  const trigger = onScroll
    ? { whileInView: { y: 0 }, viewport: { once: true, margin: "-80px" } }
    : { animate: { y: 0 } }
  return (
    <div className="overflow-hidden pb-[0.35em] -mb-[0.35em]">
      <motion.div
        initial={{ y: "110%" }}
        {...trigger}
        transition={{ duration: 0.9, delay, ease }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Blur-to-sharp rise on scroll into view
export const BlurIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
)

export default Reveal
