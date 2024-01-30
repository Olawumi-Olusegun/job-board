import React from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import Select from './ui/select';
import prisma from "@/lib/db"
import { jobTypes } from "@/lib/job-types"
import { JobFilterValue, jobFilterSchema } from '@/lib/validation';
import { redirect } from 'next/navigation';
import FormSubmitButton from './FormSubmitButton';



interface JobFilterSidebarProps {
    defaultValues: JobFilterValue;
}

async function filterJobs(formData: FormData) {
    "use server";

    const values = Object.fromEntries(formData.entries());
    const parsedResult = jobFilterSchema.parse(values);

    const { location,remote, query, type } = parsedResult;
    const searchParams = new URLSearchParams({
        ...(location && { location: location.trim() }),
        ...(query && { query: query.trim() }),
        ...(type && { type: type.trim() }),
        ...(remote && { remote: "true" }),
    });

    return redirect(`?${searchParams.toString()}`);
}

export default async function JobFilterSidebar({defaultValues}: JobFilterSidebarProps) {

    const distinctLocations = (await prisma.job.findMany({
        where: {approved: true},
        select: { location: true },
        distinct: ["location"]
    })
    .then((locations) => locations.map(({location}) => location )
    .filter(Boolean))) as string[];

  return (
    <aside className='md:w-[260px] sticky top-0 h-fit bg-background border rounded-lg p-4 '>
        <form action={filterJobs} key={JSON.stringify(defaultValues)}>
            <div className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='query'>Search</Label>
                    <Input type='text' defaultValue={defaultValues.query ?? ""} placeholder='search...' name='query' id='query' />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select id='type' name='type' defaultValue={defaultValues.type ?? ""}>
                    <option value="">JobType</option>
                        {
                            jobTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))
                        }
                    </Select>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor='location'>Location</Label>
                    <Select id='location' name='location' defaultValue={defaultValues.location ?? ""}>
                        <option value="">All location</option>
                        {
                            distinctLocations.map((location) => (
                                <option key={location} value={location}>{location}</option>
                            ))
                        }
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <input
                     type="checkbox"
                     id="remote"
                     name="remote"
                     className="scale-125 accent-black"
                     defaultChecked={defaultValues.remote}
                    />
                    <Label htmlFor="remote">Remote Jobs</Label>
                </div>
                <FormSubmitButton >Filter Jobs</FormSubmitButton>
            </div>
        </form>
    </aside>
  )
}