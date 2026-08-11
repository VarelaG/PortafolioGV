import GSAPRevealTitle from './GSAPRevealTitle'

const CAPABILITIES = [
  {
    number: '01',
    category: 'ARQUITECTURA & FRONTEND',
    title: 'Webs & Plataformas a Medida',
    desc: 'Desarrollo de aplicaciones de alta complejidad con React, Next.js y TypeScript. Código desacoplado, modular y escalable para proyectos ambiciosos.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind']
  },
  {
    number: '02',
    category: 'PERFORMANCE & VELOCIDAD',
    title: 'Core Web Vitals & Carga Inmediata',
    desc: 'Optimización exhaustiva para lograr métricas 99+ en Google Lighthouse. Tiempos de carga ultra-rápidos, bundle splitting y SEO semántico para máximo alcance.',
    tags: ['99+ Lighthouse', 'SEO Semántico', 'Zero Junk', 'Asset Optimization']
  },
  {
    number: '03',
    category: 'AUTOMATIZACIÓN & BACKEND',
    title: 'Workflows n8n & Arquitecturas de Datos',
    desc: 'Conexión de APIs RESTful, pasarelas de pago, bases de datos seguras y automatización de procesos de negocio con flujos inteligentes en n8n.',
    tags: ['n8n', 'PostgreSQL', 'APIs REST', 'Cloud Deploy']
  },
  {
    number: '04',
    category: 'DISEÑO & EXPERIENCIA',
    title: 'Interfaces Fluidas sin Plantillas',
    desc: 'Diseño exclusivo orientado a retención y conversión. Animaciones fluidas a 60fps con GSAP y Framer Motion, cuidando cada micro-interacción.',
    tags: ['GSAP', 'Framer Motion', 'Micro-interacciones', 'Responsive 100%']
  }
]

export default function VyteSection() {
  return (
    <section className="relative w-full bg-[#080808] text-white py-24 sm:py-32 px-6 sm:px-10 md:px-14 overflow-hidden z-20 border-b border-white/5">
      {/* Subtle background gradient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto flex flex-col gap-14 sm:gap-20 relative z-10">
        
        {/* Top Header & Manifesto block */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
              [02 // INICIATIVA DIGITAL & FREELANCE]
            </span>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-white/50 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>ESTUDIO INDEPENDIENTE // VYTE-DEV.COM</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-5">
              <GSAPRevealTitle
                text="Vyte"
                className="hero-heading font-black uppercase text-[clamp(3.5rem,11vw,140px)] leading-none tracking-tight text-white"
              />
            </div>
            <div className="lg:col-span-7 flex flex-col justify-end">
              <p className="text-white/60 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
                **Vyte** es mi marca de desarrollo web y soluciones de software independiente. Trabajo directamente con empresas y clientes que buscan transformar requerimientos complejos en <strong className="font-semibold text-white">plataformas web ultra-rápidas</strong>, con arquitectura sólida y un estándar visual sin concesiones.
              </p>
            </div>
          </div>
        </div>

        {/* 2x2 Bento Matrix of Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {CAPABILITIES.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/10 bg-zinc-950/40 hover:bg-zinc-900/40 hover:border-white/25 transition-all duration-400 ease-out"
            >
              {/* Card Top: Number & Category */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/35 uppercase group-hover:text-white/60 transition-colors">
                  {item.category}
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white/25 group-hover:text-white transition-colors">
                  {item.number}/
                </span>
              </div>

              {/* Card Middle: Title & Description */}
              <div className="flex flex-col gap-3 mb-8">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              {/* Card Bottom: Technology Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {item.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-[9px] sm:text-[10px] font-mono tracking-wider text-white/40 uppercase bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-md group-hover:border-white/15 group-hover:text-white/70 transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Action & Direct Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border border-white/10 bg-zinc-950/60">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs sm:text-sm font-semibold text-white">
              ¿Tenés un proyecto o idea en mente?
            </span>
            <span className="text-[11px] sm:text-xs text-white/40 font-light">
              Conocé más sobre los servicios, metodologías y proyectos realizados en el sitio oficial.
            </span>
          </div>

          <a
            href="https://vyte-dev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full overflow-hidden border border-white/20 hover:border-white bg-transparent text-white font-medium text-xs uppercase tracking-widest transition-all duration-[400ms] hover:text-[#0C0C0C] active:scale-[0.97] flex-shrink-0"
          >
            <div className="absolute inset-0 bg-white translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none rounded-full" />
            <span className="relative z-10 flex items-center gap-2 font-semibold">
              Explorar vyte-dev.com <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}
