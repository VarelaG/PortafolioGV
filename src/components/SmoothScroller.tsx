'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import type { ReactNode } from 'react'

interface SmoothScrollerProps {
  children: ReactNode
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  // Cast ReactLenis to any to bypass type conflicts between React 19 and react-lenis's React 18 typings
  const LenisComponent = ReactLenis as any

  return (
    <LenisComponent
      root
      options={{
        duration: 1.2,
        lerp: 0.1,
      }}
    >
      {children}
    </LenisComponent>
  )
}
