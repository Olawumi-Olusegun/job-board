import React from 'react'
import JobListItem from './JobListItem'
import prisma from "@/lib/db"
import { JobFilterValue } from '@/lib/validation';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface JobResultProps {
  filterValues: JobFilterValue;
  page?: number;
}


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterValue;
}

export default async function JobResults({filterValues, page = 1}: JobResultProps) {

  const { query, type, location, remote } = filterValues;
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;


  const searchString = query?.split(" ").filter((word) => word.length > 0).join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString ? {
    OR: [
      { title: { search: searchString } },
      { companyName: { search: searchString } },
      { type: { search: searchString } },
      { locationType: { search: searchString } },
      { location: { search: searchString } },
    ]
  }: {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote"  } : {},
      { approved: true }
    ]
  }
    const jobsPromise = prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: jobsPerPage,
        skip,
      });

      const countPromise = prisma.job.count({where});

      const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);
      

  return (
    <div className=" space-y-10 flex-1">
    {
      jobs.map((jobItem) => (
        <Link key={jobItem.id} href={`/jobs/${jobItem.slug}`} className='block'>
          <JobListItem job={jobItem} />
        </Link>
      ) )
    }
    {jobs.length === 0 && (
      <p className='m-auto text-center '>
        No job found. Try again with another search phrase
      </p>
    )}

    {
      jobs.length > 0 
          ? (
            <Pagination  
             currentPage={page}
             totalPages={Math.ceil(totalResults/jobsPerPage)}
             filterValues={filterValues}
            />
          )
          : null
    }
  </div>
  )
}


function Pagination({currentPage, filterValues, totalPages}: PaginationProps){
  const { query, type, location, remote } = filterValues;

  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(query && {query}),
      ...(type && {type}),
      ...(location && {location}),
      ...(remote && { remote: "true"}),
      page: page.toString(),
    })

    return `/?${searchParams.toString()}`
  }

  return <>
   <div className='flex items-center justify-between'>
    <Link href={generatePageLink(currentPage-1)} className={cn("flex items-center gap-2 font-semibold", 
    currentPage <= 1 && "invisible"
    )}>
      <ArrowLeft size={16} />
      Previous Page
    </Link>

    <span className='font-semibold'>Page {currentPage} of {totalPages} </span>

    <Link href={generatePageLink(currentPage-1)} className={cn("flex items-center gap-2 font-semibold", 
    currentPage >= totalPages && "invisible"
    )}>
      Next Page
      <ArrowRight size={16} />
    </Link>
   </div>
  </>
}