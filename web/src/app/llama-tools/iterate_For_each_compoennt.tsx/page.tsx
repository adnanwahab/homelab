'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
//import { iterateSteps } from '../actions/iterate-steps'
function iterateSteps(steps: string[]) {
  return <div>iterateSteps</div>s
}
export function StepsEditor() {
  const [steps, setSteps] = useState<string[]>(['Step 1', 'Step 2', 'Step 3'])
  const [isLoading, setIsLoading] = useState(false)

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = value
    setSteps(newSteps)
  }

  const handleAddStep = () => {
    setSteps([...steps, `Step ${steps.length + 1}`])
  }

  const handleRemoveStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index)
    setSteps(newSteps)
  }

  const handleIterate = async () => {
    setIsLoading(true)
    try {
      const newSteps = await iterateSteps(steps)
      setSteps(newSteps)
    } catch (error) {
      console.error('Error iterating steps:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Steps Editor</h1>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
            className="flex-grow"
          />
          <Button variant="outline" onClick={() => handleRemoveStep(index)}>
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={handleAddStep}>Add Step</Button>
      <Button onClick={handleIterate} disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iterating...
          </>
        ) : (
          'Iterate with Claude'
        )}
      </Button>
    </div>
  )
}



export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-24">
      <StepsEditor />
    </main>
  )
}





type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-zinc-800 text-white hover:bg-zinc-700 active:bg-zinc-800',
  secondary: 'bg-zinc-50 text-zinc-900 hover:bg-zinc-100 active:bg-zinc-200',
  outline: 'border border-zinc-300 bg-transparent hover:bg-zinc-50'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    isLoading = false,
    fullWidth = false,
    className,
    disabled,
    children,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 animate-spin">⚪</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';


import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label,
    error,
    fullWidth = false,
    className,
    id,
    ...props 
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={clsx('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'rounded-md border border-gray-300 px-3 py-2',
            'text-sm text-gray-900 placeholder-gray-400',
            'focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';