/**
 * Hero Component
 * 
 * Purpose: Main landing section with company tagline and CTAs
 * Features:
 * - Eye-catching heading with highlighted text
 * - Statistics showcasing company achievements
 * - Call-to-action buttons for user engagement
 * - Responsive design for all screen sizes
 */

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    // id="home" allows smooth scroll navigation from header
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Transforming Ideas into Reality</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Build the Future with{" "}
            <span className="text-primary">Innovative Technology</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
            We partner with forward-thinking companies to deliver cutting-edge software 
            solutions that drive growth, efficiency, and competitive advantage.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact">
              <Button size="lg" className="gap-2">
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline">
                Explore Services
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" },
            { value: "10+", label: "Years Experience" },
            { value: "24/7", label: "Support Available" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
