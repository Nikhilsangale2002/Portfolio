import { useEffect, useState, useCallback } from 'react'
import Lenis from 'lenis'
import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ScrollMarquee from './components/ScrollMarquee'
import HelloIntro from './components/HelloIntro'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function App() {
  // Skip the hello intro for reduced-motion users; content mounts after it
  // finishes so the entrance animations play once the overlay clears.
  const [revealed, setRevealed] = useState(() => prefersReducedMotion())
  const [introGone, setIntroGone] = useState(() => prefersReducedMotion())
  const revealContent = useCallback(() => setRevealed(true), [])
  const removeIntro = useCallback(() => setIntroGone(true), [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ anchors: true })
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen">
      {!introGone && <HelloIntro onReveal={revealContent} onDone={removeIntro} />}
      {revealed && (
        <>
          <ScrollProgress />
          <Header />
          <main>
            <Hero />
            <About />
            <ScrollMarquee text="Selected Work" />
            <Projects />
            <ScrollMarquee text="Experience" direction={-1} />
            <Experience />
            <ScrollMarquee text="Let's Talk" />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      {/* Film-grain texture over the whole page */}
      <div className="grain-overlay no-print" aria-hidden="true" />
    </div>
  )
}

export default App
