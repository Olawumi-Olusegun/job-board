import React from 'react'
import JobListItem from './JobListItem'
import prisma from "@/lib/db"
import { JobFilterValue } from '@/lib/validation';
import { Prisma } from '@prisma/client';

interface JobResultProps {
  filterValues: JobFilterValue;
}

export default async function JobResults({filterValues}: JobResultProps) {

  const { query, type, location, remote } = filterValues;

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
    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });


  return (
    <div className=" space-y-10 flex-1">
    {
      jobs.map((jobItem) => <JobListItem key={jobItem.id} job={jobItem} /> )
    }
    {jobs.length === 0 && (
      <p className='m-auto text-center '>
        No job found. Try another with another search phrase
      </p>
    )}
  </div>
  )
}