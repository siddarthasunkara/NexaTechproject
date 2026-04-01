"use client"

/**
 * ContactForm Component
 * 
 * Purpose: Contact form with validation and API submission
 * 
 * Data Flow (IMPORTANT FOR VIVA):
 * 1. User fills out form fields (name, email, phone, message)
 * 2. Frontend validates all required fields
 * 3. On submit, data is sent via fetch() to /api/contacts (POST)
 * 4. Backend validates and stores in PostgreSQL database
 * 5. Success/error response is shown to user
 * 6. Form resets on success
 * 
 * Features:
 * - Real-time form state management with React useState
 * - Email format validation
 * - Required field validation
 * - Loading states during submission
 * - Success/error feedback to user
 * - Contact information cards alongside form
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react"

export function ContactForm() {
  // State for tracking form submission status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  
  // Form data state - controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  /**
   * Validates email format using regex pattern
   * @param email - Email string to validate
   * @returns boolean indicating if email is valid
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Form submission handler
   * - Validates required fields
   * - Sends data to backend API
   * - Updates UI based on response
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    // Frontend validation
    if (!formData.name.trim()) {
      setErrorMessage("Name is required")
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address")
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    if (!formData.message.trim()) {
      setErrorMessage("Message is required")
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    try {
      // API call to backend - POST request with JSON body
      console.log("[v0] Submitting contact form:", formData)
      
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit")
      }

      console.log("[v0] Contact form submitted successfully")
      setSubmitStatus("success")
      // Reset form after successful submission
      setFormData({ name: "", email: "", phone: "", company: "", message: "" })
    } catch (error) {
      console.error("[v0] Contact form submission error:", error)
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Ready to start your next project? Contact us today and let&apos;s discuss 
            how we can help bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  contact@nexatech.com
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  +1 (555) 123-4567
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  123 Tech Avenue, Suite 400<br />
                  San Francisco, CA 94107
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitStatus("idle")}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errorMessage || "Something went wrong. Please try again."}</span>
                    </div>
                  )}

                  <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
