/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface FormInputProps<T extends FieldValues> {
    id: string
    label: string
    type?: string
    register: UseFormRegister<T>
    error?: FieldError
    className?: string
    placeholder?: string
}

export function FormInput<T extends FieldValues>({
    id,
    label,
    type = 'text',
    register,
    error,
    className = '',
    placeholder = '',
}: FormInputProps<T>) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                className={`w-full p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                {...register(id as Path<T>)}
                placeholder={placeholder}
            />
            {error && <p className="mt-1 text-red-500 text-sm">{error.message}</p>}
        </div>
    )
} 