/**
 * Database Configuration
 * 
 * Purpose: Neon PostgreSQL database connection and type definitions
 * 
 * Architecture:
 * - Uses @neondatabase/serverless for serverless PostgreSQL
 * - Connection string stored in DATABASE_URL environment variable
 * - Provides typed interface for Contact model
 * 
 * Note: Neon is a serverless PostgreSQL provider that works
 * seamlessly with Vercel deployments
 */

import { neon } from "@neondatabase/serverless"

// Create database connection using environment variable
// DATABASE_URL is automatically set when Neon integration is connected
export const sql = neon(process.env.DATABASE_URL!)

/**
 * Contact Interface
 * 
 * Represents the structure of contact submissions in the database
 * Maps directly to the 'contacts' table schema
 */
export interface Contact {
  id: number           // Primary key, auto-increment
  name: string         // Required: Contact's full name
  email: string        // Required: Contact's email address
  phone: string | null // Optional: Phone number
  company: string | null // Optional: Company name
  message: string      // Required: Contact message/inquiry
  status: "new" | "contacted" | "resolved" // Workflow status
  created_at: string   // Timestamp when contact was submitted
  updated_at: string   // Timestamp when contact was last modified
}
