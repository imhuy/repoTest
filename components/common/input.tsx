import Image from 'next/image'
import React, { ChangeEvent, forwardRef, useState } from 'react'
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

interface InputProps {
    id: string
    label: string
    type?:string
    placeholder?: string
    errorText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
    disabled?: boolean
    defaultValue?: string
    onChangeValue?(value: string): void
}

const Input = ({ id, errorText, defaultValue, disabled, type = 'text', onChangeValue, label, placeholder, ...props }: InputProps, ref?: React.LegacyRef<HTMLInputElement>) => {
    const [valueInput, setValueInput] = useState(defaultValue)
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeValue && onChangeValue(e.target.value)
        setValueInput(e.target.value)
    }

    return (
        <div className='input flex flex-col w-full' >
            <label htmlFor={id} className='input__label'>{label}</label>
            <input
                {...props}
                id={id}
                className={`${errorText && 'error-input'}`}
                type={type}
                disabled={disabled}
                value={valueInput}
                placeholder={placeholder}
                onChange={(e) => onChangeInput(e)}
                ref={ref}
                onKeyPress={(e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault() }}
            />
            {errorText && <div className='flex input__error'>
                <Image 
                    src='/assets/images/alert.svg'
                    alt='error'
                    className='input__error--icon'
                    width={18}
                    height={18}
                />
                <span className='input__error--text'>{`${errorText}`}</span>
            </div>}
        </div>
    )
}

export default forwardRef(Input)