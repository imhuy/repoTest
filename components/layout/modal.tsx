import React from 'react'

interface ModalProps {
    show: boolean
    children: React.ReactNode
    title?: string
    className?: string
}

const Modal = ({ show = true, children, title, className }: ModalProps) => {
    const modalStyles = 'block fixed z-50 w-full h-full top-0 right-0 flex items-center justify-center'

    return <div className={`modal ${className} ${show ? modalStyles : 'hidden'}`}>
        <div className='modal__content bg-white'>
            {title && <div className='modal__content--title text-4xl font-bold mb-10'>{title}</div>}
            {children}
        </div>
    </div>
}

export default Modal