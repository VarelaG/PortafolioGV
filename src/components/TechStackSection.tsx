import { useState, useRef } from 'react';
import GSAPRevealTitle from './GSAPRevealTitle';

interface TechItem {
  id: string;
  title: string;
  category: string;
  glowRGB: string;
  badgeColor: string;
  svg: React.ReactNode;
  details: {
    domain: string;
    points: string[];
  };
}

const TECH_ITEMS: TechItem[] = [
  {
    id: 'react',
    title: 'React',
    category: 'Frontend',
    glowRGB: '97, 218, 251',
    badgeColor: 'text-[#61DAFB] border-[#61DAFB]/20 bg-[#61DAFB]/5',
    svg: (
      <svg viewBox="-11.5 -10.23 23 20.47" className="w-12 h-12 text-[#61DAFB] fill-none stroke-[#61DAFB] stroke-[1.2px]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
    details: {
      domain: 'SPA & Components',
      points: [
        'Desarrollo moderno con React 18/19',
        'State Management con Zustand/Context',
        'Arquitecturas interactivas y modulares'
      ]
    }
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    category: 'Web Framework',
    glowRGB: '255, 255, 255',
    badgeColor: 'text-white border-white/20 bg-white/5',
    svg: (
      <svg viewBox="0 0 180 180" className="w-12 h-12 fill-white" xmlns="http://www.w3.org/2000/svg">
        <mask id="nextMask">
          <circle cx="90" cy="90" r="90" fill="white"/>
        </mask>
        <circle cx="90" cy="90" r="90" fill="black"/>
        <g mask="url(#nextMask)">
          <path d="M149.508 157.52L69.142 54H54v72h12.182V69.756l68.79 87.764z" fill="white"/>
          <path d="M115 54h12v72h-12z" fill="white"/>
        </g>
      </svg>
    ),
    details: {
      domain: 'SSR & PWA',
      points: [
        'Renderizado del lado del servidor (SSR)',
        'Estructura basada en App Router',
        'Configuraciones PWA instalables'
      ]
    }
  },
  {
    id: 'astro',
    title: 'Astro',
    category: 'Web Framework',
    glowRGB: '255, 94, 0',
    badgeColor: 'text-[#FF5E00] border-[#FF5E00]/20 bg-[#FF5E00]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[#FF5E00]" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9.5c0-1.38-1-3-2.5-4C15.2 4.6 13.5 4 12 4s-3.2.6-4.5 1.5C6 6.5 5 8.12 5 9.5c0 1.25.7 2.37 1.8 3L4 19.5c-.2.5.1.9.6.9h2.2c.4 0 .7-.2.9-.5l2.1-4.2h4.4l2.1 4.2c.2.3.5.5.9.5h2.2c.5 0 .8-.4.6-.9l-2.8-7c1.1-.63 1.8-1.75 1.8-3zm-7-3.5c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"/>
      </svg>
    ),
    details: {
      domain: 'Island Architecture',
      points: [
        'Sitios rápidos orientados al contenido',
        'Estrategias de hidratación parcial',
        'Integración multi-framework fluida'
      ]
    }
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    category: 'Lenguaje',
    glowRGB: '49, 120, 198',
    badgeColor: 'text-[#3178C6] border-[#3178C6]/20 bg-[#3178C6]/5',
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 fill-[#3178C6]" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="14" fill="#3178C6"/>
        <text x="85" y="85" fill="white" fontSize="40" fontFamily='"Plus Jakarta Sans", system-ui, sans-serif' fontWeight="800" textAnchor="end">TS</text>
      </svg>
    ),
    details: {
      domain: 'Robust Type Safety',
      points: [
        'Tipado estricto e interfaces complejas',
        'Integración nativa en Node y React',
        'Código autodescriptivo y mantenible'
      ]
    }
  },
  {
    id: 'htmlcss',
    title: 'HTML & CSS',
    category: 'Web Basics',
    glowRGB: '230, 80, 40',
    badgeColor: 'text-[#E34C26] border-[#E34C26]/20 bg-[#E34C26]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[#E34C26]" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 5l1.7 15 8.3 3 8.3-3L22 5zm5.4 6H9.3l.2 2.3h7.6l-.6 6.3-4.6 1.3-4.6-1.3-.3-3.3h2.3l.1 1.7 2.5.7 2.5-.7.3-2.7H6.3L5.6 6h12.1z"/>
      </svg>
    ),
    details: {
      domain: 'Semantic & Layouts',
      points: [
        'Estructura web semántica (HTML5)',
        'CSS moderno (Flexbox, Grid, Variables)',
        'Optimización y compatibilidad nativa'
      ]
    }
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    category: 'Backend',
    glowRGB: '51, 153, 51',
    badgeColor: 'text-[#339933] border-[#339933]/20 bg-[#339933]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[#339933]" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm6 14.33l-6 3.38-6-3.38v-8.66l6-3.38 6 3.38v8.66z M12 6.13l-4 2.25v4.5l4 2.25 4-2.25v-4.5l-4-2.25zm0 1.87l2 1.13v2.25l-2 1.13-2-1.13v-2.25l2-1.13z"/>
      </svg>
    ),
    details: {
      domain: 'Runtimes & Scripts',
      points: [
        'Servidores y microservicios con Express',
        'Middleware y control de CORS seguro',
        'Optimización de I/O y variables'
      ]
    }
  },
  {
    id: 'restapi',
    title: 'REST API',
    category: 'APIs & Web',
    glowRGB: '0, 150, 136',
    badgeColor: 'text-[#009688] border-[#009688]/20 bg-[#009688]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-[#009688] fill-none stroke-[2px]" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="9" width="5" height="6" rx="1" fill="#009688" fillOpacity="0.1"/>
        <rect x="17" y="4" width="5" height="6" rx="1" fill="#009688" fillOpacity="0.1"/>
        <rect x="17" y="14" width="5" height="6" rx="1" fill="#009688" fillOpacity="0.1"/>
        <path d="M7 12h5v-5h5M12 12v5h5" strokeLinecap="round"/>
      </svg>
    ),
    details: {
      domain: 'Data Endpoints',
      points: [
        'Modelado de endpoints estructurados',
        'Manejo de estados HTTP y payloads',
        'Integración segura y comunicación cliente'
      ]
    }
  },
  {
    id: 'sql',
    title: 'Bases de Datos',
    category: 'Infraestructura',
    glowRGB: '0, 122, 255',
    badgeColor: 'text-[#007AFF] border-[#007AFF]/20 bg-[#007AFF]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-[#007AFF] fill-none stroke-[2.2px]" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="5" rx="8" ry="2.5" fill="#007AFF" fillOpacity="0.1" />
        <path d="M4 5v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5V5" />
        <path d="M4 11v6c0 1.38 3.58 2.5 8 2.5s8-1.12 8-2.5v-6" />
      </svg>
    ),
    details: {
      domain: 'Relational Schemas',
      points: [
        'PostgreSQL, MySQL y optimizaciones',
        'Modelado de esquemas y normalización',
        'Uso de ORMs (Prisma, TypeORM)'
      ]
    }
  },
  {
    id: 'supabase',
    title: 'Supabase',
    category: 'Infraestructura',
    glowRGB: '62, 207, 142',
    badgeColor: 'text-[#3ECF8E] border-[#3ECF8E]/20 bg-[#3ECF8E]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[#3ECF8E]" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.712-.255L2.099 12.83a.396.396 0 0 0 .323.632H12v8.958a.396.396 0 0 0 .712.255l9.189-12.69a.396.396 0 0 0-.323-.631z"/>
      </svg>
    ),
    details: {
      domain: 'Realtime BaaS',
      points: [
        'Persistencia Postgres en la nube',
        'Triggers SQL y funciones avanzadas',
        'Seguridad de datos de nivel de fila (RLS)'
      ]
    }
  },
  {
    id: 'antigravity',
    title: 'Antigravity',
    category: 'AI Tooling',
    glowRGB: '255, 0, 127',
    badgeColor: 'text-[#FF007F] border-[#FF007F]/20 bg-[#FF007F]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-[#FF007F] fill-none stroke-[2px]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="13" r="6" fill="#FF007F" fillOpacity="0.1"/>
        <path d="M12 7c0-2-1.5-3-3-3M12 7c2 0 3-1.5 3-3" strokeLinecap="round"/>
        <path d="M9 13s1-1 3-1 3 1 3 1" strokeLinecap="round"/>
        <path d="M12 17v2m-3-1l3 1 3-1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    details: {
      domain: 'AI Coding Partner',
      points: [
        'Asistente de desarrollo de Google DeepMind',
        'Optimización y refactorización inteligente',
        'Creación ágil de arquitecturas premium'
      ]
    }
  },
  {
    id: 'n8n',
    title: 'n8n Workflows',
    category: 'Automatizaciones',
    glowRGB: '255, 108, 55',
    badgeColor: 'text-[#FF6C37] border-[#FF6C37]/20 bg-[#FF6C37]/5',
    svg: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-[#FF6C37] fill-none stroke-[2.5px]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="32" r="8" fill="#FF6C37" fillOpacity="0.1" />
        <circle cx="48" cy="18" r="8" fill="#FF6C37" fillOpacity="0.1" />
        <circle cx="48" cy="46" r="8" fill="#FF6C37" fillOpacity="0.1" />
        <line x1="24" y1="30" x2="40" y2="20" />
        <line x1="24" y1="34" x2="40" y2="44" />
      </svg>
    ),
    details: {
      domain: 'Intelligent Pipelines',
      points: [
        'Orquestación de APIs y flujos complejos',
        'Nodos de código de JavaScript personalizados',
        'Integración IMAP, CRON y automatización'
      ]
    }
  },
  {
    id: 'vercel',
    title: 'Vercel',
    category: 'Cloud Deploy',
    glowRGB: '255, 255, 255',
    badgeColor: 'text-white border-white/20 bg-white/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L24 22H0L12 1Z"/>
      </svg>
    ),
    details: {
      domain: 'Serverless Hosting',
      points: [
        'Despliegue y hosting de apps frontend/SSR',
        'Edge Functions y optimizaciones globales',
        'Despliegue continuo integrado con Git'
      ]
    }
  },
  {
    id: 'hostinger',
    title: 'Hostinger',
    category: 'Hosting & VPS',
    glowRGB: '103, 61, 230',
    badgeColor: 'text-[#673DE6] border-[#673DE6]/20 bg-[#673DE6]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[#673DE6]" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 3h4v7h8V3h4v18h-4v-7H8v7H4V3z"/>
      </svg>
    ),
    details: {
      domain: 'Server Infrastructure',
      points: [
        'Administración de VPS y servidores compartidos',
        'Configuraciones de dominio, DNS y SSL',
        'Despliegue de backends Node.js y bases de datos'
      ]
    }
  },
  {
    id: 'github',
    title: 'GitHub',
    category: 'Version Control',
    glowRGB: '240, 246, 252',
    badgeColor: 'text-[#F0F6F2] border-[#F0F6F2]/20 bg-[#F0F6F2]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[#F0F6F2]" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
    details: {
      domain: 'CI/CD & Git',
      points: [
        'Control de versiones colaborativo',
        'GitHub Actions para integración continua',
        'Estrategias de branching y pull requests'
      ]
    }
  },
  {
    id: 'framermotion',
    title: 'Framer Motion',
    category: 'Motion Design',
    glowRGB: '241, 0, 184',
    badgeColor: 'text-[#F100B8] border-[#F100B8]/20 bg-[#F100B8]/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-[#F100B8]" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h12v12H0V0zm12 12h12v12H12V12zM0 12h12v12H0V12z"/>
      </svg>
    ),
    details: {
      domain: 'React Animations',
      points: [
        'Animaciones basadas en física real',
        'Gestión de layouts fluidos y transiciones',
        'Animaciones al entrar en vista (whileInView)'
      ]
    }
  },
  {
    id: 'gsap',
    title: 'GSAP',
    category: 'Motion Design',
    glowRGB: '136, 206, 0',
    badgeColor: 'text-[#88CE00] border-[#88CE00]/20 bg-[#88CE00]/5',
    svg: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 fill-[#88CE00]" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="14" fill="#88CE00" fillOpacity="0.1" stroke="#88CE00" strokeWidth="2"/>
        <text x="50" y="65" fill="#88CE00" fontSize="42" fontFamily='"Plus Jakarta Sans", system-ui, sans-serif' fontWeight="900" textAnchor="middle">G</text>
      </svg>
    ),
    details: {
      domain: 'Scroll Timelines',
      points: [
        'Animaciones controladas por ScrollTrigger',
        'Orquestación compleja con Timelines',
        'Optimización extrema de renderizado'
      ]
    }
  },
  {
    id: 'three',
    title: 'Three.js',
    category: '3D Graphics',
    glowRGB: '255, 255, 255',
    badgeColor: 'text-white border-white/20 bg-white/5',
    svg: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-white fill-none stroke-[1.8px]" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    details: {
      domain: 'WebGL Experiences',
      points: [
        'Renderizado interactivo 3D en web',
        'Optimización matemática de polígonos',
        'Física, luces y cámaras inmersivas'
      ]
    }
  }
];

