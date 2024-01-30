import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Job-Board",
    template: "%s | Job-Board"
   },
  description: 'Find your dream job',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(`${inter.className} min-w-[350px]`)}>
        <Navbar />
        {children}
        </body>
        <Footer />
    </html>
  )
}
