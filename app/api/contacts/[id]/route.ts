/**
 * Individual Contact API Route
 * 
 * Purpose: CRUD operations for individual contacts
 * 
 * Endpoints:
 * - GET /api/contacts/[id] - Get single contact by ID
 * - PATCH /api/contacts/[id] - Update contact status
 * - DELETE /api/contacts/[id] - Delete contact
 * 
 * Used by: Admin Dashboard for managing submissions
 */

import { sql, type Contact } from "@/lib/db"
import { NextResponse } from "next/server"

/**
 * GET /api/contacts/[id]
 * Retrieves a single contact by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const contacts = await sql`
      SELECT * FROM contacts WHERE id = ${parseInt(id)}
    `

    if (contacts.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json(contacts[0] as Contact)
  } catch (error) {
    console.error("Failed to fetch contact:", error)
    return NextResponse.json(
      { error: "Failed to fetch contact" },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/contacts/[id]
 * Updates the status of a contact (new → contacted → resolved)
 * Used by: Admin Dashboard status dropdown
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    // Validate status value
    if (!status || !["new", "contacted", "resolved"].includes(status)) {
      return NextResponse.json(
        { error: "Valid status is required (new, contacted, resolved)" },
        { status: 400 }
      )
    }

    console.log(`[v0] Updating contact ${id} status to: ${status}`)

    const result = await sql`
      UPDATE contacts 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    console.log(`[v0] Contact ${id} status updated successfully`)
    return NextResponse.json(result[0] as Contact)
  } catch (error) {
    console.error("[v0] Failed to update contact:", error)
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/contacts/[id]
 * Permanently removes a contact from the database
 * Used by: Admin Dashboard delete button
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log(`[v0] Deleting contact ${id}`)

    const result = await sql`
      DELETE FROM contacts WHERE id = ${parseInt(id)} RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    console.log(`[v0] Contact ${id} deleted successfully`)
    return NextResponse.json({ message: "Contact deleted successfully" })
  } catch (error) {
    console.error("[v0] Failed to delete contact:", error)
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    )
  }
}
