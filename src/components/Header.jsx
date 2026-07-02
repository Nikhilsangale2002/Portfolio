import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const menuLinks = ["About", "Projects", "Experience", "Contact"]

// Charn-style nav: tiny mono uppercase links on a transparent bar.
// mix-blend-difference keeps them white on the black hero and ink on light sections.
const Header = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white"
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-14 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
          <a href="#about" className="hidden md:block opacity-80 hover:opacity-100 transition-opacity duration-300">
            /About Me
          </a>

          <a href="#home" className="md:absolute md:left-1/2 md:-translate-x-1/2 font-semibold tracking-[0.25em] opacity-90 hover:opacity-100 transition-opacity duration-300">
            Nikhil Sangale
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#projects" className="opacity-80 hover:opacity-100 transition-opacity duration-300">/All Projects</a>
            <a href="#experience" className="opacity-80 hover:opacity-100 transition-opacity duration-300">/Experience</a>
            <a href="#contact" className="opacity-80 hover:opacity-100 transition-opacity duration-300">Contact</a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            aria-label="Toggle menu"
          >
            <motion.span animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-white" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-px bg-white" />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-white" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu (outside the blend context so colors stay true) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent
            className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-center px-8"
          >
            {menuLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                className="font-display font-bold text-4xl py-3 border-b border-border text-foreground hover:text-primary transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
