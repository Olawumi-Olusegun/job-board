import { formatCurrency, formatDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";

interface JobDetailsPageProps {
    job: Job;
}
export default function JobDetailsPage({job}: JobDetailsPageProps) {
    const { 
        title, 
        description, 
        companyLogoUrl, 
        companyName, 
        applicationUrl, 
        type, 
        locationType, 
        location, 
        salary
    } = job;


    return <section className="w-full grow space-y-5">
        <div className="flex items-center gap-3">
            {
                companyLogoUrl && (
                    <Image src={companyLogoUrl} alt="brand-logo" height={100} width={100} className="rounded-xl" />
                )
            }
            <div>
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="font-semibold">
                        {applicationUrl 
                        ? (
                            <Link href={new URL(applicationUrl).origin} className="text-green-500 hover:underline">{companyName}</Link>
                        ) 
                        : (
                            <span>{companyName}</span>
                        ) 
                        }
                    </p>
                </div>
                <div className="text-muted-foreground">
                <p className='flex items-center gap-1.5 '>
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
            </div>
            </div>
        </div>
        <div>
            {
                description && <Markdown>{description}</Markdown>
            }
        </div>
    </section>
}