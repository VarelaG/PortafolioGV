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
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 3.2, 5.5)
    camera.lookAt(0, 0, 0)

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // 4. Create 3D Terrain Wave Grid (White/Black minimal style)
    const size = 6.2
    const segments = 28
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments)
    
    // Rotate to lay flat horizontally like a grid plane in perspective
    geometry.rotateX(-Math.PI / 2.1)
    geometry.rotateY(-Math.PI / 16)

    // Store original Z positions for animation math
    const count = geometry.attributes.position.count
    const originalZ = new Float32Array(count)
    const originalPositions = geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      originalZ[i] = originalPositions[i * 3 + 2] // Z axis is local height after rotation
    }

    // Wireframe material for the grid lines
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    })
    const terrainMesh = new THREE.Mesh(geometry, wireframeMaterial)
    scene.add(terrainMesh)

    // Glowing points at vertices
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.038,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    })
    const pointSystem = new THREE.Points(geometry, pointsMaterial)
    terrainMesh.add(pointSystem)

    // 5. Mouse Interaction variables
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = (event.clientX - rect.left - rect.width / 2) / 200
      mouseY = (event.clientY - rect.top - rect.height / 2) / 200
    }

    const handleMouseLeave = () => {
      mouseX = 0
      mouseY = 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    // 6. Animation Loop
    let clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      const posAttribute = geometry.getAttribute('position') as THREE.BufferAttribute
      const posArray = posAttribute.array as Float32Array

      // Smooth lerp mouse target
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      for (let i = 0; i < count; i++) {
        const xIdx = i * 3
        const yIdx = i * 3 + 1
        const zIdx = i * 3 + 2

        const x = originalPositions[xIdx]
        const y = originalPositions[yIdx]

        // Math wave formula (Sine combination based on distance to simulate ripple)
        const distance = Math.sqrt(x * x + y * y)
        const wave = Math.sin(distance * 1.8 - elapsedTime * 1.6) * 0.22
        const secondaryWave = Math.cos(x * 1.2 + elapsedTime * 1.2) * 0.08

        // Local displacement
        posArray[zIdx] = originalZ[i] + wave + secondaryWave
      }
      posAttribute.needsUpdate = true

      // Move grid based on mouse tilt
      terrainMesh.rotation.z = elapsedTime * 0.02 + targetX * 0.3
      terrainMesh.rotation.x = -Math.PI / 2.3 + targetY * 0.2

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
      container.removeEventListener('mouseleave', handleMouseLeave)
      resizeObserver.disconnect()
      geometry.dispose()
      wireframeMaterial.dispose()
      pointsMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative w-full bg-[#000000] text-white py-24 sm:py-32 px-6 overflow-hidden z-20 border-b border-white/5">
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center relative z-10">
        
        {/* Left Column: Editorial & Info cards (Awwwards-style layout) */}
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-mono tracking-[0.25em] text-white/30 uppercase mb-3 block pl-4">
            [02 // INICIATIVA DIGITAL]
          </span>
          <div className="mb-6 pl-4">
            <GSAPRevealTitle
              text="Vyte"
              className="hero-heading font-black uppercase text-[clamp(2.4rem,10vw,160px)] leading-none tracking-tight text-white text-left"
            />
          </div>
          <p className="text-white/60 font-light text-sm sm:text-base leading-relaxed mb-10 max-w-[460px] pl-4">
            **Vyte** es mi marca de desarrollo independiente. A través de ella, transformo requisitos complejos en landings de conversión y plataformas web rápidas, optimizadas y con un enfoque muy riguroso en la <strong className="font-semibold text-white">calidad de código</strong> y la <strong className="font-semibold text-white">experiencia interactiva</strong>.
          </p>

          {/* Cards metrics instead of simple table */}
          <div className="flex flex-col gap-4 mb-10 max-w-[460px]">
            {[
              {
                metric: '99+',
                title: 'PERFORMANCE',
                desc: 'Arquitectura optimizada para tiempos de carga y respuesta inmediatos (Core Web Vitals).'
              },
              {
                metric: 'SEO',
                title: 'OPTIMIZADO',
                desc: 'Estructuración semántica rigurosa y meta-etiquetado limpio para máxima visibilidad.'
              },
              {
                metric: 'CLEAN',
                title: 'CÓDIGO',
                desc: 'Desarrollo escalable, tipado con TypeScript y mantenible a largo plazo.'
              }
            ].map((spec, i) => (
              <div 
                key={i} 
                className="flex items-center gap-6 p-4 rounded-xl border border-white/5 bg-zinc-950/20 hover:bg-zinc-950/60 hover:border-white/15 transition-all duration-300 group"
              >
                <span className="text-sm font-mono font-bold text-white/40 group-hover:text-white transition-colors min-w-[32px]">
                  {spec.metric}
                </span>
                <div className="flex flex-col gap-0.5 text-left border-l border-white/10 pl-6">
                  <span className="text-[9px] font-mono tracking-widest text-white/35 group-hover:text-white/60 transition-colors uppercase">
                    {spec.title}
                  </span>
                  <span className="text-[11px] text-white/50 leading-relaxed font-light">
                    {spec.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action (Awwwards-style fill animation) */}
          <div className="pl-4">
            <a
              href="https://vyte-dev.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block px-8 py-3.5 rounded-full overflow-hidden border border-white/20 hover:border-white bg-transparent text-white font-medium text-xs uppercase tracking-widest transition-all duration-[400ms] hover:text-[#0C0C0C] active:scale-[0.97]"
            >
              <div className="absolute inset-0 bg-white translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none rounded-full" />
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                Ver vyte-dev.com <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Inmersive 3D Wave Terrain Canvas (floating freely, no container borders) */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-square md:h-[480px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing group z-10"
        >
          {/* Three.js canvas element */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10 pointer-events-none" />

          {/* Hologram scanline overlay for digital terrain feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.008)_50%,transparent_50%)] bg-[size:100%_4px] pointer-events-none z-20 opacity-30" />
        </div>

      </div>
    </section>
  )
}
