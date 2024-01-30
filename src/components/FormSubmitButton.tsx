"use client";

import React from 'react'
import { useFormStatus } from 'react-dom';
import LoadingButton from './LoadingButton';
import { cn } from '@/lib/utils';


export default function FormSubmitButton({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    
  const { pending } = useFormStatus();

  return (
    <LoadingButton type="submit" loading={pending} className={cn("", className)} {...props} />
  )
}