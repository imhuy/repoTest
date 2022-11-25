import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { ROW_PER_PAGE } from '../../utils/contants'
import { IData } from '../../utils/types'
import Select from './select'

interface PaginationProps {
    total: number
    totalCurrentPage: number
    onCurrentPage(value: number): void
}

const Pagination = ({ total, totalCurrentPage, onCurrentPage }: PaginationProps) => {
    const router = useRouter()
    const { page } = router.query

    const onChangeParam = (key: string, value: string | number) => {
        router.push({ query: { ...router.query, [key]: value } })
    }

    const currentItem = ((page ? +page : 1) - 1) * ROW_PER_PAGE
    const totalCurrentPageItem = totalCurrentPage < ROW_PER_PAGE ? total : totalCurrentPage * (page ? +page : 1)

    const handlePageChange = (event: { selected: number }) => {
        onCurrentPage(event.selected + 1)
        onChangeParam('page', event.selected + 1)
    }

    return (
        <div className='pagination relative'>
            <div className='pagination__select absolute typo-pagination text-grey top-2'>
                Showing {currentItem + 1} {`${currentItem + 1 !== total ? `– ${totalCurrentPageItem}` : ''}`} out of {total} items
            </div>

            <ReactPaginate
                nextLabel=''
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                forcePage={page ? +page - 1 : 0}
                pageCount={Math.ceil(total / ROW_PER_PAGE)}
                previousLabel=''
                pageClassName="pagination__page--item mr-2"
                pageLinkClassName="pagination__page--item typo-normal"
                previousClassName="pagination__page--item"
                previousLinkClassName="pagination__page--item"
                nextClassName="pagination__page--item"
                nextLinkClassName="pagination__page--item"
                breakLabel="..."
                breakClassName="pagination__page--item"
                breakLinkClassName="pagination__page--item typo-normal"
                containerClassName="pagination__page flex justify-center"
                activeClassName="active bg-pinkRed text-white"
            />
        </div>
    )
}


export default Pagination