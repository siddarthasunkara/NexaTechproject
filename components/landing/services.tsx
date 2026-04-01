/**
 * Services Component
 * 
 * Purpose: Displays company services in a responsive grid
 * Features:
 * - 6 service cards (more than the required minimum of 4)
 * - Icons from lucide-react for visual appeal
 * - Hover effects and transitions for interactivity
 * - Grid layout adapts to screen size (1/2/3 columns)
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Database, Globe, Smartphone, Cloud, Shield } from "lucide-react"

// Services data array - easily maintainable and extendable
const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Tailored solutions built from the ground up to meet your unique business requirements and workflows.",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "Modern, responsive web applications using the latest technologies for optimal performance and user experience.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.",
  },
  {
    icon: Database,
    title: "Database Solutions",
    description:
      "Robust database design, optimization, and migration services to ensure your data is secure and accessible.",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description:
      "Cloud infrastructure setup, migration, and management on AWS, Azure, and Google Cloud platforms.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security audits, penetration testing, and implementation of industry-standard security practices.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Comprehensive technology solutions designed to accelerate your business 
            growth and digital transformation journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
