import GSAPRevealTitle from './GSAPRevealTitle'

const PILLS = [
  { icon: '⚡', label: 'Carga < 0.8s (Core Web Vitals)' },
  { icon: '💎', label: 'Diseño exclusivo sin plantillas' },
  { icon: '📈', label: 'SEO Semántico & Posicionamiento' },
  { icon: '🛡️', label: 'Arquitectura tipada & escalable' },
]

const SCORES = [
  { label: 'Performance', score: 100 },
  { label: 'Accesibilidad', score: 100 },
  { label: 'Best Practices', score: 100 },
  { label: 'SEO', score: 100 },
]

export default function VyteSection() {
  return (
    <section className="relative w-full bg-[#080808] text-white py-24 sm:py-32 px-6 sm:px-10 md:px-14 overflow-hidden z-20 border-b border-white/5">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto flex flex-col gap-12 sm:gap-16 relative z-10">
        
        {/* Top Meta Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
            [02 // ESTUDIO DIGITAL INDEPENDIENTE]
          </span>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-white/50 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ESTUDIO EN VIVO // VYTE-DEV.COM</span>
          </div>
        </div>

        {/* Studio Showcase Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-12 items-center">
          
          {/* Left Column: Concise proposition & CTA */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase">
                Mi marca de desarrollo
              </span>
              <GSAPRevealTitle
                text="Vyte"
                className="hero-heading font-black uppercase text-[clamp(3.2rem,8vw,110px)] leading-none tracking-tight text-white"
              />
            </div>

            <p className="text-white/60 font-light text-sm sm:text-base leading-relaxed">
              **Vyte** es mi estudio independiente de desarrollo web. Transformo requerimientos comerciales en sitios y plataformas de alto impacto visual, velocidad extrema y arquitectura limpia para clientes que buscan diferenciarse.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-col gap-2.5 pt-2">
              {PILLS.map((pill, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 text-xs sm:text-sm font-light text-white/70"
                >
                  <span className="text-sm select-none">{pill.icon}</span>
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>

            {/* Direct CTA Button */}
            <div className="pt-4">
              <a
                href="https://vyte-dev.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full overflow-hidden border border-white/20 hover:border-white bg-transparent text-white font-medium text-xs uppercase tracking-widest transition-all duration-[400ms] hover:text-[#0C0C0C] active:scale-[0.97]"
              >
                <div className="absolute inset-0 bg-white translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none rounded-full" />
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  Explorar vyte-dev.com <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Browser Mockup Preview */}
          <div className="lg:col-span-7 w-full">
            <a
              href="https://vyte-dev.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative w-full rounded-2xl border border-white/10 bg-zinc-950/80 hover:border-white/25 hover:bg-zinc-950 transition-all duration-500 shadow-2xl overflow-hidden cursor-pointer"
            >
              {/* Browser Window Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-zinc-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-red-400/80 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-amber-400/80 transition-colors" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-emerald-400/80 transition-colors" />
                </div>
                
                {/* Mockup Address Bar */}
                <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.04] border border-white/5 text-[10px] sm:text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors">
                  <span className="text-[10px]">🔒</span>
                  <span>https://vyte-dev.com</span>
                </div>

                <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase hidden sm:inline-block">
                  PREVIEW ↗
                </span>
              </div>

              {/* Mockup Screen Content */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-6 sm:gap-8 text-left bg-gradient-to-b from-zinc-950/40 to-black/60">
                
                {/* Header Tag in Mockup */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
                    ESTUDIO WEB PREMIUM
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    EN PRODUCCIÓN
                  </span>
                </div>

                {/* Headline inside Mockup */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    Diseño &amp; Desarrollo Web de Alto Rendimiento
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed max-w-lg">
                    Experiencias digitales diseñadas para convertir visitas en clientes, con arquitectura moderna y estándares de agencia internacional.
                  </p>
                </div>

                {/* Google Lighthouse Scores Widget */}
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-white/40 uppercase">
                    <span>MÉTRICAS CORE WEB VITALS</span>
                    <span className="text-emerald-400 font-semibold">100% AUDITADO</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SCORES.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02] group-hover:border-emerald-500/20 group-hover:bg-emerald-500/[0.03] transition-all"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-emerald-400/80 flex items-center justify-center text-xs sm:text-sm font-bold font-mono text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.2)]">
                          {item.score}
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-white/45 mt-2 uppercase text-center truncate w-full">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Tag Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] font-mono text-white/40">
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'TypeScript', 'Tailwind', 'SEO'].map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[9px] uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="group-hover:text-white transition-colors flex items-center gap-1 font-semibold flex-shrink-0">
                    Visitar <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>

              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  )
}
