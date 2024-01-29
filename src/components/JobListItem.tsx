import { Job } from '@prisma/client'
import Image from 'next/image';
import React from 'react'
import companyLogoPlaceHolder from "@/assets/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatCurrency, formatDate } from '@/lib/utils';
import Badge from './Badge';


type JobListItemProps = {
    job: Job
}

export default function JobListItem({job}: JobListItemProps) {
    const { title, companyName, type, locationType, location, salary, companyLogoUrl, createdAt} = job;
  return (
    <article className='flex gap-3 border rounded-lg p-5 hover:bg-muted/60'>
        <Image 
        src={companyLogoUrl ?? companyLogoPlaceHolder} 
        alt={`${companyName}-logo`}
        width={100}
        height={100}
        className='rounded-lg self-center '
        />
        <div className="flex-grow space-y-3 ">
            <div className="">
                <h2 className='text-xl font-semibold'>{title}</h2>
                <p className='text-muted-foreground'>{companyName}</p>
            </div>
            <div className="text-muted-foreground">
                <p className='flex items-center gap-1.5 sm:hidden'>
                    <Briefcase size={16} className="shrink-0" />
                    <span>{type}</span>
                </p>
                <p className='flex items-center gap-1.5'>
                    <MapPin size={16} className="shrink-0" />
                    <span>{locationType}</span>
                </p>
                <p className='flex items-center gap-1.5'>
                    <Globe2 size={16} className="shrink-0" />
                    <span>{location || "worlwide"}</span>
                </p>
                <p className='flex items-center gap-1.5'>
                    <Banknote size={16} className="shrink-0" />
                    <span>{formatCurrency(salary)}</span>
                </p>
                <p className='flex items-center gap-1.5 sm:hidden'>
                    <Clock size={16} className="shrink-0" />
                    <span>{formatDate(createdAt)}</span>
                </p>
            </div>
        </div>
        <div className="hidden sm:flex flex-col shrink-0 justify-between items-end ">
            <Badge>
                {type}
            </Badge>
            <span className='flex items-center gap-1.5 text-muted-foreground'> 
                <Clock size={16} />
                <span>{formatDate(createdAt)}</span>
            </span>
        </div>
    </article>
  )
}