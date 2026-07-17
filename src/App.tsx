import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmoothScroller from './components/SmoothScroller'
import FadeIn from './components/FadeIn'
import AnimatedText from './components/AnimatedText'
import ContactButton from './components/ContactButton'
import LiveProjectButton from './components/LiveProjectButton'
import TechStackSection from './components/TechStackSection'
import GSAPRevealTitle from './components/GSAPRevealTitle'
import CustomCursor from './components/CustomCursor'
import HorizontalWebsSection, { HorizontalWebsMobileSection } from './components/HorizontalWebsSection'

gsap.registerPlugin(ScrollTrigger)

// Local portfolio project images
const row1Images = [
  '/webs/abogado-BfB7yUm6.webp',
  '/webs/arquitectura-DVXecECh.webp',
  '/webs/hotel1-BAm_IPuk.webp',
  '/webs/yoga-GM2TJHnu.webp'
]

const row2Images = [
  '/webs/Restaurante-D921JeC_.webp',
  '/webs/hotel2-NAXx7vu3.webp',
  '/webs/moda-Bah87Ebo.webp',
  '/webs/refugio-NOX9Prf6.webp'
]

// Project Data
const projects = [
  {
    number: '01',
    category: 'Finanzas & Automatización n8n',
    title: 'Paycheck App',
    images: [
      '/projects/paycheck.png',
      '/projects/paycheck2.png',
      '/projects/paycheck1.png'
    ]
  },
  {
    number: '02',
    category: 'Sistemas de Gestión',
    title: 'SGI Supermercado',
    images: [
      '/projects/sgi.png',
      '/projects/sgi%201.png',
      '/projects/sgi%202.png'
    ]
  },
  {
    number: '03',
    category: 'Web App / Distribución & E-Commerce',
    title: 'H2O Express',
    images: [
      '/projects/agua.png',
      '/projects/agua1.png',
      '/projects/agua2.png'
    ]
  }
]

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleContact = () => {
    window.location.href = 'mailto:varelag1999@gmail.com?subject=Hola%20Gonzalo!'
  }

  return (
    <SmoothScroller>
      <CustomCursor />
      <div ref={scrollRef} className="relative w-full text-[#D7E2EA] bg-[#0C0C0C] overflow-x-clip">
        {/* Decorative Grid Mesh glows for visual premium feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/10 via-background to-background pointer-events-none z-0" />

        {/* 1. HERO SECTION */}
        <HeroSection onContactClick={handleContact} />

        {/* 2. MARQUEE SECTION */}
        <MarqueeSection onImageClick={setSelectedImage} />

        {/* 3. ABOUT SECTION */}
        <AboutSection onContactClick={handleContact} />

        {/* 4. SERVICES SECTION */}
        <ServicesSection />

        {/* 5. PROJECTS SECTION */}
        <ProjectsSection onImageClick={setSelectedImage} />

        {/* 6. HORIZONTAL WEBS SECTION */}
        <HorizontalWebsSection onImageClick={setSelectedImage} />
        <HorizontalWebsMobileSection onImageClick={setSelectedImage} />

        {/* 6. TECH STACK 3D CAROUSEL SECTION */}
        <TechStackSection />

        {/* 7. FOOTER SECTION */}
        <FooterSection onContactClick={handleContact} />
      </div>

      {/* Image Modal Visualizer for high-end portfolio work */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </SmoothScroller>
  )
}

