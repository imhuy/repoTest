import Image from 'next/image'
import React, { forwardRef } from 'react'
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

interface SelectProps {
    items: string[] | number[]
    icon: string
    selected?: string | number | string[]
    errorText?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
    onChangeValue?(value: string | number): void
    label?: string
}

const Select = ({
    items, selected, onChangeValue, label, errorText, icon, ...props
}: SelectProps, ref?: React.LegacyRef<HTMLSelectElement>) => {
    const selectStyles = 'select__input--option appearance-none typo-normal bg-greyWeak cursor-pointer'

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        onChangeValue && onChangeValue(value)
    }

    return (
        <div className='select cursor-pointer' >
            {label && <div className='select__label'>{label}</div>}
            <div className='select__input relative bg-greyWeak rounded-2xl'>
                <Image 
                    src={icon}
                    alt='select icon'
                    className='absolute select__input--icon'
                    width={16}
                    height={16}
                />
                <select
                    {...props}
                    onChange={onChangeSelect}
                    className={`${selectStyles} ${errorText && 'error-select'}`}
                    value={selected?.toString()}
                    ref={ref}
                >
                    {items.map((item) =>
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    )}
                </select>
                <Image 
                    src='/assets/images/select-icon.svg'
                    alt='select icon'
                    className='absolute select__input--select'
                    width={7}
                    height={3.82}
                />
            </div>
            {errorText && <div className='flex select__error'>
                <span className='select__error--text'>{`${errorText}`}</span>
            </div>}
        </div>
    )
}

export default forwardRef(Select)