import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from "@/assets/logo.png"
import { Button } from './ui/button'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <header className='shadow-sm'>
        <nav className='max-w-5xl m-auto px-3 py-5 flex items-center justify-between'>
            <Link href={"/"} className='flex items-center gap-3'>
                <Image src={Logo} width={40} height={40} alt='brand-logo' />
                <span className='text-xl font-bold tracking-tight'>Job-Board</span>
            </Link>
            <Button asChild>
                <Link href="/jobs/new">Create new job</Link>
            </Button>
        </nav>
    </header>
  )
}