interface TechCardProps {
  tech: TechItem;
  index: number;
}

function TechCard({ tech, index }: TechCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    setTilt({
      x: -normY * 8,
      y: normX * 8,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleCardClick = () => setIsFlipped(!isFlipped);

  const spotlightStyle = isHovered
    ? {
        background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(${tech.glowRGB}, 0.2), transparent 80%)`,
      }
    : {};

  const borderSpotlightStyle = isHovered
    ? {
        background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(${tech.glowRGB}, 0.45), transparent 70%)`,
      }
    : {
        background: 'rgba(255, 255, 255, 0.08)',
      };

  const transform3D = !isFlipped && isHovered
    ? `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
    : '';

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[225px] sm:h-[240px] cursor-pointer"
      style={{ perspective: '1000px' }}
      data-cursor="spin"
    >
      <div
        className="relative w-full h-full transition-transform duration-[600ms] ease-out rounded-[16px]"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : transform3D,
        }}
      >
        {/* --- FRONT FACE --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-[16px] p-[1.2px] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            ...borderSpotlightStyle,
          }}
        >
          <div className="relative w-full h-full rounded-[15px] bg-zinc-950/90 flex flex-col justify-between p-4 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[15px]"
              style={spotlightStyle}
            />

            {/* Header Badge */}
            <div className="flex justify-between items-center z-10">
              <span className={`text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${tech.badgeColor}`}>
                {tech.category}
              </span>
              <div className="text-[8px] text-white/20 font-mono tracking-widest">
                Stack: {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>
            </div>

            {/* Logo and title */}
            <div className="flex flex-col items-center justify-center flex-grow z-10 gap-3 mt-1">
              <div className="filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105">
                {tech.svg}
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold tracking-widest text-white font-sans uppercase text-center truncate w-full">
                {tech.title}
              </h3>
            </div>

            {/* Footer detail */}
            <div className="flex items-center justify-between z-10 border-t border-white/5 pt-2 text-[8px] text-white/30 tracking-wider">
              <span>GONZALO VARELA</span>
              <span className="flex items-center gap-1 font-mono text-[7px] text-white/20">
                INFO ↗
              </span>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className="absolute inset-0 w-full h-full rounded-[16px] p-[1.2px] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            ...borderSpotlightStyle,
          }}
        >
          <div className="relative w-full h-full rounded-[15px] bg-zinc-950/95 flex flex-col justify-between p-4 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[15px]"
              style={spotlightStyle}
            />

            <div className="absolute left-0 right-0 top-2 h-1 bg-white/5 border-t border-b border-white/5 z-10" />

            {/* Domain details and bullet list points */}
            <div className="flex flex-col gap-2.5 text-left mt-3 z-20 flex-grow justify-center">
              <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest truncate">
                // {tech.details.domain}
              </div>
              <ul className="flex flex-col gap-1.5">
                {tech.details.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[9px] text-white/80 leading-relaxed font-sans">
                    <span className="text-[#FF2D55] font-mono select-none">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer details */}
            <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[7px] font-mono text-white/30 z-20">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] blur-[140px] pointer-events-none rounded-full" />

      {/* Title Header */}
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center w-full px-5">
        <GSAPRevealTitle
          text="mi stack"
          className="font-black uppercase text-center text-white mb-16 sm:mb-20 md:mb-28 text-[clamp(3.5rem,10vw,160px)] leading-none tracking-tight w-full"
        />
      </div>

      {/* Optimized responsive grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 w-full">
        {TECH_ITEMS.map((tech, i) => (
          <TechCard key={tech.id} tech={tech} index={i} />
        ))}
      </div>
    </section>
  );
}