// ------------------------------
// HERO SECTION COMPONENT
// ------------------------------
function HeroSection({ onContactClick }: { onContactClick: () => void }) {
  const [activeLink, setActiveLink] = useState('')

  const handleNavClick = (sectionId: string) => {
    setActiveLink(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Motion values for the interactive parallax movement
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics configs for realistic lag & momentum
  const bgSpringConfig = { stiffness: 45, damping: 20, mass: 0.6 }

  // Inverted movement for the background layers (creates true depth parallax)
  const bgX = useSpring(useTransform(mouseX, (x) => -x * 0.35), bgSpringConfig)
  const bgY = useSpring(useTransform(mouseY, (y) => -y * 0.35), bgSpringConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    // Map cursor position to offsets ranging from -25px to 25px
    const x = ((clientX / innerWidth) - 0.5) * 50
    const y = ((clientY / innerHeight) - 0.5) * 50
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    // Reset positions back to center
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden z-10 bg-[#0C0C0C] text-[#D7E2EA]"
    >
      {/* Floating Island Navigation Bar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-max max-w-[92vw] px-5 sm:px-6 py-2.5 rounded-full bg-[#0C0C0C]/35 backdrop-blur-md border border-[#D7E2EA]/10 flex items-center justify-center gap-5 sm:gap-7 z-50 shadow-2xl shadow-black/40">
        {[
          { label: 'Sobre Mí', id: 'about' },
          { label: 'Servicios', id: 'services' },
          { label: 'Proyectos', id: 'projects' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`text-[#D7E2EA] font-semibold uppercase tracking-wider text-[10px] sm:text-xs transition-all duration-200 hover:opacity-100 cursor-pointer ${
              activeLink === item.id ? 'opacity-100 scale-105 border-b border-[#D7E2EA]/45 pb-0.5' : 'opacity-65'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={onContactClick}
          className="text-[#D7E2EA] font-semibold uppercase tracking-wider text-[10px] sm:text-xs opacity-65 transition-all duration-200 hover:opacity-100 cursor-pointer hover:scale-105"
        >
          Contacto
        </button>
      </div>

      {/* Dynamic Background Parallax Wrapper */}
      <motion.div 
        style={{ x: bgX, y: bgY, scale: 1.08 }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/animate_bg.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Vignette Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#0C0C0C_85%)] opacity-85" />
        {/* Flat color backdrop-layer to enforce dark tone */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Fade-out linear gradient for seamless bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent z-10 pointer-events-none" />

      {/* Empty Spacer to push bottom bar down (since center title is removed) */}
      <div className="flex-grow flex items-center justify-center pointer-events-none" />

      {/* Bottom Bar: Asymmetric Layout */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-8 sm:pb-10 md:pb-12 z-20">
        {/* Left Editorial tagline */}
        <FadeIn delay={0.3} y={20}>
          <p 
            className="text-[#D7E2EA]/85 font-light uppercase tracking-wide leading-relaxed text-left max-w-[200px] sm:max-w-[260px] md:max-w-[320px] border-l-2 border-[#D7E2EA]/15 pl-4"
            style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1.15rem)' }}
          >
            analista en sistemas y 91% licenciado en sistemas, enfocado en diseñar soluciones de software de alto rendimiento
          </p>
        </FadeIn>

        {/* Right Dynamic Magnetic Contact Button */}
        <FadeIn delay={0.45} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  )
}

// ------------------------------
// MARQUEE SECTION COMPONENT
// ------------------------------
function MarqueeSection({ onImageClick }: { onImageClick: (url: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    if (!section || !row1 || !row2) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      // Only run math if section is within range
      if (scrollY + windowHeight >= sectionTop - 100 && scrollY <= sectionTop + rect.height + 100) {
        const offset = (scrollY - sectionTop + windowHeight) * 0.3
        const moveRight = offset - 200
        const moveLeft = -(offset - 200)

        row1.style.transform = `translate3d(${moveRight}px, 0px, 0px)`
        row2.style.transform = `translate3d(${moveLeft}px, 0px, 0px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Triple images lists for seamless looping wrap
  const tripleRow1 = [...row1Images, ...row1Images, ...row1Images]
  const tripleRow2 = [...row2Images, ...row2Images, ...row2Images]

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden z-10">
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: Moves Right on Scroll */}
        <div className="w-full overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-3 w-max"
            style={{ willChange: 'transform' }}
          >
            {tripleRow1.map((url, idx) => (
              <div
                key={`r1-${idx}`}
                className="w-[280px] h-[180px] sm:w-[350px] sm:h-[220px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5"
              >
                <img
                  src={url}
                  alt={`Marquee Web ${idx}`}
                  className="w-full h-full object-cover object-top cursor-pointer hover:scale-[1.04] transition-all duration-300 ease-out select-none"
                  onClick={() => onImageClick(url)}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Left on Scroll */}
        <div className="w-full overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-3 w-max"
            style={{ willChange: 'transform' }}
          >
            {tripleRow2.map((url, idx) => (
              <div
                key={`r2-${idx}`}
                className="w-[280px] h-[180px] sm:w-[350px] sm:h-[220px] md:w-[420px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5"
              >
                <img
                  src={url}
                  alt={`Marquee Web ${idx}`}
                  className="w-full h-full object-cover object-top cursor-pointer hover:scale-[1.04] transition-all duration-300 ease-out select-none"
                  onClick={() => onImageClick(url)}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ------------------------------
// ABOUT SECTION COMPONENT
// ------------------------------
function AboutSection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section id="about" className="relative w-full min-h-[100dvh] flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden bg-[#0C0C0C] z-10">

      {/* Main Content Box */}
      <div className="flex flex-col items-center justify-center text-center max-w-[900px] z-10">
        <GSAPRevealTitle
          text="Sobre Mí"
          className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(2.4rem,10vw,160px)]"
        />

        {/* Gap 10/14/16 between heading and text */}
        <div className="h-10 sm:h-14 md:h-16" />

        <AnimatedText
          text="Como analista en sistemas y futuro licenciado en sistemas, aplico metodologías reales de ingeniería de software para garantizar la estabilidad y rendimiento de tus plataformas. Diseño bases de datos eficientes, automatizaciones lógicas con Inteligencia Artificial y flujos de trabajo optimizados a la medida de tu práctica profesional."
          className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-center"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' } as any}
        />

        {/* Gap 16/20/24 between text block and button */}
        <div className="h-16 sm:h-20 md:h-24" />

        <FadeIn delay={0.2} y={20}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  )
}

// ------------------------------
// SERVICES SECTION COMPONENT (White background)
// ------------------------------
const servicesData = [
  {
    num: '01',
    name: 'Arquitectura de Software',
    desc: 'Diseño y estructuración lógica de sistemas robustos y escalables, pensados para adaptarse al crecimiento de tu negocio.'
  },
  {
    num: '02',
    name: 'Automatización & IA',
    desc: 'Flujos de trabajo optimizados mediante la integración de agentes de inteligencia artificial y automatizaciones que eliminan tareas repetitivas.'
  },
  {
    num: '03',
    name: 'Optimización & BBDD',
    desc: 'Diseño de esquemas relacionales e indexación eficiente para garantizar la velocidad e integridad transaccional de tus datos.'
  },
  {
    num: '04',
    name: 'Desarrollo Headless',
    desc: 'Plataformas web rápidas y eficientes utilizando arquitecturas desacopladas (headless) que cargan en milisegundos.'
  },
  {
    num: '05',
    name: 'Auditoría & Calidad',
    desc: 'Análisis técnico, remediación de errores y optimización de código para asegurar la estabilidad en entornos de producción.'
  }
]

function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20">
      <div className="max-w-5xl mx-auto flex flex-col">
        <GSAPRevealTitle
          text="Servicios"
          className="font-black uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28 text-[clamp(2.4rem,10vw,160px)] leading-none tracking-tight"
        />

        <div className="flex flex-col border-t border-[#0C0C0C]/15">
          {servicesData.map((service, idx) => (
            <FadeIn
              key={service.num}
              delay={idx * 0.1}
              y={30}
              className="flex flex-row items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 gap-6 sm:gap-10"
            >
              {/* Left Number */}
              <div className="w-[100px] sm:w-[140px] md:w-[180px] flex-shrink-0">
                <span className="font-black text-[#0C0C0C] leading-none text-[clamp(2.5rem,8vw,120px)] block">
                  {service.num}
                </span>
              </div>

              {/* Right stacked text details */}
              <div className="flex-grow flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex flex-col">
                  <h3 className="font-medium uppercase text-[#0C0C0C] mb-2 text-[clamp(1.1rem,2.2vw,2.1rem)]">
                    {service.name}
                  </h3>
                  <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60 text-[clamp(0.85rem,1.6vw,1.25rem)]">
                    {service.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ------------------------------
// PROJECTS SECTION COMPONENT
// ------------------------------
function ProjectsSection({ onImageClick }: { onImageClick: (url: string) => void }) {
  return (
    <section id="projects" className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pb-24 sm:pb-32 px-5 sm:px-8 md:px-10 z-30 pt-20">
      <div className="max-w-5xl mx-auto flex flex-col mb-16 sm:mb-20">
        <div className="w-full text-center mb-16">
          <GSAPRevealTitle
            text="Proyectos"
            className="hero-heading font-black uppercase text-[clamp(2.4rem,10vw,160px)] leading-none tracking-tight"
          />
        </div>

        {/* Sticky card stacking container */}
        <div className="flex flex-col gap-[10vh] sm:gap-[15vh]">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.number}
              index={idx}
              totalCards={projects.length}
              onImageClick={onImageClick}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Sticky Project Card Subcomponent
function ProjectCard({
  index,
  totalCards,
  number,
  category,
  title,
  images,
  onImageClick
}: {
  index: number
  totalCards: number
  number: string
  category: string
  title: string
  images: string[]
  onImageClick: (url: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Stacking calculation: scale down as we scroll past
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const targetScale = 1 - (totalCards - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  useEffect(() => {
    if (!containerRef.current) return;

    const imgs = containerRef.current.querySelectorAll('.parallax-img');

    const ctx = gsap.context(() => {
      imgs.forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLiveProject = () => {
    window.open('https://motionsites.ai', '_blank')
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[80vh] sm:h-[85vh] flex justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(${80 + index * 28}px)`
      }}
    >
      <motion.div
        style={{
          scale,
          willChange: 'transform'
        }}
        className="w-full h-full rounded-[35px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/15 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
      >
        {/* Top Row */}
        <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 border-b border-[#D7E2EA]/10 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-6 min-w-0">
            <span className="font-black text-[clamp(1.8rem,5vw,90px)] leading-none text-[#D7E2EA] flex-shrink-0">
              {number}
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-medium truncate">
                {category}
              </span>
              <h3 className="text-xs xs:text-sm sm:text-lg md:text-2xl font-semibold text-[#D7E2EA] uppercase tracking-wide leading-tight truncate sm:whitespace-normal">
                {title}
              </h3>
            </div>
          </div>
          <LiveProjectButton onClick={handleLiveProject} className="flex-shrink-0" />
        </div>

        {/* Bottom Row: 2-Column Image Grid (Desktop/Tablet) or Single Image Mockup (Mobile) */}
        <div className="flex-grow flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 overflow-hidden">
          
          {/* Mobile Viewport: Horizontal Swiper Slider for all 3 images (hidden on sm+) */}
          <div className="flex sm:hidden w-full flex-grow overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none -mx-2 px-2 py-1 items-center">
            {images.map((img, imgIdx) => (
              <div
                key={imgIdx}
                className="w-[78vw] h-[90%] shrink-0 snap-center rounded-[20px] bg-[#0C0C0D] border border-[#D7E2EA]/10 shadow-xl overflow-hidden flex flex-col cursor-pointer active:scale-[0.99] transition-transform duration-200"
                onClick={() => onImageClick(img)}
              >
                {/* Browser Header */}
                <div className="h-6 w-full bg-[#161618] border-b border-white/5 flex items-center justify-between px-3 flex-shrink-0 select-none">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="text-[7px] font-mono text-white/30 tracking-wider truncate max-w-[140px]">
                    {title.toLowerCase().replace(/\s+/g, '-')}.app/{imgIdx === 0 ? 'dashboard' : imgIdx === 1 ? 'analytics' : 'workflow'}
                  </div>
                  <div className="w-4" />
                </div>
                
                {/* Image Viewport */}
                <div className="flex-grow overflow-hidden relative">
                  <img
                    src={img}
                    alt={`${title} img-${imgIdx}`}
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Viewport: Left Column (40% width, hidden on mobile) */}
          <div className="hidden sm:flex w-full sm:w-[40%] flex-col gap-4 sm:gap-6 justify-center">
            {/* Top Frame */}
            <div
              className="w-full rounded-[20px] sm:rounded-[25px] border border-[#D7E2EA]/10 bg-[#0C0C0D] shadow-xl overflow-hidden flex flex-col cursor-pointer group active:scale-[0.99] transition-transform duration-200"
              style={{ height: 'clamp(100px, 16vw, 230px)' }}
              onClick={() => onImageClick(images[0])}
              data-cursor="view"
            >
              {/* macOS Browser Header */}
              <div className="h-6 sm:h-7 w-full bg-[#161618] border-b border-white/5 flex items-center justify-between px-3 sm:px-4 flex-shrink-0 select-none">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-[7.5px] sm:text-[9px] font-mono text-white/30 tracking-wider truncate max-w-[160px]">
                  {title.toLowerCase().replace(/\s+/g, '-')}.app/dashboard
                </div>
                <div className="w-6" />
              </div>
              
              {/* Image Viewport */}
              <div className="flex-grow overflow-hidden relative">
                <img
                  src={images[0]}
                  alt={`${title} col1-top`}
                  className="parallax-img w-full h-full object-cover object-top select-none pointer-events-none scale-105 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom Frame */}
            <div
              className="w-full rounded-[20px] sm:rounded-[25px] border border-[#D7E2EA]/10 bg-[#0C0C0D] shadow-xl overflow-hidden flex flex-col cursor-pointer group active:scale-[0.99] transition-transform duration-200"
              style={{ height: 'clamp(120px, 22vw, 340px)' }}
              onClick={() => onImageClick(images[1])}
              data-cursor="view"
            >
              {/* macOS Browser Header */}
              <div className="h-6 sm:h-7 w-full bg-[#161618] border-b border-white/5 flex items-center justify-between px-3 sm:px-4 flex-shrink-0 select-none">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-[7.5px] sm:text-[9px] font-mono text-white/30 tracking-wider truncate max-w-[160px]">
                  {title.toLowerCase().replace(/\s+/g, '-')}.app/analytics
                </div>
                <div className="w-6" />
              </div>

              {/* Image Viewport */}
              <div className="flex-grow overflow-hidden relative">
                <img
                  src={images[1]}
                  alt={`${title} col1-bottom`}
                  className="parallax-img w-full h-full object-cover object-top select-none pointer-events-none scale-105 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Viewport: Right Column (60% width, hidden on mobile) */}
          <div className="hidden sm:flex w-full sm:w-[60%] flex items-center">
            {/* Tall Frame */}
            <div
              className="w-full h-full rounded-[20px] sm:rounded-[25px] bg-[#0C0C0D] border border-[#D7E2EA]/10 shadow-xl overflow-hidden flex flex-col cursor-pointer group active:scale-[0.99] transition-transform duration-200"
              onClick={() => onImageClick(images[2])}
              data-cursor="view"
            >
              {/* macOS Browser Header */}
              <div className="h-6 sm:h-7 w-full bg-[#161618] border-b border-white/5 flex items-center justify-between px-3 sm:px-4 flex-shrink-0 select-none">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-[7.5px] sm:text-[9px] font-mono text-white/30 tracking-wider truncate max-w-[180px]">
                  {title.toLowerCase().replace(/\s+/g, '-')}.app/workflow
                </div>
                <div className="w-6" />
              </div>

              {/* Image Viewport */}
              <div className="flex-grow overflow-hidden relative">
                <img
                  src={images[2]}
                  alt={`${title} col2-tall`}
                  className="parallax-img w-full h-full object-cover object-top select-none pointer-events-none scale-105 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ------------------------------
// FOOTER / CONTACT SECTION (100vh - Screen height)
// ------------------------------
function FooterSection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <footer className="relative w-full min-h-[100dvh] flex flex-col justify-between bg-[#000000] text-[#D7E2EA] px-6 sm:px-10 md:px-12 py-12 sm:py-16 md:py-20 overflow-hidden z-20">
      
      {/* Background Video with flowing waves (no blur and higher opacity for crisp view) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-black">
        <video
          src="/varela_word.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain opacity-85 select-none"
        />
      </div>

      {/* Top block: Header and Collaboration link */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-10 pb-10 md:pb-12 z-10">
        <div className="flex flex-col max-w-3xl">
          <GSAPRevealTitle
            text="¿Trabajamos juntos?"
            className="font-extrabold uppercase leading-none tracking-tight text-[clamp(1.8rem,5.5vw,85px)] text-white"
          />
        </div>
        
        {/* Start a Collaboration Link */}
        <div className="flex flex-col">
          <button
            onClick={onContactClick}
            className="group flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-white hover:text-white/80 transition-colors cursor-pointer border-b border-white/20 pb-2 hover:border-white/60"
          >
            Iniciar una colaboración
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>
      </div>

      {/* Middle block: Spacer */}
      <div className="w-full flex-grow py-4 sm:py-8 md:py-12 z-10" />

      {/* Bottom block: Columns for info */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 pt-10 z-10">
        {/* Column 1: Business Enquiry */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-[#D7E2EA]/35 uppercase">
            Consultas profesionales
          </span>
          <div className="flex flex-col gap-1 mt-1">
            <a 
              href="mailto:varelag1999@gmail.com?subject=Proyecto%20Portafolio" 
              className="text-xs sm:text-sm font-medium text-white hover:text-white/70 transition-colors w-max"
            >
              E. varelag1999@gmail.com
            </a>
            <a 
              href="https://wa.me/5492364263654"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-light text-[#D7E2EA]/50 hover:text-white transition-colors w-max"
            >
              P. +54 9 236 426-3654
            </a>
          </div>
        </div>

        {/* Column 2: Social Links */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-[#D7E2EA]/35 uppercase">
            Redes sociales
          </span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-1 max-w-[220px]">
            {[
              { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gonzalo-varela-4a0b00291/?skipRedirect=true' },
              { label: 'GitHub', url: 'https://github.com/VarelaG' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-medium text-white hover:text-white/70 transition-colors w-max"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Copyright */}
        <div className="flex flex-col justify-between items-start sm:items-end">
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-[#D7E2EA]/35 uppercase">
              Copyright
            </span>
            <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/50 mt-1 select-none">
              © Gonzalo Varela 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ------------------------------
// HIGH-END IMAGE MODAL COMPONENT (with scroll overlay prevention)
// ------------------------------
function ImageModal({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Extract friendly readable title based on project filename
  const getProjectName = (path: string) => {
    const filename = path.split('/').pop() || ''
    const base = filename.split('-')[0] // E.g., "abogado", "hotel1"
    const capitalized = base.charAt(0).toUpperCase() + base.slice(1)
    if (capitalized === 'Hotel1') return 'Proyecto: Hotel Resort & Spa'
    if (capitalized === 'Hotel2') return 'Proyecto: Boutique Hotel & Suites'
    if (capitalized === 'Abogado') return 'Proyecto: Estudio Jurídico Legal'
    if (capitalized === 'Restaurante') return 'Proyecto: Gourmet Restaurant'
    if (capitalized === 'Arquitectura') return 'Proyecto: Estudio de Arquitectura'
    if (capitalized === 'Refugio') return 'Proyecto: Refugio de Montaña'
    if (capitalized === 'Yoga') return 'Proyecto: Centro de Yoga & Meditación'
    if (capitalized === 'Moda') return 'Proyecto: Boutique de Moda E-Commerce'
    return `Proyecto: Landing Page ${capitalized}`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10 pointer-events-auto"
      onClick={onClose}
    >
      {/* Outer shell (hardware hardware double bezel look) */}
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-[#0C0C0C] rounded-[24px] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] p-1 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-zinc-900/10">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#D7E2EA]/60 uppercase">
            {getProjectName(imageUrl)}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Scrollable container with data-lenis-prevent */}
        <div 
          data-lenis-prevent 
          className="flex-grow overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-zinc-950/20 max-h-[calc(85vh-60px)]"
        >
          <img
            src={imageUrl}
            alt="Full Project Capture"
            className="w-full h-auto object-contain rounded-xl select-none"
            loading="lazy"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
