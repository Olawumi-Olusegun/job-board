import React from 'react'
import prisma from "@/lib/db";
import JobDetailsPage from '@/components/JobDetailsPage';
import { notFound } from 'next/navigation';
import AdminSidebar from '../../AdminSidebar';


interface PageProps {
    params: { slug: string }
}

export default async function page({ params: { slug } }: PageProps) {
    const job = await prisma.job.findUnique({
        where: { slug },
    });

    if(!job) {
        return notFound();
    }



  return (
    <main className='flex m-auto my-10 max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start'>
        <JobDetailsPage job={job} />
        <AdminSidebar job={job} />
    </main>
  )
}