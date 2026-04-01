-- ============================================
-- Database Migration: Create Contacts Table
-- ============================================
-- 
-- Purpose: Store contact form submissions from landing page
-- 
-- Schema Explanation (IMPORTANT FOR VIVA):
-- - id: Auto-incrementing primary key
-- - name: Contact's full name (required)
-- - email: Contact's email address (required)
-- - phone: Phone number (optional)
-- - company: Company name (optional)
-- - message: The inquiry message (required)
-- - status: Workflow status (new → contacted → resolved)
-- - created_at: When the submission was made
-- - updated_at: When the record was last modified
--
-- Data Flow:
-- User submits form → API validates → INSERT into this table
-- Admin views dashboard → SELECT from this table
-- Admin updates status → UPDATE this table
-- Admin deletes contact → DELETE from this table
-- ============================================

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,                              -- Unique identifier
  name VARCHAR(255) NOT NULL,                         -- Contact name (required)
  email VARCHAR(255) NOT NULL,                        -- Email address (required)
  phone VARCHAR(50),                                  -- Phone (optional)
  company VARCHAR(255),                               -- Company name (optional)
  message TEXT NOT NULL,                              -- Message content (required)
  status VARCHAR(50) DEFAULT 'new',                   -- Workflow status
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- Submission timestamp
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  -- Last update timestamp
);

-- Create indexes for better query performance
-- These speed up common queries used in the admin dashboard
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
