import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface SearchInputProps {
    defaultValue?: string | string[]
    placeholder?: string
    onChangeValue(value: string): void
}

const SearchInput = ({ defaultValue, onChangeValue, placeholder }: SearchInputProps) => {
    const [value, setValue] = useState(defaultValue)
    const router = useRouter()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const textInput = e.target.value
        setValue(textInput)
    }

    const onSearch = () => {
        !(value === router.query.search) && onChangeValue(value as string)
    }

    const onClearText = () => {
        setValue('')
        onChangeValue('')
    }

    return (
        <>
            <div className='search-input flex bg-greyWeak relative'>
                <Image
                    src="/assets/images/search.svg"
                    alt="search"
                    className='search-input__icon absolute'
                    width={24}
                    height={24}
                />
                <input
                    type="text"
                    className="w-full outline-none bg-greyWeak typo-small"
                    value={value}
                    onChange={onChange}
                    onKeyUp={e => e.key === 'Enter' && onSearch()}
                    placeholder={placeholder}
                />
                {value && <div onClick={onClearText} aria-hidden>
                    <Image
                        src="/assets/images/close-filled.svg"
                        alt="close-filled"
                        className='search-input__close absolute cursor-pointer'
                        width={18}
                        height={18}
                    />
                </div>}
            </div>
            <div onClick={onSearch} className="search-button bg-pinkRed typo-small">
                Search
            </div>
        </>
    )
}

export default SearchInput