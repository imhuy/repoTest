import React, { FC } from 'react'

interface TableProps {
    children: React.ReactNode
    className?: string
}

const Table: FC<TableProps> = ({ children, className }: TableProps) => (
    <table className={`table w-full ${className}`}>
        {children}
    </table>
)


export default Table