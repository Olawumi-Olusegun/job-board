import React from 'react'
import prisma from "@/lib/db";
import H1 from '@/components/ui/h1';
import Link from 'next/link';
import JobListItem from '@/components/JobListItem';


type Props = {}

export default async function AdminPage({}: Props) {

    const unapprovedJobs = await prisma.job.findMany({
        where: { approved: false }
    });


  return (
    <main className='max-w-5xl my-10 m-auto space-y-10 px-3'>
        <H1>Admin Dashboard</H1>
        <section className='flex flex-col gap-3'>
            <h2 className='text-lg font-bold'>Unaaproved Jobs</h2>
            { 
            unapprovedJobs.length > 0 
                ? unapprovedJobs.map((unapprovedJob) => (
                    <Link key={unapprovedJob.id} href={`/admin/jobs/${unapprovedJob.slug}`} className='block'>
                        <JobListItem job={unapprovedJob}  />
                    </Link>
                ))
                : <p className='text-muted-foreground'>No unapproved jobs</p>
            }
        </section>
    </main>
  )
}