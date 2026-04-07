import Link from "next/link"
import { Github, Linkedin, Twitter, Zap, ArrowUpRight } from "lucide-react"

const footerLinks = {
  Services: [
    { label: "Web Development",  href: "#services" },
    { label: "Mobile Apps",      href: "#services" },
    { label: "Cloud Services",   href: "#services" },
    { label: "Cybersecurity",    href: "#services" },
    { label: "Custom Software",  href: "#services" },
  ],
  Company: [
    { label: "About Us",   href: "#about" },
    { label: "Careers",    href: "#" },
    { label: "Blog",       href: "#" },
    { label: "Contact",    href: "#contact" },
    { label: "Press Kit",  href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "#" },
    { label: "Terms of Service",  href: "#" },
    { label: "Cookie Policy",     href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter,  href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github,   href: "#", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[oklch(0.14_0.02_264)]">
      {/* Background */}
      <div className="absolute inset-0 bg-[oklch(0.07_0.012_264)]" />
      <div className="absolute inset-0 bg-grid-sm opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[oklch(0.80_0.19_195/0.5)] to-transparent" />

      {/* Orb */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full bg-[oklch(0.80_0.19_195/0.03)] blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Top CTA banner */}
        <div className="py-16 border-b border-[oklch(0.14_0.02_264)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-700 text-[oklch(0.97_0.005_264)] mb-2">
                Ready to start your project?
              </h3>
              <p className="font-body text-[oklch(0.50_0.02_264)]">
                Let's turn your vision into reality. Get a free consultation today.
              </p>
            </div>
            <a href="#contact">
              <button className="btn-shimmer group relative shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-2xl font-display text-sm font-600 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-[oklch(0.80_0.19_195)] to-[oklch(0.67_0.24_295)]" />
                <span className="absolute inset-0 bg-gradient-to-r from-[oklch(0.67_0.24_295)] to-[oklch(0.80_0.19_195)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <span className="relative text-[oklch(0.06_0.012_264)] flex items-center gap-2">
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </span>
              </button>
            </a>
          </div>
        </div>

        {/* Main links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group select-none">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[oklch(0.80_0.19_195)] to-[oklch(0.67_0.24_295)] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[oklch(0.06_0.012_264)] fill-current" />
              </div>
              <span className="font-display font-700 text-lg">
                ABC<span className="text-gradient">Tech</span>
              </span>
            </Link>
            <p className="font-body text-sm text-[oklch(0.44_0.02_264)] leading-relaxed mb-6">
              Building innovative solutions for tomorrow's challenges. Your technology
              partner for growth and transformation.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-[oklch(0.45_0.02_264)] hover:text-[oklch(0.80_0.19_195)] hover:border-[oklch(0.80_0.19_195/0.3)] transition-all duration-300"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-600 text-[oklch(0.75_0.02_264)] mb-5 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group font-body text-sm text-[oklch(0.44_0.02_264)] hover:text-[oklch(0.80_0.19_195)] transition-colors duration-200 flex items-center gap-1"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[oklch(0.80_0.19_195)] transition-all duration-200 overflow-hidden" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[oklch(0.13_0.018_264)] py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-[oklch(0.38_0.02_264)]">
            © {new Date().getFullYear()} NexaTech. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.80_0.19_195)] animate-ping-slow" />
            <span className="font-body text-xs text-[oklch(0.38_0.02_264)]">All systems operational</span>
          </div>
          <p className="font-body text-sm text-[oklch(0.38_0.02_264)]">
            Designed & built with <span className="text-[oklch(0.80_0.19_195)]">♥</span> by NexaTech
          </p>
        </div>
      </div>
    </footer>
  )
}