import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import GSAPRevealTitle from './GSAPRevealTitle'

export default function VyteSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current

    // 1. Scene Setup
    const scene = new THREE.Scene()

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 8

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // 4. Create 3D Holographic Particle Sphere
    const particleCount = 1800
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const initialPositions = new Float32Array(particleCount * 3) // store original shapes for noise

    const radius = 3.2

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      initialPositions[i * 3] = x
      initialPositions[i * 3 + 1] = y
      initialPositions[i * 3 + 2] = z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Material with custom soft glowing points
    const material = new THREE.PointsMaterial({
      color: 0x8a2be2, // Purple/Violet branding color
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // 5. Mouse Interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = (event.clientX - rect.left - rect.width / 2) / 100
      mouseY = (event.clientY - rect.top - rect.height / 2) / 100
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 6. Animation Loop
    let clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Organic shape morphing (sine waves on position buffer)
      const posAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
      const posArray = posAttribute.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const xIdx = i * 3
        const yIdx = i * 3 + 1
        const zIdx = i * 3 + 2

        const ix = initialPositions[xIdx]
        const iy = initialPositions[yIdx]
        const iz = initialPositions[zIdx]

        // Create fluid wave distortion
        const dist = Math.sqrt(ix * ix + iy * iy + iz * iz)
        const wave = Math.sin(dist * 2.2 - elapsedTime * 1.5) * 0.12

        posArray[xIdx] = ix + (ix / dist) * wave
        posArray[yIdx] = iy + (iy / dist) * wave
        posArray[zIdx] = iz + (iz / dist) * wave
      }
      posAttribute.needsUpdate = true

      // Inertia mouse rotations
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      particleSystem.rotation.y = elapsedTime * 0.08 + targetX * 0.5
      particleSystem.rotation.x = elapsedTime * 0.05 + targetY * 0.5

      renderer.render(scene, camera)
    }

    animate()

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
    })

    resizeObserver.observe(container)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      resizeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative w-full bg-[#000000] text-white py-24 sm:py-32 px-6 overflow-hidden z-20 border-b border-white/5">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-950/[0.04] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Branding & Copy */}
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-semibold tracking-[0.25em] text-violet-400/60 uppercase mb-3 block">
            MI INICIATIVA
          </span>
          <GSAPRevealTitle
            text="Vyte Studio"
            className="font-black uppercase leading-none tracking-tight text-white mb-6 text-[clamp(2.5rem,6vw,80px)]"
          />
          <p className="text-[#D7E2EA]/75 font-light text-sm sm:text-base leading-relaxed mb-8 max-w-[460px]">
            Fundé **Vyte** con el objetivo de proveer servicios de desarrollo a medida enfocados en diseño premium, velocidad óptima y performance de nivel de agencia. Como Lead Developer, lidero la arquitectura de cada solución.
          </p>

          {/* Minimal specs board */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-white/10 py-6 mb-8 max-w-[460px]">
            <div className="flex flex-col gap-1">
              <span className="text-violet-400 font-mono text-xs sm:text-sm font-bold">100%</span>
              <span className="text-[9px] text-[#D7E2EA]/40 uppercase tracking-wider">Lighthouse</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-violet-400 font-mono text-xs sm:text-sm font-bold">SEO</span>
              <span className="text-[9px] text-[#D7E2EA]/40 uppercase tracking-wider">Optimizado</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-violet-400 font-mono text-xs sm:text-sm font-bold">UX/UI</span>
              <span className="text-[9px] text-[#D7E2EA]/40 uppercase tracking-wider">A Medida</span>
            </div>
          </div>

          {/* Call to action */}
          <a
            href="https://vyte-dev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-max px-8 py-3.5 rounded-full overflow-hidden border border-violet-500/30 bg-violet-950/10 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:border-violet-400/80 hover:bg-violet-900/20 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explorar vyte-dev.com <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </span>
            <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-violet-600/10 to-violet-500/5 transition-transform duration-500 ease-out" />
          </a>
        </div>

        {/* Right Column: Interactive 3D Canvas Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-square md:h-[450px] rounded-3xl bg-zinc-950/20 border border-white/5 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing group shadow-2xl"
        >
          {/* Subtle grid border background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          {/* Three.js canvas element */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10 pointer-events-none" />

          {/* Hologram aesthetic scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-50" />
        </div>

      </div>
    </section>
  )
}
