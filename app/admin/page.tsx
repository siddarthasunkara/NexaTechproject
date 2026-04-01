"use client"

/**
 * Admin Dashboard Page
 * 
 * Purpose: Display and manage contact form submissions
 * 
 * Features (IMPORTANT FOR VIVA):
 * - Displays all contacts from database in table format
 * - Shows contact details: Name, Email, Phone, Message, Date
 * - Status management: new → contacted → resolved
 * - Delete contacts with confirmation
 * - View full contact details in modal
 * - Statistics cards showing totals by status
 * 
 * Data Flow:
 * 1. On page load, useEffect triggers fetchContacts()
 * 2. fetchContacts() calls GET /api/contacts
 * 3. API queries PostgreSQL and returns JSON array
 * 4. React state (contacts) updates and triggers re-render
 * 5. Table displays all contacts with action buttons
 * 
 * No authentication required as per requirements
 */

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  Eye,
  Trash2,
  RefreshCw,
  Users,
  Clock,
  CheckCircle2,
  Mail,
} from "lucide-react"
import type { Contact } from "@/lib/db"

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  resolved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  /**
   * Fetches all contacts from the API
   * Called on initial load and when refresh button is clicked
   */
  const fetchContacts = useCallback(async () => {
    console.log("[v0] Fetching contacts from API...")
    setIsLoading(true)
    try {
      const response = await fetch("/api/contacts")
      if (response.ok) {
        const data = await response.json()
        console.log(`[v0] Loaded ${data.length} contacts from database`)
        setContacts(data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch contacts:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  /**
   * Updates contact status via PATCH API call
   * @param id - Contact ID to update
   * @param status - New status value (new, contacted, resolved)
   */
  const updateStatus = async (id: number, status: string) => {
    console.log(`[v0] Updating contact ${id} status to: ${status}`)
    setIsUpdating(id)
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        console.log(`[v0] Contact ${id} status updated successfully`)
        setContacts(
          contacts.map((c) => (c.id === id ? { ...c, status: status as Contact["status"] } : c))
        )
      }
    } catch (error) {
      console.error("[v0] Failed to update status:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  /**
   * Deletes a contact via DELETE API call
   * @param id - Contact ID to delete
   */
  const deleteContact = async (id: number) => {
    console.log(`[v0] Deleting contact ${id}...`)
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        console.log(`[v0] Contact ${id} deleted successfully`)
        setContacts(contacts.filter((c) => c.id !== id))
        setContactToDelete(null)
      }
    } catch (error) {
      console.error("[v0] Failed to delete contact:", error)
    }
  }

  const stats = {
    total: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    contacted: contacts.filter((c) => c.status === "contacted").length,
    resolved: contacts.filter((c) => c.status === "resolved").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Site
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold">Contact Management</h1>
            </div>
            <Button variant="outline" size="sm" onClick={fetchContacts} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
              <Mail className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.new}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contacted</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contacted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Contacts</CardTitle>
            <CardDescription>
              Manage and respond to contact form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No contacts yet</p>
                <p className="text-sm">Submissions from the contact form will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="hidden md:table-cell">Company</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {contact.company || "-"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={contact.status}
                            onValueChange={(value) => updateStatus(contact.id, value)}
                            disabled={isUpdating === contact.id}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue>
                                <Badge
                                  variant="secondary"
                                  className={statusColors[contact.status]}
                                >
                                  {contact.status}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedContact(contact)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setContactToDelete(contact)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Submitted on{" "}
              {selectedContact && new Date(selectedContact.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="mt-1">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="mt-1">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="mt-1">
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-primary hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  </p>
                </div>
              )}
              {selectedContact.company && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="mt-1">{selectedContact.company}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <p className="mt-1 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <p className="mt-1">
                  <Badge variant="secondary" className={statusColors[selectedContact.status]}>
                    {selectedContact.status}
                  </Badge>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!contactToDelete} onOpenChange={() => setContactToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the contact from {contactToDelete?.name}? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => contactToDelete && deleteContact(contactToDelete.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
