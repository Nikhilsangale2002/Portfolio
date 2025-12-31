import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background3D from './components/Background3D'
import { useScrollAnimation } from './hooks/useScrollAnimation'

function App() {
  useScrollAnimation()

  return (
    <>
      <Background3D />
      <Header />
      <div className="scroll-container">
        <div className="scroll-content">
          <main>
            <Hero />
            <div className="animate-on-scroll">
              <About />
            </div>
            <div className="animate-slide-left">
              <Projects />
            </div>
            <div className="animate-scale">
              <Skills />
            </div>
            <div className="animate-slide-right">
              <Experience />
            </div>
            <div className="animate-on-scroll">
              <Contact />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
