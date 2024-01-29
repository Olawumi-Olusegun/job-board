import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import { JobFilterValue } from "@/lib/validation";



interface PageProps {
  searchParams: {
    query?: string;
    type?: string;
    location?: string;
    remote?: string;
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
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl ">Developer Jobs</h1>
        <p>Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4 " >
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  )
}
