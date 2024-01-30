
import { Metadata } from 'next'
import React from 'react'
import NewJobForm from './NewJobForm'

export const metadata: Metadata = {
    title: "Create new job"
}

type Props = {}

export default function page({}: Props) {
  return (
    <NewJobForm />
  )
}