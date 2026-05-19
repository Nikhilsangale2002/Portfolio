import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, MapPin, Send } from "lucide-react"

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <section id="contact" className="py-32 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto">
            Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5 text-left"
          action="https://api.web3forms.com/submit"
          method="POST"
        >
          <input type="hidden" name="access_key" value="4b527ec4-85de-4cdd-8c87-1c9255de7f7e" />
          <input type="hidden" name="subject" value="New Portfolio Contact Form Submission" />
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 glass rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 glass rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 glass rounded-lg bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
          />
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-display font-medium rounded-lg hover:brightness-110 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Trouble submitting? Email me at{" "}
            <a
              href="mailto:nikhilsangale121@gmail.com"
              className="text-primary hover:underline"
            >
              nikhilsangale121@gmail.com
            </a>
            .
          </p>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm"
        >
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            nikhilsangale121@gmail.com
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Pune, India
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact


