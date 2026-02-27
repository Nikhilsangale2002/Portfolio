import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skills = [
    "JavaScript", "React", "Next.js", "Node.js",
    "Python", "Flask", "Docker", "AWS",
    "MySQL", "MongoDB", "Tailwind CSS", "Git"
  ]

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">
              About Me
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Turning ideas into
              <br />
              <span className="text-gradient">reality</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              I'm a full-stack developer with a passion for building scalable web applications and AI-powered solutions. Specialized in Backend development, cloud deployment, and modern frontend frameworks.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source, and building tools that solve real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6 font-display">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  className="px-4 py-2 glass rounded-lg text-sm font-medium text-foreground"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { num: "2+", label: "Years Exp." },
                { num: "10+", label: "Projects" },
                { num: "5+", label: "Technologies" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-display font-bold text-primary">{stat.num}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
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
