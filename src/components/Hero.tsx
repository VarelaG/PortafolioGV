'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gonzaloImg from '../assets/gonzalo.png'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onContactClick: () => void
  startAnimation: boolean
}

export default function Hero({ onContactClick, startAnimation }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      setTime(new Date().toLocaleTimeString('es-AR', options))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax translation on the full background portrait image
      gsap.to(portraitRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert() // Clean up GSAP instances
  }, [])

  return (
    <section ref={containerRef} className="hero-container">
      {/* 1. Header Navigation Bar (Buenos Aires clock, Socials, CTA) */}
      <header className={`hero-header transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${startAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
        <div className="header-left">
          <span>Buenos Aires, AR</span>
          <span className="header-time-separator">•</span>
          <span className="header-time">{time}</span>
        </div>
        <div className="header-center">
          <a href="https://www.linkedin.com/in/gonzalo-varela-4a0b00291/?skipRedirect=true" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>/</span>
          <a href="https://github.com/VarelaG" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>/</span>
          <a href="https://wa.me/5492364263654" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <div className="header-right">
          <a href="#contacto" className="header-cta" onClick={(e) => { e.preventDefault(); onContactClick(); }}>Hablemos ↗</a>
        </div>
      </header>

      {/* Gonzalo's Portrait as a masked background parallax image */}
      <img
        ref={portraitRef}
        src={gonzaloImg}
        alt="Gonzalo Varela portrait"
        className={`hero-background-portrait transition-all duration-[1800ms] cubic-bezier(0.16, 1, 0.3, 1) ${startAnimation ? 'opacity-30 scale-100 saturate-100' : 'opacity-0 scale-[1.08] saturate-50'}`}
      />

      {/* Dark gradient overlay */}
      <div className="hero-gradient-overlay"></div>

      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 70 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title"
        >
          GONZALO
          <br />
          VARELA
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hero-subtitle"
        >
          Licenciado en Sistemas
        </motion.p>

        {/* 2. Technical Sidebar (Specialties block under title) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hero-technical-sidebar"
        >
          <div className="sidebar-item">
            <span className="sidebar-number">01/</span>
            <span className="sidebar-label">Sistemas Distribuidos</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-number">02/</span>
            <span className="sidebar-label">Automatización & IA</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-number">03/</span>
            <span className="sidebar-label">Desarrollo Headless</span>
          </div>
        </motion.div>
      </div>

      {/* 3. Scroll Down Indicator (Bottom Left) */}
      <div className={`hero-scroll-indicator transition-opacity duration-1000 ${startAnimation ? 'opacity-100' : 'opacity-0'}`}>
        <span className="scroll-text">Deslizar</span>
        <div className="scroll-line-container">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="scroll-line-dot"
          />
        </div>
      </div>

      {/* 4. Context Tagline (Bottom Right) */}
      <div className={`hero-context-tagline transition-all duration-[1400ms] ${startAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p>
          Especialista en estructurar arquitecturas estables e interfaces fluidas de alto rendimiento.
        </p>
      </div>
    </section>
  )
}
