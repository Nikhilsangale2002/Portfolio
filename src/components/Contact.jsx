import React, { useState, useEffect, useRef } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' })
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => {
        setStatusMessage({ type: '', text: '' })
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [statusMessage])

  useEffect(() => {
    const section = sectionRef.current
    const form = formRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      
      if (form) {
        const offset = (1 - scrollProgress) * 60
        form.style.transform = `translateY(${offset}px) scale(${0.95 + scrollProgress * 0.05})`
        form.style.opacity = '1'
      }
    }

    // Touch support for mobile
    const handleTouchMove = () => {
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage({ type: '', text: '' })

    try {
      // Using FormSubmit.co (free email service - no API key needed)
      const response = await fetch('https://formsubmit.co/ajax/nikhilsangale121@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'New Portfolio Contact Form Submission',
          _captcha: 'false'
        })
      })

      const result = await response.json()

      if (response.ok) {
        setStatusMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatusMessage({ type: 'error', text: 'Failed to send message. Please try emailing me directly at nikhilsangale121@gmail.com' })
      }
    } catch (error) {
      console.error('Error:', error)
      setStatusMessage({ type: 'error', text: 'Failed to send message. Please try emailing me directly at nikhilsangale121@gmail.com' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="section-shapes">
        <div className="shape shape-circle section-shape-10"></div>
        <div className="shape shape-triangle section-shape-11"></div>
        <div className="shape shape-ring section-shape-12"></div>
        <div className="shape shape-square section-shape-22"></div>
        <div className="shape shape-circle section-shape-23"></div>
        <div className="shape shape-ring section-shape-24"></div>
      </div>
      <div className="section-header">
        <h2>Get In Touch</h2>
        <p>Let's discuss your next project</p>
      </div>

      <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
        {statusMessage.text && (
          <div className={`status-message ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}
        
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            placeholder="your@email.com" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea 
            name="message"
            placeholder="Tell me about your project..." 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  )
}

export default Contact


