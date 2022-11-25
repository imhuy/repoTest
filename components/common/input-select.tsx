import React, { ChangeEvent, useEffect, useState } from 'react'
import { IDataDetails } from '../../utils/types'
import Image from 'next/image'

interface InputProps {
    id: string
    label: string
    hint?: string
    className?: string
    placeholder?: string
    defaultValue?: IDataDetails[]
    onChangeValue?(value: IDataDetails[]): void
}

const InputSelect = ({ id, defaultValue = [], onChangeValue, label, placeholder, className, hint }: InputProps) => {
    const [valueInput, setValueInput] = useState<IDataDetails[]>(defaultValue)
    const [value, setValue] = useState<string>('')
    const onEnterValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && value) {
            setValueInput([{ Name: value, Code: value.toLowerCase() }, ...valueInput])
            setValue('')
        }
    }

    const onDeleteItem = (index: number) => {
        setValueInput([...valueInput.slice(0, index), ...valueInput.slice(index + 1)])
    }

    useEffect(() => {
        onChangeValue && onChangeValue(valueInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueInput])

    return (
        <div className={`${className} input input-select flex flex-col w-full`}>
            <label htmlFor={id} className='input__label'>{label}</label>
            <input
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                onKeyUp={e => onEnterValue(e)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault() }}
            />
            <div className='italic text-grey mt-2'>{hint}</div>
            {valueInput.map((item, index) =>
                <div
                    key={index}
                    className='input-select__items bg-greyWeak mt-3 typo-small relative'
                >
                    {item.Name}
                    <Image
                        src="/assets/images/close-filled.svg"
                        alt="close-filled"
                        className='search-input__close absolute right-2 top-3 cursor-pointer'
                        width={15}
                        height={15}
                        onClick={() => onDeleteItem(index)}
                    />
                </div>
            )}
        </div>
    )
}

export default InputSelect