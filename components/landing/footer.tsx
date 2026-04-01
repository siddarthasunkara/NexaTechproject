/**
 * Footer Component
 * 
 * Purpose: Site footer with navigation links and social media
 * Features:
 * - Multi-column link layout
 * - Company branding
 * - Social media icons
 * - Copyright notice with dynamic year
 * - Responsive design
 */

import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

// Footer navigation organized by category
const footerLinks = {
  Services: [
    { label: "Web Development", href: "#services" },
    { label: "Mobile Apps", href: "#services" },
    { label: "Cloud Services", href: "#services" },
    { label: "Cybersecurity", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="font-semibold text-lg">NexaTech</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Building innovative solutions for tomorrow&apos;s challenges.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NexaTech. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed and built with care.
          </p>
        </div>
      </div>
    </footer>
  )
}
