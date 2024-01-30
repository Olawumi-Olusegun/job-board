"use client";


import FormSubmitButton from '@/components/FormSubmitButton';
import { Job } from '@prisma/client';
import React from 'react'
import { useFormState } from 'react-dom';
import { approveSubmission } from './action';

interface AminSideBarProps {
    job: Job;
}

interface AdminButtonProps {
    jobId: number;
}

export default function AdminSidebar({job}: AminSideBarProps) {
  return (
    <aside className='flex w-[200px] flex-none flex-row md:flex-col items-center gap-2 md:items-stretch'>
        {
            job.approved
               ? (
                <span className='text-center font-semibold text-green-500'>
                    Approved
                </span>
               )
               : ( <ApproveSubmissionButton jobId={job.id} /> )
        }
        <DeleteJobButton jobId={job.id} />
    </aside>
  )
}

function ApproveSubmissionButton({jobId}: AdminButtonProps) {
    const [formState, formAction] = useFormState(approveSubmission, undefined);

    return <form action={formAction} className='space-y-1'>
        <input hidden name='jobId' value={jobId} type='hidden' />
        <FormSubmitButton className='w-full bg-green-500 hover:bg-green-600'>
            Approved
        </FormSubmitButton>
        {formState?.error &&  <p className='text-sm text-red-500'>{formState.error}</p> }
    </form>
}

function DeleteJobButton({jobId}: AdminButtonProps) {
    const [formState, formAction] = useFormState(approveSubmission, undefined);

    return <form action={formAction} className='space-y-1'>
        <input hidden name='jobId' value={jobId} type='hidden' />
        <FormSubmitButton className='w-full bg-red-500 hover:bg-red-600'>
            Delete
        </FormSubmitButton>
        {formState?.error &&  <p className='text-sm text-red-500'>{formState.error}</p> }
    </form>
}