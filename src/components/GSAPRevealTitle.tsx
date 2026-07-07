import { motion } from 'framer-motion';

interface GSAPRevealTitleProps {
  text: string;
  className?: string;
  justifyClass?: string; // 'justify-center' | 'justify-start'
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.022,
    }
  }
} as const;

const letterVariants = {
  hidden: {
    y: "110%",
    rotate: 2,
  },
  visible: {
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 16,
      stiffness: 90,
    }
  }
} as const;

export default function GSAPRevealTitle({ text, className = '', justifyClass }: GSAPRevealTitleProps) {
  const words = text.split(' ');
  
  // Resolve layout alignment dynamically
  const defaultJustify = justifyClass || (className.includes('text-left') || className.includes('justify-start') ? 'justify-start' : 'justify-center');

  return (
    <motion.h2
      className={`${className} flex flex-wrap ${defaultJustify} overflow-hidden`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some", margin: "0px 0px 80px 0px" }}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block overflow-hidden whitespace-nowrap mr-[0.25em] px-3 py-6 sm:py-10 -my-6 sm:-my-10">
          {word.split('').map((letter, letterIdx) => (
            <motion.span
              key={letterIdx}
              variants={letterVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}
