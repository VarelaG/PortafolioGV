'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import type { ReactNode } from 'react'

interface SmoothScrollerProps {
  children: ReactNode
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  // Cast ReactLenis to any to bypass type conflicts between React versions
  const LenisComponent = ReactLenis as any

  return (
    <LenisComponent
      root
      options={{
        duration: 1.5, // Duración de scroll más extendida para una sensación premium fluida
        lerp: 0.06,    // Coeficiente de interpolación más bajo para mayor suavidad e inercia
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de inercia exponencial tipo Apple/iOS
        smoothWheel: true,
        wheelMultiplier: 0.95, // Sensibilidad sutilmente reducida para evitar saltos bruscos
      }}
    >
      {children}
    </LenisComponent>
  )
}
