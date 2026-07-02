import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

// Apple device-setup intro: "hello" cycles through languages on black,
// then the page fades in. First greeting writes itself (stroke draw),
// the rest swap quickly like the iPhone setup screen.
const greetings = [
  "hello",
  "नमस्ते",
  "こんにちは",
  "hola",
  "bonjour",
  "你好",
  "ciao",
  "안녕하세요",
  "olá",
]

const FIRST_MS = 1500 // the drawn English hello lingers
const STEP_MS = 350 // each following language
const FADE_MS = 700 // overlay fade to the page

const HelloIntro = ({ onReveal, onDone }) => {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (index < greetings.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? FIRST_MS : STEP_MS)
      return () => clearTimeout(t)
    }
    // last greeting shown — hold briefly, then fade the overlay out
    const hold = setTimeout(() => {
      setLeaving(true)
      onReveal()
    }, 600)
    return () => clearTimeout(hold)
  }, [index, onReveal])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(onDone, FADE_MS)
    return () => clearTimeout(t)
  }, [leaving, onDone])

  return (
    <motion.div
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      {index === 0 ? (
        <svg className="hello-svg" viewBox="0 0 360 160" width="min(70vw, 360px)" aria-label="hello">
          <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle">
            hello
          </text>
        </svg>
      ) : (
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="font-hand text-[#f5f5f7] text-6xl md:text-7xl select-none"
          >
            {greetings[index]}
          </motion.p>
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default HelloIntro
