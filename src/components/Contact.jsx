import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Mail, MapPin, Send } from "lucide-react"

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })

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
      const response = await fetch('https://formsubmit.co/ajax/nikhilsangale121@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New Portfolio Contact Form Submission',
          _captcha: 'false'
        })
      })

      if (response.ok) {
        setStatusMessage({ type: 'success', text: 'Thank you! Your message has been sent.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to send. Please email me directly.' })
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Failed to send. Please email me directly.' })
    } finally {
      setIsSubmitting(false)
    }
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
          onSubmit={handleSubmit}
        >
          {statusMessage.text && (
            <div className={`p-4 rounded-lg text-sm ${statusMessage.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {statusMessage.text}
            </div>
          )}
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
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-display font-medium rounded-lg hover:brightness-110 transition-all duration-300 flex items-center gap-2 mx-auto disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
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


