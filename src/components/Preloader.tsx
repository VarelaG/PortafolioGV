import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  // Fast Progress Simulation (Total duration ~1.4s)
  useEffect(() => {
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      // Fast exponential-like steps
      const increment = Math.floor(Math.random() * 8) + 6
      currentProgress = Math.min(currentProgress + increment, 100)
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(progressInterval)
        
        // Final transition trigger
        setTimeout(() => {
          setIsDone(true)
          setTimeout(onComplete, 800) // Delay to let curtain slide up completely
        }, 400)
      }
    }, 85)

    return () => clearInterval(progressInterval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { 
              duration: 0.95, 
              ease: [0.76, 0, 0.24, 1] // Cinematic Awwwards cubic-bezier
            }
          }}
          className="fixed inset-0 w-full h-screen bg-[#09090b] text-white flex flex-col justify-between p-8 sm:p-12 z-[9999] overflow-hidden select-none pointer-events-auto"
        >
          {/* Top header details */}
          <div className="flex justify-between items-start font-mono text-[9px] sm:text-xs text-white/20 tracking-widest uppercase">
            <div>PORTFOLIO</div>
            <div>EST. 2026</div>
          </div>

          {/* Central minimal text (Awwwards layout: light font, high tracking) */}
          <div className="flex items-center justify-center flex-grow">
            <div className="overflow-hidden py-4">
              <motion.h1
                initial={{ y: '110%', opacity: 0, letterSpacing: '0.15em' }}
                animate={{ 
                  y: '0%', 
                  opacity: 1,
                  letterSpacing: '0.38em',
                  transition: {
                    duration: 1.35,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                exit={{ 
                  y: '-110%', 
                  opacity: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }}
                className="text-[clamp(2.4rem,7vw,80px)] font-extralight text-white font-sans text-center uppercase tracking-[0.38em] pl-[0.38em] leading-none"
              >
                VARELA
              </motion.h1>
            </div>
          </div>

          {/* Bottom status & small corner counter */}
          <div className="flex justify-between items-end font-mono text-[9px] sm:text-xs text-white/20 tracking-widest uppercase border-t border-white/5 pt-6 select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
              <span>CARGANDO</span>
            </div>
            
            {/* Small sophisticated counter on the right corner */}
            <div className="flex items-center gap-3 font-semibold text-white/40 text-[10px] sm:text-sm tabular-nums">
              <span>PROGRESS</span>
              <span className="text-white font-bold w-[45px] text-right">
                {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
