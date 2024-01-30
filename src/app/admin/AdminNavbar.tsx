"use client";

import { useClerk } from '@clerk/nextjs';
import { Job } from '@prisma/client';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React from 'react'

interface AdminNavbar {
    job?: Job;
}

export default function AdminNavbar({job}: AdminNavbar) {
    const {user, signOut} = useClerk();
    const router = useRouter();

  return (
    <div className='px-3'>
        <div className="m-auto flex h-10 max-w-5xl items-center justify-between gap-2">
            <Link href="/admin" className='font-semibold underline'>Admin Dashboard</Link>
            <div className='space-x-2'>
                <span className='font-semibold'>{user?.primaryEmailAddress?.emailAddress}</span>
                <button onClick={ async () => {
                    await signOut();
                    router.refresh();
                    router.replace("/");
                }}
                className='underline'
                >
                    Signout
                </button>
            </div>
        </div>
    </div>
  )
}