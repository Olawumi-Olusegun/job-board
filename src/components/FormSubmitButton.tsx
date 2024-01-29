"use client";

import React from 'react'
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';



export default function FormSubmitButton({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending } = useFormStatus();

  return (
    <Button 
    type='submit'
    disabled={props.disabled || pending } 
    className={cn("w-full", className)}
    {...props}
    >  
    <span className='flex items-center justify-center gap-1'>
        { pending ? <Loader2 className='animate-spin' /> : null }
    </span>
        {props.children}
    </Button>
  )
}