import { useEffect, useRef } from 'react'
import * as THREE from 'three'

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
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 7

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // 4. Create 3D Minimalist Geometric Box & Vertices (White/Black theme)
    const boxGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2, 2, 2, 2)
    
    // Wireframe material for the box faces
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    })
    const boxMesh = new THREE.Mesh(boxGeometry, wireframeMaterial)
    scene.add(boxMesh)

    // Glow points at vertices to look like a digital node architecture
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
    const pointSystem = new THREE.Points(boxGeometry, pointsMaterial)
    boxMesh.add(pointSystem)

    // 5. Mouse Interaction variables
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let hoverSpeed = 1

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = (event.clientX - rect.left - rect.width / 2) / 120
      mouseY = (event.clientY - rect.top - rect.height / 2) / 120
    }

    const handleMouseEnter = () => {
      hoverSpeed = 2.8 // Rotate faster on mouse hover
    }

    const handleMouseLeave = () => {
      hoverSpeed = 1
      mouseX = 0
      mouseY = 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    // 6. Animation Loop
    let clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Smooth lerp for mouse movements
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      // Base rotation combined with mouse tilt and hover speed multiplier
      boxMesh.rotation.y = elapsedTime * 0.12 * hoverSpeed + targetX
      boxMesh.rotation.x = elapsedTime * 0.08 * hoverSpeed + targetY
      boxMesh.rotation.z = elapsedTime * 0.04

      // Gentle pulse animation on points scale
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.03
      pointSystem.scale.set(pulse, pulse, pulse)

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
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      resizeObserver.disconnect()
      boxGeometry.dispose()
      wireframeMaterial.dispose()
      pointsMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative w-full bg-[#000000] text-white py-20 sm:py-28 px-6 overflow-hidden z-20 border-b border-white/5">
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        
        {/* Left Column: Branding & Copy (Minimal & honest freelancer tone) */}
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase mb-3 block">
            // MI MARCA FREELANCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white uppercase mb-6 font-sans">
            Vyte
          </h2>
          <p className="text-[#D7E2EA]/70 font-light text-sm sm:text-base leading-relaxed mb-8 max-w-[460px]">
            **Vyte** es el emprendimiento bajo el cual desarrollo proyectos digitales de forma independiente. A través de esta marca, creo sitios corporativos, landings de conversión y aplicaciones web veloces, optimizadas y con un enfoque muy cuidado en el diseño y la interactividad.
          </p>

          {/* Minimal specs board */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-white/10 py-6 mb-8 max-w-[460px] font-mono">
            <div className="flex flex-col gap-1">
              <span className="text-white text-xs sm:text-sm font-bold">99+</span>
              <span className="text-[8px] text-white/40 uppercase tracking-wider">Performance</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white text-xs sm:text-sm font-bold">SEO</span>
              <span className="text-[8px] text-white/40 uppercase tracking-wider">Optimizado</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white text-xs sm:text-sm font-bold">Clean</span>
              <span className="text-[8px] text-white/40 uppercase tracking-wider">Código</span>
            </div>
          </div>

          {/* Call to action */}
          <a
            href="https://vyte-dev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-max px-8 py-3 rounded-full overflow-hidden border border-white/20 bg-white/5 text-white font-medium text-xs uppercase tracking-widest transition-all duration-300 hover:border-white/80 hover:bg-white/10 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver vyte-dev.com <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>

        {/* Right Column: Interactive 3D Canvas Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-square md:h-[400px] rounded-2xl bg-zinc-950/40 border border-white/5 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing group shadow-2xl"
        >
          {/* Subtle grid border background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Three.js canvas element */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10 pointer-events-none" />

          {/* Hologram scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-30" />
        </div>

      </div>
    </section>
  )
}
