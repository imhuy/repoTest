import React, { FC } from 'react'
import { ButtonVariants } from '../../utils/types'

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    submit?: boolean
    label: string
    variant?: ButtonVariants
    disabled?: boolean
    className?: string
}

const Button: FC<ButtonProps> = ({
    variant = ButtonVariants.OUTLINE,
    label,
    submit = false,
    onClick,
    disabled,
    className,
}) => {
    const onClickButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick(e)
    }

    return (
        <button
            className={`button ${variant} ${className}`}
            type={submit ? 'submit' : 'button'}
            onClick={onClickButton}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button