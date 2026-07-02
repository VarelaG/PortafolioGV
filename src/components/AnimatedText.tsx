import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')

  // Calculate global character indices for smooth character-by-character progression
  let charCount = 0
  const wordsWithChars = words.map((word) => {
    const chars = word.split('')
    const wordWithIndices = chars.map((char) => {
      const index = charCount
      charCount++
      return { char, index }
    })
    // Account for the space between words
    charCount++
    return wordWithIndices
  })

  const totalChars = charCount

  return (
    <p ref={containerRef} className={className} style={style}>
      {wordsWithChars.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.map(({ char, index }) => (
            <Character
              key={index}
              char={char}
              progress={scrollYProgress}
              range={[index / totalChars, (index + 2) / totalChars]} // Adding overlap for transition smoothness
            />
          ))}
        </span>
      ))}
    </p>
  )
}

interface CharacterProps {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}

function Character({ char, progress, range }: CharacterProps) {
  const opacity = useTransform(progress, range, [0.2, 1])

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder for structural spacing */}
      <span className="opacity-0">{char}</span>
      {/* Absolute positioned animated span for opacity transition */}
      <motion.span style={{ opacity }} className="absolute left-0 top-0 select-none">
        {char}
      </motion.span>
    </span>
  )
}
