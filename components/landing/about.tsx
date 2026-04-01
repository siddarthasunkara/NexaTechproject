/**
 * About Component
 * 
 * Purpose: Company description and unique selling points
 * Features:
 * - Two-column layout on desktop (text + highlights)
 * - Checklist of company differentiators
 * - Responsive design with proper spacing
 */

import { CheckCircle2 } from "lucide-react"

// Company highlights displayed as a checklist
const highlights = [
  "Industry-leading expertise in modern tech stack",
  "Agile methodology for faster time-to-market",
  "Dedicated project managers for seamless communication",
  "Scalable solutions that grow with your business",
  "24/7 support and maintenance services",
  "ISO 27001 certified security practices",
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Why Choose NexaTech?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
              With over a decade of experience, we&apos;ve helped businesses of all sizes 
              transform their operations through technology. Our team of expert developers, 
              designers, and strategists work together to deliver solutions that exceed expectations.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              We believe in building long-term partnerships with our clients, understanding 
              their unique challenges, and providing solutions that drive real business value.
            </p>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">What Sets Us Apart</h3>
            <ul className="space-y-4">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
