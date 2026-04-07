"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Zap, ArrowUpRight } from "lucide-react"

const navLinks = [
  { href: "#home",     label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about",    label: "About" },
  { href: "#contact",  label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled]             = useState(false)
  const [activeSection, setActiveSection]   = useState("home")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const sections = ["home","services","about","contact"]
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break }
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-[oklch(0.80_0.19_195/0.10)]"
          : "bg-transparent"
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.80_0.19_195/0.6)] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="relative w-9 h-9 shrink-0">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[oklch(0.80_0.19_195)] to-[oklch(0.67_0.24_295)] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-xl flex items-center justify-center">
                <Zap className="w-4.5 h-4.5 text-[oklch(0.06_0.012_264)] fill-current" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[oklch(0.80_0.19_195/0.4)] to-[oklch(0.67_0.24_295/0.4)] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <span className="font-display font-700 text-[1.15rem] tracking-tight">
              ABC<span className="text-gradient">Tech</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
            {navLinks.map((link) => {
              const id = link.href.replace("#","")
              const active = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    active
                      ? "text-[oklch(0.97_0.005_264)] bg-[oklch(0.80_0.19_195/0.12)]"
                      : "text-[oklch(0.60_0.02_264)] hover:text-[oklch(0.97_0.005_264)]"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full border border-[oklch(0.80_0.19_195/0.3)]" />
                  )}
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin">
              <button className="group flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[oklch(0.55_0.02_264)] hover:text-[oklch(0.97_0.005_264)] transition-colors duration-200">
                Admin
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
              </button>
            </Link>
            <a href="#contact">
              <button className="btn-shimmer relative px-5 py-2.5 text-sm font-semibold rounded-xl overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-[oklch(0.80_0.19_195)] to-[oklch(0.67_0.24_295)]" />
                <span className="absolute inset-0 bg-gradient-to-r from-[oklch(0.67_0.24_295)] to-[oklch(0.80_0.19_195)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{boxShadow:"inset 0 0 20px oklch(0.80 0.19 195 / 0.3)"}} />
                <span className="relative text-[oklch(0.06_0.012_264)] font-display">Get Started</span>
              </button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center glass rounded-lg text-[oklch(0.65_0.02_264)] hover:text-[oklch(0.97_0.005_264)] transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[oklch(0.16_0.02_264)] py-5 animate-fade-in">
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-[oklch(0.65_0.02_264)] hover:text-[oklch(0.97_0.005_264)] hover:bg-[oklch(0.14_0.02_264)] rounded-xl transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 px-1">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-4 py-2.5 text-sm font-medium text-[oklch(0.55_0.02_264)] border border-[oklch(0.20_0.02_264)] rounded-xl hover:border-[oklch(0.80_0.19_195/0.4)] transition-all">
                  Admin Dashboard
                </button>
              </Link>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[oklch(0.80_0.19_195)] to-[oklch(0.67_0.24_295)] text-[oklch(0.06_0.012_264)] font-display">
                  Get Started
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}