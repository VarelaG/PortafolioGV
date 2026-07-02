import type { ButtonHTMLAttributes } from 'react'

interface LiveProjectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default function LiveProjectButton({ className = '', ...props }: LiveProjectButtonProps) {
  return (
    <button
      className={`
        rounded-full 
        border-2 
        border-[#D7E2EA] 
        text-[#D7E2EA] 
        font-medium 
        uppercase 
        tracking-widest 
        transition-all 
        duration-300 
        hover:bg-[#D7E2EA]/10
        active:scale-[0.98]
        px-8 py-3 
        sm:px-10 sm:py-3.5 
        text-sm 
        sm:text-base
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      Ver Proyecto
    </button>
  )
}
