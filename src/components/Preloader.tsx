import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('INITIALIZING')
  const [isDone, setIsDone] = useState(false)

  // Progress simulation with variable speeds
  useEffect(() => {
    let currentProgress = 0
    let timer: any

    const updateProgress = () => {
      if (currentProgress >= 100) {
        setProgress(100)
        setLoadingText('READY')
        setTimeout(() => {
          setIsDone(true)
          setTimeout(onComplete, 800) // Delay to let the curtain slide up completely
        }, 500)
        return
      }

      // Variable increment steps to feel organic
      let increment = 1
      if (currentProgress < 30) {
        increment = Math.floor(Math.random() * 8) + 4 // Fast at start
      } else if (currentProgress < 75) {
        increment = Math.floor(Math.random() * 4) + 1 // Normal speed
      } else {
        increment = Math.floor(Math.random() * 2) + 1 // Slower at final stage
      }

      currentProgress = Math.min(currentProgress + increment, 100)
      setProgress(currentProgress)

      // Set technical text updates
      if (currentProgress < 25) {
        setLoadingText('INITIALIZING SYSTEMS')
      } else if (currentProgress < 50) {
        setLoadingText('COMPILING 3D CORE')
      } else if (currentProgress < 75) {
        setLoadingText('OPTIMIZING PORTFOLIO ASSETS')
      } else if (currentProgress < 98) {
        setLoadingText('ESTABLISHING PIPELINES')
      }

      // Variable interval duration
      const nextDelay = currentProgress < 30 ? 60 : currentProgress < 75 ? 120 : 180
      timer = setTimeout(updateProgress, nextDelay)
    }

    timer = setTimeout(updateProgress, 100)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { 
              duration: 1.1, 
              ease: [0.76, 0, 0.24, 1] // Awwwards custom cubic-bezier
            }
          }}
          className="fixed inset-0 w-full h-screen bg-[#09090b] text-white flex flex-col justify-between p-8 sm:p-12 z-[9999] overflow-hidden select-none pointer-events-auto"
        >
          {/* Top header details */}
          <div className="flex justify-between items-start font-mono text-[9px] sm:text-xs text-white/35 tracking-widest uppercase">
            <div>GONZALO VARELA</div>
            <div>PORTFOLIO 2026 // ED. 08</div>
          </div>

          {/* Central progress view */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Massive progressive percentage */}
            <h1 className="text-[clamp(4.5rem,14vw,200px)] font-black leading-none tracking-tighter text-white font-sans select-none tabular-nums">
              {progress}%
            </h1>
            {/* Underline pulse indicator */}
            <div className="w-[120px] h-[1px] bg-white/10 mt-6 relative overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom status details */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[9px] sm:text-xs text-white/35 tracking-widest uppercase border-t border-white/5 pt-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{loadingText}</span>
            </div>
            <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
