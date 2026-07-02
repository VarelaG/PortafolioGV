import type { ButtonHTMLAttributes } from 'react'

interface ContactButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function ContactButton({ className = '', ...props }: ContactButtonProps) {
  return (
    <button
      className={`
        rounded-full 
        text-[#0C0C0C] 
        bg-white
        font-medium 
        uppercase 
        tracking-widest 
        transition-all 
        duration-300 
        hover:bg-[#D7E2EA]
        active:scale-[0.98]
        px-8 py-3 
        sm:px-10 sm:py-3.5 
        md:px-12 md:py-4 
        text-xs 
        sm:text-sm 
        md:text-base
        cursor-pointer
        border border-white
        shadow-[0_4px_14px_0_rgba(255,255,255,0.1)]
        ${className}
      `}
      {...props}
    >
      Contactame
    </button>
  )
}
