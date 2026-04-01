/**
 * Home Page - Main Landing Page
 * 
 * Purpose: Entry point for company website
 * 
 * Component Structure (IMPORTANT FOR VIVA):
 * - Header: Fixed navigation with links to sections
 * - Hero: Main banner with company tagline and CTAs
 * - Services: Grid of service offerings (6 cards)
 * - About: Company description and highlights
 * - ContactForm: Form with validation + API submission
 * - Footer: Links and social media
 * 
 * Architecture:
 * - This is a React Server Component (RSC)
 * - Each section is a reusable component
 * - Styling uses Tailwind CSS
 * - Navigation uses smooth scroll (CSS scroll-behavior)
 */

import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Services } from "@/components/landing/services"
import { About } from "@/components/landing/about"
import { ContactForm } from "@/components/landing/contact-form"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <>
      {/* Fixed header with navigation */}
      <Header />
      
      <main>
        {/* Hero section - id="home" for scroll navigation */}
        <Hero />
        
        {/* Services grid - id="services" */}
        <Services />
        
        {/* About section - id="about" */}
        <About />
        
        {/* Contact form - id="contact" 
            Submits to /api/contacts via fetch() */}
        <ContactForm />
      </main>
      
      {/* Footer with links and copyright */}
      <Footer />
    </>
  )
}
