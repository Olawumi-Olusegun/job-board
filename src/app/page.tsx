import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import { JobFilterValue } from "@/lib/validation";
import { Metadata } from "next";



interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
  }
}

function getTitle({ query, type, location, remote }: JobFilterValue) {
  const titlePrefix =     query 
                            ? `${query} jobs` 
                            : type 
                            ?`${type} jobs`
                            : remote
                            ? "Remote jobs"
                            : "All jobs";
  const titleSuffix = location ? ` in ${location}` : "";
  return `${titlePrefix}${titleSuffix}`
}

export function generateMetadata({searchParams}: PageProps): Metadata {
  const { query, type, location, remote } = searchParams;
  return {
    title: `${getTitle({query, type, location, remote: remote === "true" })} | Job-Board`,
  }
}

export default async function Home({searchParams}:PageProps) {

  const { query, type, location, remote } = searchParams;

  const filterValues: JobFilterValue = {
    query,
    type,
    location,
    remote: remote === "true",
  }



  return (
    <main className="max-w-5xl m-auto space-y-10 px-3 my-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl ">{getTitle(filterValues)}</h1>
        <p>Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4 " >
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  )
}
