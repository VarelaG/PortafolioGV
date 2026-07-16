import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GSAPRevealTitle from './GSAPRevealTitle'

interface WebProject {
  title: string
  url: string
  displayUrl: string
  image: string
  description: string
}

const webProjects: WebProject[] = [
  {
    title: 'Estudio Jurídico Legal',
    url: 'https://github.com/VarelaG',
    displayUrl: 'estudiojuridico.varela.dev',
    image: '/webs/abogado-BfB7yUm6.webp',
    description: 'Landing page corporativa para estudio de abogados con agendamiento y diseño sobrio.'
  },
  {
    title: 'Estudio de Arquitectura',
    url: 'https://github.com/VarelaG',
    displayUrl: 'arquitectura.varela.dev',
    image: '/webs/arquitectura-DVXecECh.webp',
    description: 'Portfolio de proyectos arquitectónicos minimalista, enfocado en fotografía de alta calidad.'
  },
  {
    title: 'Resort & Spa Luxury',
    url: 'https://github.com/VarelaG',
    displayUrl: 'hotelspa.varela.dev',
    image: '/webs/hotel1-BAm_IPuk.webp',
    description: 'Sistema de reservas y visualización de suites exclusivas con animaciones inmersivas.'
  },
  {
    title: 'Centro de Yoga & Zen',
    url: 'https://github.com/VarelaG',
    displayUrl: 'yoga.varela.dev',
    image: '/webs/yoga-GM2TJHnu.webp',
    description: 'Plataforma de clases online y horarios para centro de bienestar integral.'
  },
  {
    title: 'Gourmet Restaurant',
    url: 'https://github.com/VarelaG',
    displayUrl: 'gourmet.varela.dev',
    image: '/webs/Restaurante-D921JeC_.webp',
    description: 'Menú interactivo con reservas en tiempo real y estética visual de alta gastronomía.'
  },
  {
    title: 'Boutique Hotel & Suites',
    url: 'https://github.com/VarelaG',
    displayUrl: 'boutiquehotel.varela.dev',
    image: '/webs/hotel2-NAXx7vu3.webp',
    description: 'Sitio web optimizado para hotel boutique urbano con integración de pagos.'
  },
  {
    title: 'E-Commerce de Moda',
    url: 'https://github.com/VarelaG',
    displayUrl: 'moda.varela.dev',
    image: '/webs/moda-Bah87Ebo.webp',
    description: 'Tienda en línea responsiva con carrito de compras y pasarela de pago optimizada.'
  },
  {
    title: 'Refugio de Montaña',
    url: 'https://github.com/VarelaG',
    displayUrl: 'refugio.varela.dev',
    image: '/webs/refugio-NOX9Prf6.webp',
    description: 'Portal de reservas para cabañas de montaña con mapa interactivo y clima en vivo.'
  }
]

