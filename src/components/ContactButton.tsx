import type { ButtonHTMLAttributes } from 'react'

interface ContactButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function ContactButton({ className = '', ...props }: ContactButtonProps) {
  return (
    <button
      className={`
        group
        relative
        rounded-full 
        text-white
        bg-transparent
        font-medium 
        uppercase 
        tracking-widest 
        transition-all 
        duration-[400ms]
        hover:text-[#0C0C0C]
        active:scale-[0.97]
        px-8 py-3 
        sm:px-10 sm:py-3.5 
        md:px-12 md:py-4 
        text-[10px] 
        sm:text-xs 
        cursor-pointer
        border border-white/20
        hover:border-white
        overflow-hidden
        ${className}
      `}
      {...props}
    >
      {/* Background slide-up fill element */}
      <div 
        className="absolute inset-0 bg-white translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none rounded-full"
      />
      
      {/* Text element */}
      <span className="relative z-10 flex items-center justify-center gap-1.5 font-semibold">
        Hablemos <span className="text-[10px] sm:text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </span>
    </button>
  )
}
