import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react"
import { usePostHog } from "posthog-js/react"
import Reveal, { BlurIn } from "./Reveal"

const inputClasses =
  "w-full px-5 py-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground/70 " +
  "focus:outline-none focus:border-foreground/40 focus:ring-4 focus:ring-foreground/5 transition-all duration-300"

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })
  const posthog = usePostHog()

  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000)
      return () => clearTimeout(timer)
    }
  }, [statusMessage])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage({ type: '', text: '' })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '4b527ec4-85de-4cdd-8c87-1c9255de7f7e',
          subject: 'New Portfolio Contact Form Submission',
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      if (response.ok) {
        setStatusMessage({ type: 'success', text: 'Thank you! Your message has been sent.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to send. Please email me directly.' })
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to send. Please email me directly.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-xs tracking-[0.25em] uppercase mb-5">
            /Contact
          </p>
          <Reveal onScroll className="mb-5">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
              Let's work <span className="text-gradient">together.</span>
            </h2>
          </Reveal>
          <BlurIn className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12 max-w-lg mx-auto">
            Have a project in mind? Drop me a message &mdash; I usually reply within a day.
          </BlurIn>
        </motion.div>

        {/* Apple-style card form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-6 md:p-8 space-y-4 text-left shadow-[0_20px_60px_-30px_rgba(22,22,22,0.25)]"
          onSubmit={handleSubmit}
        >
          {statusMessage.text && (
            <div
              className={`p-4 rounded-2xl text-sm ${
                statusMessage.type === 'success'
                  ? 'bg-green-600/10 text-green-700'
                  : 'bg-red-600/10 text-red-700'
              }`}
            >
              {statusMessage.text}
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
            required
            className={`${inputClasses} resize-none`}
          />
          <div className="flex flex-col md:flex-row items-center gap-4 pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full md:w-auto px-8 py-3.5 bg-[#161616] text-white font-display font-medium rounded-full
                hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <a
              href="mailto:nikhilsangale121@gmail.com"
              onClick={() => posthog?.capture('contact_email_click')}
              className="group w-full md:w-auto px-8 py-3.5 border border-border text-foreground font-display font-medium rounded-full
                hover:border-foreground/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Email instead
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.form>

        {/* Contact pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-muted-foreground">
            <Mail className="w-4 h-4 text-primary" />
            nikhilsangale121@gmail.com
          </span>
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            Pune, India
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
