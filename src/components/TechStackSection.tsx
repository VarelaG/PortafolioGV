import { useState, useRef } from 'react';
import GSAPRevealTitle from './GSAPRevealTitle';

// Core Technologies metadata with logos, badges, custom glow branding, and technical profiles
const TECH_ITEMS = [
  {
    id: 'react',
    title: 'React',
    category: 'Frontend',
    glowRGB: '97, 218, 251', // React Cyan
    badgeColor: 'text-[#61DAFB] border-[#61DAFB]/20 bg-[#61DAFB]/5',
    svg: (
      <svg viewBox="-11.5 -10.23 23 20.47" className="w-16 h-16 text-[#61DAFB] fill-none stroke-[#61DAFB] stroke-[1.2px]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
    details: {
      domain: 'SPA & SSR Architectures',
      points: [
        'Desarrollo con React 18/19 y Next.js',
        'State Management (Zustand, Context)',
        'Animaciones fluidas con Framer Motion',
        'Estrategias de renderizado (SSG/ISR)'
      ]
    }
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    category: 'Lenguaje',
    glowRGB: '49, 120, 198', // TS Blue
    badgeColor: 'text-[#3178C6] border-[#3178C6]/20 bg-[#3178C6]/5',
    svg: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 fill-[#3178C6]" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="14" fill="#3178C6"/>
        <text x="85" y="85" fill="white" fontSize="40" fontFamily='"Plus Jakarta Sans", system-ui, sans-serif' fontWeight="800" textAnchor="end">TS</text>
      </svg>
    ),
    details: {
      domain: 'Robust Type Safety',
      points: [
        'Tipado estricto y aserciones avanzadas',
        'Interfaces y Utility Types complejos',
        'Integración nativa en Node y React',
        'Código autodescriptivo y escalable'
      ]
    }
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    category: 'Backend',
    glowRGB: '51, 153, 51', // Node Green
    badgeColor: 'text-[#339933] border-[#339933]/20 bg-[#339933]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 fill-[#339933]" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm6 14.33l-6 3.38-6-3.38v-8.66l6-3.38 6 3.38v8.66z M12 6.13l-4 2.25v4.5l4 2.25 4-2.25v-4.5l-4-2.25zm0 1.87l2 1.13v2.25l-2 1.13-2-1.13v-2.25l2-1.13z"/>
      </svg>
    ),
    details: {
      domain: 'Scalable Microservices',
      points: [
        'APIs RESTful & WebSockets (Socket.io)',
        'Frameworks (Express, NestJS, Fastify)',
        'Autenticación JWT e integración OAuth',
        'Optimización de I/O y middleware'
      ]
    }
  },
  {
    id: 'n8n',
    title: 'n8n Workflow',
    category: 'Automatizaciones',
    glowRGB: '255, 108, 55', // n8n Orange
    badgeColor: 'text-[#FF6C37] border-[#FF6C37]/20 bg-[#FF6C37]/5',
    svg: (
      <svg viewBox="0 0 64 64" className="w-16 h-16 stroke-[#FF6C37] fill-none stroke-[2.5px]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="32" r="8" fill="#FF6C37" fillOpacity="0.1" />
        <circle cx="48" cy="18" r="8" fill="#FF6C37" fillOpacity="0.1" />
        <circle cx="48" cy="46" r="8" fill="#FF6C37" fillOpacity="0.1" />
        <line x1="24" y1="30" x2="40" y2="20" />
        <line x1="24" y1="34" x2="40" y2="44" />
      </svg>
    ),
    details: {
      domain: 'Intelligent Automation',
      points: [
        'Orquestación de APIs y flujos lógicos',
        'Nodos de código personalizados (JS)',
        'Webhooks lógicos e ingesta de datos',
        'Sincronización CRON y automatización'
      ]
    }
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    category: 'UX / UI Design',
    glowRGB: '6, 182, 212', // Tailwind Cyan
    badgeColor: 'text-[#06B6D4] border-[#06B6D4]/20 bg-[#06B6D4]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 fill-[#06B6D4]" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.916,0.229,1.572,0.895,2.297,1.631C13.682,10.612,15.112,12,18.002,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.916-0.229-1.572-0.895-2.297-1.63C16.321,6.188,14.891,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.916,0.23,1.572,0.895,2.297,1.63C7.682,17.812,9.112,19,12.002,19c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.916-0.229-1.572-0.895-2.297-1.63C10.321,13.388,8.891,12,6.001,12z"/>
      </svg>
    ),
    details: {
      domain: 'Atomic CSS Styling',
      points: [
        'Layouts fluidos responsivos (Mobile-First)',
        'Arquitectura de tokens y temas oscuros',
        'Optimizaciones de build CSS-in-JS',
        'Microinteracciones y transiciones'
      ]
    }
  },
  {
    id: 'sql',
    title: 'Bases de Datos',
    category: 'Infraestructura',
    glowRGB: '0, 122, 255', // SQL Blue
    badgeColor: 'text-[#007AFF] border-[#007AFF]/20 bg-[#007AFF]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-16 h-16 stroke-[#007AFF] fill-none stroke-[2.2px]" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="5" rx="8" ry="2.5" fill="#007AFF" fillOpacity="0.1" />
        <path d="M4 5v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5" />
        <path d="M4 11v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-6" />
      </svg>
    ),
    details: {
      domain: 'Data Modeling & Querying',
      points: [
        'PostgreSQL, MySQL y optimizaciones',
        'Modelado de esquemas y normalización',
        'Indexación y análisis de performance',
        'Integración con ORMs (Prisma, TypeORM)'
      ]
    }
  }
];

