'use client'

import { useRef, useEffect, cloneElement, type ReactElement } from 'react'
import { gsap } from 'gsap'

interface MagneticProps {
  children: ReactElement
}

export default function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      // Center coordinates of the button
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Offset distances between cursor and center
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      // Hypotenuse distance
      const distance = Math.hypot(distanceX, distanceY)
      const triggerRadius = 80 // Pull radius in pixels

      if (distance < triggerRadius) {
        // Move element toward cursor (pull factor)
        const pull = 0.35
        gsap.to(el, {
          x: distanceX * pull,
          y: distanceY * pull,
          duration: 0.3,
          ease: 'power2.out'
        })
      } else {
        // Return back elastically when outside trigger zone
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)'
        })
      }
    }

    const handleMouseLeave = () => {
      // Elastic snap-back on mouse leave
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Clone element to map target ref cleanly
  return cloneElement(children as ReactElement<any>, { ref } as any)
}
