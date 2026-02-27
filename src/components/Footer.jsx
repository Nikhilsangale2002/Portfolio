import { Github, Linkedin, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="py-8 text-center border-t border-border">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://github.com/nikhilsangale2002" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/nikhilsangale" className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noreferrer">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="mailto:nikhilsangale121@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
          <Mail className="w-5 h-5" />
        </a>
      </div>
      <p className="text-sm text-muted-foreground">&copy; 2026 Nikhil Sangale. All rights reserved.</p>
    </footer>
  )
}

export default Footer


