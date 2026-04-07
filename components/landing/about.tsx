"use client"

import { useRef, useEffect, useState } from "react"
import { CheckCircle2, TrendingUp, Users, Award, Clock } from "lucide-react"

const highlights = [
  "Industry-leading expertise in modern tech stack",
  "Agile methodology for faster time-to-market",
  "Dedicated project managers for seamless communication",
  "Scalable solutions that grow with your business",
  "24/7 support and maintenance services",
  "ISO 27001 certified security practices",
]

const pillars = [
  { icon: TrendingUp, label: "Growth Focus",    desc: "Every solution is engineered to scale with your ambitions." },
  { icon: Users,      label: "Team First",       desc: "Senior engineers lead every engagement, no hand-offs." },
  { icon: Award,      label: "Quality Assured",  desc: "Rigorous QA processes baked into every sprint." },
  { icon: Clock,      label: "On-Time Delivery", desc: "98% of projects delivered on or before schedule." },
]

export function About() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-36 overflow-hidden">
      {/* bg grid */}
      <div className="absolute inset-0 bg-grid-sm opacity-40" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[oklch(0.80_0.19_195/0.04)] blur-[130px] pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section label */}
        <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="section-badge">Who We Are</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left col */}
          <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-700 tracking-tight leading-tight mb-6">
              Why choose{" "}
              <span className="text-gradient">ABC Tech?</span>
            </h2>
            <p className="font-body text-lg text-[oklch(0.52_0.02_264)] leading-relaxed mb-6">
              With over a decade of experience, we've helped businesses of all sizes
              transform their operations through technology. Our team of expert developers,
              designers, and strategists work together to deliver solutions that exceed expectations.
            </p>
            <p className="font-body text-base text-[oklch(0.46_0.02_264)] leading-relaxed mb-10">
              We believe in building long-term partnerships, understanding your unique
              challenges, and providing solutions that drive real business value.
            </p>

            {/* Highlights list */}
            <ul className="space-y-3.5">
              {highlights.map((h, i) => (
                <li
                  key={h}
                  className={`flex items-start gap-3 transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  style={{ transitionDelay: `${200 + i * 70}ms` }}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[oklch(0.80_0.19_195/0.12)] border border-[oklch(0.80_0.19_195/0.25)]">
                    <CheckCircle2 className="h-3 w-3 text-[oklch(0.80_0.19_195)]" />
                  </div>
                  <span className="font-body text-sm text-[oklch(0.70_0.02_264)] leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right col */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>

            {/* Big visual card */}
            <div className="relative rounded-3xl border border-[oklch(0.16_0.02_264)] bg-[oklch(0.09_0.014_264)] p-8 mb-6 overflow-hidden">
              {/* Decorative ring */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border border-[oklch(0.80_0.19_195/0.10)] animate-spin-slow" />
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-[oklch(0.67_0.24_295/0.10)] animate-spin-reverse" />

              <h3 className="font-display text-xl font-600 text-[oklch(0.97_0.005_264)] mb-8">Our Core Pillars</h3>
              <div className="grid grid-cols-2 gap-4">
                {pillars.map((p, i) => (
                  <div
                    key={p.label}
                    className={`group p-4 rounded-2xl bg-[oklch(0.12_0.018_264)] border border-[oklch(0.18_0.02_264)] hover:border-[oklch(0.80_0.19_195/0.3)] transition-all duration-300 duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                    style={{ transitionDelay: `${400 + i * 80}ms` }}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[oklch(0.80_0.19_195/0.10)] flex items-center justify-center mb-3 group-hover:bg-[oklch(0.80_0.19_195/0.18)] transition-colors duration-300">
                      <p.icon className="w-4.5 h-4.5 text-[oklch(0.80_0.19_195)]" />
                    </div>
                    <div className="font-display text-sm font-600 text-[oklch(0.90_0.005_264)] mb-1">{p.label}</div>
                    <div className="font-body text-xs text-[oklch(0.48_0.02_264)] leading-snug">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div className="relative rounded-2xl border border-[oklch(0.80_0.19_195/0.18)] bg-[oklch(0.80_0.19_195/0.05)] p-6 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.80_0.19_195/0.5)] to-transparent" />
              <div className="font-display text-5xl text-[oklch(0.80_0.19_195/0.3)] leading-none mb-2 select-none">"</div>
              <p className="font-body text-sm text-[oklch(0.68_0.02_264)] leading-relaxed italic mb-4">
                We don't just build software — we build the backbone of your business.
                Every line of code is written with your growth in mind.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[oklch(0.80_0.19_195)] to-[oklch(0.67_0.24_295)] flex items-center justify-center">
                  <span className="font-display text-xs font-700 text-[oklch(0.06_0.012_264)]">NT</span>
                </div>
                <div>
                  <div className="font-display text-sm font-600 text-[oklch(0.90_0.005_264)]">NexaTech Team</div>
                  <div className="font-body text-xs text-[oklch(0.45_0.02_264)]">Engineering Leaders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}