import React, { PropsWithChildren } from 'react'
import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from 'next'
import AdminNavbar from './AdminNavbar'

export const metadata: Metadata = {
    title: "Admin"
}

export default function AdminLayout({children}: PropsWithChildren) {
  return (
    <ClerkProvider>
        <AdminNavbar />
        {children}
    </ClerkProvider>
  )
}