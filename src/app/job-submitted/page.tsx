import H1 from '@/components/ui/h1'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <main className='m-auto max-w-5xl my-10 space-y-5 px-3 text-center'>
      <H1>Job Submitted</H1>
      <p>Your job posting has been submitted and is pending approval.</p>
    </main>
  )
}