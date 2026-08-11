import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

const WORDS = ['DISEÑO', 'CÓDIGO', 'SISTEMAS', 'INTERACCIÓN', 'VYTE']

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)

  // Fast Progress & Word Rotation Simulation (Total duration ~1.5s)
  useEffect(() => {
    // 1. Word Index Rotation
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < WORDS.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 280) // Rotate word every 280ms

    // 2. Progress Counter Simulation (0 to 100)
    let currentProgress = 0
    const progressInterval = setInterval(() => {
      // Fast exponential-like steps
      const increment = Math.floor(Math.random() * 8) + 6
      currentProgress = Math.min(currentProgress + increment, 100)
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(progressInterval)
        clearInterval(wordInterval)
        setWordIndex(WORDS.length - 1) // Ensure it lands on VYTE
        
        // Final transition trigger after landing on the last word
        setTimeout(() => {
          setIsDone(true)
          setTimeout(onComplete, 800) // Delay to let curtain slide up completely
        }, 350)
      }
    }, 90)

    return () => {
      clearInterval(progressInterval)
      clearInterval(wordInterval)
    }
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
          <div className="flex justify-between items-start font-mono text-[9px] sm:text-xs text-white/30 tracking-widest uppercase">
            <div>GONZALO VARELA</div>
            <div>DEVELOPMENT PORTFOLIO</div>
          </div>

          {/* Central concept text morphing */}
          <div className="flex items-center justify-center flex-grow">
            <div className="h-[75px] sm:h-[120px] overflow-hidden relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ 
                    duration: 0.28, 
                    ease: [0.215, 0.61, 0.355, 1] 
                  }}
                  className="block text-[clamp(2.2rem,8vw,96px)] font-bold tracking-widest text-white font-sans text-center uppercase"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom status & small corner counter */}
          <div className="flex justify-between items-end font-mono text-[9px] sm:text-xs text-white/30 tracking-widest uppercase border-t border-white/5 pt-6 select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>CARGANDO RECURSOS</span>
            </div>
            
            {/* Small sophisticated counter on the right corner */}
            <div className="flex items-center gap-3 font-semibold text-white/50 text-[10px] sm:text-sm tabular-nums">
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
