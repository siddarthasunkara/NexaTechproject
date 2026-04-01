/**
 * Contacts API Route
 * 
 * Purpose: Handle contact form submissions
 * 
 * Endpoints:
 * - GET /api/contacts - Retrieve all contact submissions (for admin dashboard)
 * - POST /api/contacts - Create new contact submission (from contact form)
 * 
 * Data Flow:
 * Frontend Form → POST /api/contacts → Validate Data → Insert into PostgreSQL → Return Response
 * Admin Dashboard → GET /api/contacts → Query PostgreSQL → Return JSON Array
 */

import { sql, type Contact } from "@/lib/db"
import { NextResponse } from "next/server"

/**
 * GET /api/contacts
 * Retrieves all contact submissions ordered by newest first
 * Used by: Admin Dashboard
 */
export async function GET() {
  try {
    const contacts = await sql`
      SELECT * FROM contacts ORDER BY created_at DESC
    `
    return NextResponse.json(contacts as Contact[])
  } catch (error) {
    console.error("Failed to fetch contacts:", error)
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}

/**
 * POST /api/contacts
 * Creates a new contact submission
 * Used by: Contact Form on landing page
 * 
 * Request Body:
 * - name: string (required)
 * - email: string (required)
 * - phone: string (optional)
 * - company: string (optional)
 * - message: string (required)
 * 
 * Response:
 * - 201: Contact created successfully
 * - 400: Validation error (missing required fields)
 * - 500: Server error
 */
export async function POST(request: Request) {
  try {
    // Parse JSON body from request
    const body = await request.json()
    const { name, email, phone, company, message } = body

    // Server-side validation - never trust client data
    if (!name || !email || !message) {
      console.log("[v0] Contact validation failed - missing required fields")
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("[v0] Contact validation failed - invalid email format")
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      )
    }

    console.log("[v0] Creating new contact submission:", { name, email })

    // Insert into database using parameterized query (prevents SQL injection)
    const result = await sql`
      INSERT INTO contacts (name, email, phone, company, message)
      VALUES (${name}, ${email}, ${phone || null}, ${company || null}, ${message})
      RETURNING *
    `

    console.log("[v0] Contact created successfully with ID:", result[0].id)
    return NextResponse.json(result[0] as Contact, { status: 201 })
  } catch (error) {
    console.error("[v0] Failed to create contact:", error)
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    )
  }
}