export default function HorizontalWebsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll position on desktop container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Horizontal motion transform: scroll through the introduction slide + 8 cards
  // total items: 1 intro slide + 8 cards = 9 panels
  // We translate from 0 to -80% to give room for the last item to be fully visible
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#0C0C0C] z-30 hidden md:block">
      {/* Sticky screen container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Cinematic subtle glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/15 via-transparent to-transparent pointer-events-none z-0" />
        
        {/* Pinned horizontal slider */}
        <motion.div style={{ x }} className="flex items-center gap-12 lg:gap-20 px-12 lg:px-24 h-full w-max z-10">
          
          {/* 1. Intro panel */}
          <div className="w-[85vw] lg:w-[45vw] flex flex-col justify-center flex-shrink-0 pr-8">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#D7E2EA]/45 uppercase mb-4 block">
              Portfolio de Desarrollos
            </span>
            <GSAPRevealTitle
              text="Páginas Web"
              className="font-black uppercase leading-none tracking-tight text-[clamp(3.5rem,8vw,140px)] text-white mb-8"
            />
            <p className="text-[#D7E2EA]/75 font-light text-base md:text-lg leading-relaxed max-w-[480px]">
              Una selección de landing pages y sitios corporativos desarrollados a medida, con layouts adaptables, optimización de velocidad de carga y experiencias de navegación fluidas.
            </p>
            <div className="flex gap-2 items-center mt-8 text-[#D7E2EA]/45 text-xs font-mono">
              <span>Scroll para explorar</span>
              <span className="animate-bounce">→</span>
            </div>
          </div>

          {/* 2. Web cards panels */}
          {webProjects.map((project, idx) => (
            <div 
              key={idx} 
              className="w-[75vw] lg:w-[45vw] flex flex-col justify-center flex-shrink-0"
            >
              {/* macOS Browser Mockup */}
              <div
                className="w-full rounded-[20px] lg:rounded-[25px] border border-[#D7E2EA]/10 bg-[#0C0C0D] shadow-2xl overflow-hidden flex flex-col cursor-pointer group active:scale-[0.99] transition-transform duration-300"
                style={{ aspectRatio: '16/10' }}
                onClick={() => handleCardClick(project.url)}
                data-cursor="view"
              >
                {/* macOS Browser Header */}
                <div className="h-7 w-full bg-[#161618] border-b border-white/5 flex items-center justify-between px-4 flex-shrink-0 select-none">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="text-[9px] font-mono text-white/30 tracking-wider truncate max-w-[200px]">
                    {project.displayUrl}
                  </div>
                  <div className="w-8" />
                </div>

                {/* Viewport content */}
                <div className="flex-grow overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top select-none pointer-events-none scale-100 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="mt-6 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-white uppercase tracking-wider text-sm lg:text-base">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-mono text-white/40 tracking-wider">
                    {project.displayUrl}
                  </span>
                </div>
                <p className="text-xs text-[#D7E2EA]/60 max-w-[320px] text-right font-light leading-relaxed pl-4">
                  {project.description}
                </p>
              </div>
            </div>
          ))}

        </motion.div>
      </div>
    </div>
  )
}

// Mobile variant that renders a normal horizontal swipe block instead of sticky scrolljacking
export function HorizontalWebsMobileSection() {
  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="relative w-full bg-[#0C0C0C] py-20 px-5 block md:hidden z-30">
      <div className="flex flex-col mb-10">
        <span className="text-[9px] font-semibold tracking-[0.25em] text-[#D7E2EA]/45 uppercase mb-2 block">
          Portfolio de Desarrollos
        </span>
        <GSAPRevealTitle
          text="Páginas Web"
          className="font-black uppercase leading-none tracking-tight text-4xl text-white mb-4"
        />
        <p className="text-[#D7E2EA]/75 font-light text-sm leading-relaxed max-w-[320px]">
          Landing pages y sitios corporativos desarrollados a medida, con diseño responsivo y optimizado.
        </p>
      </div>

      {/* Touch Swipe Row */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-5 px-5">
        {webProjects.map((project, idx) => (
          <div 
            key={idx} 
            className="w-[82vw] shrink-0 snap-center flex flex-col"
            onClick={() => handleCardClick(project.url)}
          >
            {/* macOS Browser Mockup */}
            <div
              className="w-full rounded-[16px] border border-[#D7E2EA]/10 bg-[#0C0C0D] shadow-xl overflow-hidden flex flex-col"
              style={{ aspectRatio: '16/10' }}
            >
              {/* Browser Header */}
              <div className="h-6 w-full bg-[#161618] border-b border-white/5 flex items-center justify-between px-3 flex-shrink-0 select-none">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-[7.5px] font-mono text-white/30 tracking-wider truncate max-w-[150px]">
                  {project.displayUrl}
                </div>
                <div className="w-6" />
              </div>

              {/* Viewport */}
              <div className="flex-grow overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 flex flex-col gap-1">
              <h3 className="font-semibold text-white uppercase tracking-wider text-xs">
                {project.title}
              </h3>
              <p className="text-[10px] text-[#D7E2EA]/50 font-light leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-1 mt-4 text-[10px] text-white/30 font-mono">
        <span>Desliza para ver más</span>
        <span>→</span>
      </div>
    </section>
  )
}
