"use client"

import H1 from '@/components/ui/h1'
import React from 'react'

type Props = {}

export default function ErrorPage({}: Props) {
  return (
    <>
        <main className='max-w-5xl px-3 space-y-5 text-center my-10 m-auto'>
            <H1> Error! </H1>
            <p>An unexpected error occured</p>

        </main>
    
    </>
  )
}