interface TechCardProps {
  tech: typeof TECH_ITEMS[0];
  index: number;
}

function TechCard({ tech, index }: TechCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Local coordinates state for spotlight and 3D parallax tilt
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative cursor coordinates inside the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Normalize coordinates to [-0.5, 0.5] range for tilt calculation
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Apply smooth custom tilt logic (max 10 degrees)
    setTilt({
      x: -normY * 10,
      y: normX * 10,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth return to default state when cursor leaves the card
    setTilt({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Border Spotlight radial gradient styles
  const spotlightStyle = isHovered
    ? {
        background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(${tech.glowRGB}, 0.22), transparent 80%)`,
      }
    : {};

  const borderSpotlightStyle = isHovered
    ? {
        background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(${tech.glowRGB}, 0.5), transparent 70%)`,
      }
    : {
        background: 'rgba(255, 255, 255, 0.1)',
      };

  // Translate 3D tilt coordinates into inline CSS transforms
  const transform3D = !isFlipped && isHovered
    ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    : '';

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[320px] sm:h-[350px] cursor-pointer"
      style={{
        perspective: '1000px',
      }}
      data-cursor="spin"
    >
      {/* Rotation viewport container (preserve-3d) */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out rounded-[20px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : transform3D,
        }}
      >
        
        {/* --- FRONT FACE --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-[20px] p-[1.5px] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            ...borderSpotlightStyle,
          }}
        >
          {/* Inner card content (hides the border fill and acts as glassmorphic sheet) */}
          <div className="relative w-full h-full rounded-[19px] bg-zinc-950/90 flex flex-col justify-between p-6 overflow-hidden">
            {/* Spotlight Backing glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[19px]"
              style={spotlightStyle}
            />

            {/* Header Badge */}
            <div className="flex justify-between items-center z-10">
              <span className={`text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${tech.badgeColor}`}>
                {tech.category}
              </span>
              <div className="text-[9px] text-white/20 font-mono tracking-widest uppercase">
                Stack: 0{index + 1}
              </div>
            </div>

            {/* Logo and title */}
            <div className="flex flex-col items-center justify-center flex-grow z-10 gap-4 mt-2">
              <div className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-105">
                {tech.svg}
              </div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-widest text-white font-sans uppercase">
                {tech.title}
              </h3>
            </div>

            {/* Footer detail */}
            <div className="flex items-center justify-between z-10 border-t border-white/5 pt-3 text-[9px] text-white/30 tracking-wider">
              <span>GONZALO VARELA</span>
              <span className="flex items-center gap-1 font-mono text-[8px] animate-pulse text-white/20">
                CLICK PARA INFO ↗
              </span>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-[20px] p-[1.5px] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            ...borderSpotlightStyle,
          }}
        >
          <div className="relative w-full h-full rounded-[19px] bg-zinc-950/95 flex flex-col justify-between p-6 overflow-hidden">
            {/* Spotlight Backing glow for the back face */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[19px]"
              style={spotlightStyle}
            />

            {/* Magnetic Stripe representation */}
            <div className="absolute left-0 right-0 top-3 h-2 bg-white/5 border-t border-b border-white/5 z-10" />

            {/* Domain details and bullet list points */}
            <div className="flex flex-col gap-3.5 text-left mt-5 z-20 flex-grow justify-center">
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                // {tech.details.domain}
              </div>
              <ul className="flex flex-col gap-2.5">
                {tech.details.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[10px] text-white/80 leading-relaxed font-sans">
                    <span className="text-[#FF2D55] font-mono select-none">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer details */}
            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-white/30 z-20">
              <span>SYS GRADUATE</span>
              <span className="text-white/20">VOLVER ↩</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section className="relative w-full bg-[#000000] text-white py-24 sm:py-32 px-6 overflow-hidden select-none z-10 border-t border-b border-white/5">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] blur-[140px] pointer-events-none rounded-full" />

      {/* Title Header */}
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center w-full px-5">
        <GSAPRevealTitle
          text="mi stack"
          className="font-black uppercase text-center text-white mb-16 sm:mb-20 md:mb-28 text-[clamp(3.5rem,10vw,160px)] leading-none tracking-tight w-full"
        />
      </div>

      {/* Grid containing the glassmorphic interactive cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 w-full">
        {TECH_ITEMS.map((tech, i) => (
          <TechCard key={tech.id} tech={tech} index={i} />
        ))}
      </div>

    </section>
  );
}
