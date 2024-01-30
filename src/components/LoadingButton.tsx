import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading: boolean;
}

export default function LoadingButton({loading, className, children, ...props}: LoadingButtonProps) {
    return (
        <Button 
        type='submit'
        disabled={props.disabled || loading } 
        className={cn("w-full", className)}
        {...props}
        >  
        <span className='flex items-center justify-center gap-1'>
            { loading ? <Loader2 className='animate-spin' /> : null }
        </span>
            {children}
        </Button>
    )
}