"use client"

import { useRef, useEffect, useState } from "react"
import { Code2, Database, Globe, Smartphone, Cloud, Shield, ArrowUpRight } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "Tailored solutions built from the ground up to meet your unique business requirements and workflows.",
    tag: "Development",
    accent: "oklch(0.80 0.19 195)",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description: "Modern, responsive web apps using the latest technologies for optimal performance and UX.",
    tag: "Web",
    accent: "oklch(0.67 0.24 295)",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications delivering seamless experiences on iOS and Android.",
    tag: "Mobile",
    accent: "oklch(0.72 0.20 220)",
  },
  {
    icon: Database,
    title: "Database Solutions",
    description: "Robust database design, optimization, and migration services to keep your data secure and fast.",
    tag: "Data",
    accent: "oklch(0.80 0.19 195)",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Cloud infrastructure setup, migration, and management on AWS, Azure, and Google Cloud.",
    tag: "Infrastructure",
    accent: "oklch(0.67 0.24 295)",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Security audits, penetration testing, and industry-standard security implementation.",
    tag: "Security",
    accent: "oklch(0.72 0.20 220)",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-[oklch(0.16_0.02_264)] bg-[oklch(0.09_0.014_264)] p-7 card-hover cursor-default overflow-hidden transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Hover gradient background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${service.accent}10 0%, transparent 65%)` }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
      />

      {/* Tag */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-body text-[0.6rem] font-600 uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border"
          style={{
            color: service.accent,
            borderColor: `${service.accent}30`,
            background: `${service.accent}0d`,
          }}
        >
          {service.tag}
        </span>
        <ArrowUpRight
          className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
          style={{ color: service.accent }}
        />
      </div>

      {/* Icon */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${service.accent}15`, border: `1px solid ${service.accent}25` }}
      >
        <service.icon className="h-6 w-6" style={{ color: service.accent }} />
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `0 0 20px ${service.accent}40` }}
        />
      </div>

      {/* Content */}
      <h3 className="font-display text-[1.05rem] font-600 text-[oklch(0.95_0.005_264)] mb-3 leading-snug">
        {service.title}
      </h3>
      <p className="font-body text-sm text-[oklch(0.50_0.02_264)] leading-relaxed">
        {service.description}
      </p>

      {/* Bottom number */}
      <div className="absolute bottom-5 right-6 font-display text-5xl font-800 text-[oklch(0.14_0.02_264)] select-none group-hover:text-[oklch(0.17_0.02_264)] transition-colors duration-300">
        0{String(index + 1)}
      </div>
    </div>
  )
}

export function Services() {
  const [titleVisible, setTitleVisible] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTitleVisible(true) }, { threshold: 0.3 })
    if (titleRef.current) obs.observe(titleRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" className="relative py-24 md:py-36 overflow-hidden">
      {/* bg dots */}
      <div className="absolute inset-0 bg-dots opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px divider-gradient" />

      {/* Orb */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[oklch(0.67_0.24_295/0.04)] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div ref={titleRef} className={`max-w-2xl mb-16 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-badge mb-5">Our Expertise</span>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-700 tracking-tight text-[oklch(0.97_0.005_264)] leading-tight mb-5">
            Services that{" "}
            <span className="text-gradient">drive results</span>
          </h2>
          <p className="font-body text-lg text-[oklch(0.50_0.02_264)] leading-relaxed">
            Comprehensive technology solutions designed to accelerate your business
            growth and digital transformation journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA row */}
        <div className={`mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-700 delay-500 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="font-body text-sm text-[oklch(0.45_0.02_264)]">
            Don't see what you need?{" "}
            <a href="#contact" className="text-[oklch(0.80_0.19_195)] hover:underline underline-offset-2">Let's talk custom solutions →</a>
          </p>
          <div className="flex items-center gap-3">
            {["AWS","GCP","Azure","K8s"].map((t) => (
              <span key={t} className="font-body text-xs px-3 py-1 rounded-full bg-[oklch(0.11_0.015_264)] border border-[oklch(0.18_0.02_264)] text-[oklch(0.45_0.02_264)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px divider-gradient" />
    </section>
  )
}