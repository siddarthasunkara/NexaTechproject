"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+",  label: "Happy Clients" },
  { value: "10+",  label: "Years Experience" },
  { value: "24/7", label: "Support" },
]

const techStack = ["React","Next.js","TypeScript","Node.js","AWS","PostgreSQL","GraphQL","Kubernetes","Docker","Tailwind","Redis","Terraform"]

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    setSize()

    const particles: { x:number; y:number; vx:number; vy:number; size:number; opacity:number; hue:number }[] = []
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.45 + 0.05,
        hue: Math.random() > 0.5 ? 195 : 295,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `oklch(0.80 0.19 ${p.hue} / ${p.opacity})`
        ctx.fill()
      })
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `oklch(0.78 0.16 195 / ${0.07 * (1 - d/110)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener("resize", setSize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", setSize) }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid noise">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Ambient orbs */}
      <div className="absolute top-[15%] left-[10%] w-[700px] h-[700px] rounded-full bg-[oklch(0.80_0.19_195/0.04)] blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[oklch(0.67_0.24_295/0.05)] blur-[120px] pointer-events-none animate-pulse-glow delay-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-[oklch(0.80_0.19_195/0.02)] blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="animate-slide-up opacity-0-init mb-8" style={{animationFillMode:"forwards"}}>
          <span className="section-badge">
            <Sparkles className="w-3 h-3" />
            Transforming Ideas into Reality
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.80_0.19_195)] animate-ping-slow" />
          </span>
        </div>

        {/* Headline */}
        <div className="animate-slide-up opacity-0-init delay-150 max-w-5xl" style={{animationFillMode:"forwards"}}>
          <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] font-700 leading-[0.92] tracking-tight mb-0">
            <span className="block text-[oklch(0.97_0.005_264)]">Engineering</span>
            <span className="block text-gradient mt-2">the Future</span>
            <span className="block text-[oklch(0.97_0.005_264)] mt-1">of Tech.</span>
          </h1>
        </div>

        {/* Sub-headline accent line */}
        <div className="animate-fade-in opacity-0-init delay-300 w-24 h-0.5 bg-gradient-to-r from-[oklch(0.80_0.19_195)] to-[oklch(0.67_0.24_295)] rounded-full my-8" style={{animationFillMode:"forwards"}} />

        {/* Subtext */}
        <div className="animate-slide-up opacity-0-init delay-300" style={{animationFillMode:"forwards"}}>
          <p className="font-body text-lg md:text-xl text-[oklch(0.52_0.02_264)] max-w-2xl leading-relaxed mb-10">
            We partner with forward-thinking companies to deliver cutting-edge software
            solutions that drive growth, efficiency, and competitive advantage.
          </p>
        </div>

        {/* CTAs */}
        <div className="animate-slide-up opacity-0-init delay-400 flex flex-col sm:flex-row gap-4 mb-20" style={{animationFillMode:"forwards"}}>
          <a href="#contact">
            <button className="btn-shimmer group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-display font-600 text-sm overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-[oklch(0.80_0.19_195)] to-[oklch(0.67_0.24_295)]" />
              <span className="absolute inset-0 bg-gradient-to-r from-[oklch(0.67_0.24_295)] to-[oklch(0.80_0.19_195)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <span className="relative text-[oklch(0.06_0.012_264)] flex items-center gap-2">
                Start Your Project
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <span className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{boxShadow:"0 0 35px oklch(0.80 0.19 195 / 0.5)"}} />
            </button>
          </a>
          <a href="#services">
            <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-500 text-sm glass text-[oklch(0.70_0.02_264)] hover:text-[oklch(0.97_0.005_264)] hover:border-[oklch(0.80_0.19_195/0.35)] transition-all duration-300">
              Explore Services
              <ChevronDown className="h-4 w-4 rotate-[-90deg] group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </a>
        </div>

        {/* Stats */}
        <div className="animate-slide-up opacity-0-init delay-500 w-full max-w-3xl" style={{animationFillMode:"forwards"}}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[oklch(0.16_0.02_264)] rounded-2xl overflow-hidden border border-[oklch(0.16_0.02_264)]">
            {stats.map((s, i) => (
              <div key={s.label} className="bg-[oklch(0.09_0.014_264)] px-6 py-6 flex flex-col items-center hover:bg-[oklch(0.11_0.016_264)] transition-colors duration-300 group relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.80_0.19_195/0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-display text-3xl md:text-4xl font-700 text-gradient mb-1">
                  {s.value}
                </span>
                <span className="font-body text-xs text-[oklch(0.42_0.02_264)] text-center">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech marquee */}
        <div className="animate-fade-in opacity-0-init delay-700 mt-14 w-full overflow-hidden" style={{animationFillMode:"forwards"}}>
          <p className="font-body text-[0.65rem] text-[oklch(0.32_0.02_264)] uppercase tracking-[0.15em] mb-5 font-500">Powered by world-class technology</p>
          <div className="flex gap-5 animate-marquee whitespace-nowrap select-none">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-500 bg-[oklch(0.12_0.015_264)] border border-[oklch(0.20_0.02_264)] text-[oklch(0.48_0.02_264)] shrink-0">
                <span className="w-1 h-1 rounded-full bg-[oklch(0.80_0.19_195)]" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0-init delay-1000" style={{animationFillMode:"forwards"}}>
        <span className="font-body text-[0.6rem] text-[oklch(0.32_0.02_264)] uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[oklch(0.25_0.02_264)] flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[oklch(0.80_0.19_195)] animate-float" />
        </div>
      </div>
    </section>
  )
}