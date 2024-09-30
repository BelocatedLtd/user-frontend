import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { useEffect, useState } from 'react'

const PaginatedComponent = ({
	total,
	initialPage = 1,
	initialLimit = 10,
	fetch,
}: {
	total: number
	initialPage: number
	initialLimit: number
	fetch: (currentPage: number, limit: number) => void
}) => {
	const [currentPage, setCurrentPage] = useState(initialPage)
	const [limit, setLimit] = useState(initialLimit)
	const totalPages = Math.ceil(total / limit)

	// Fetch the data whenever currentPage or limit changes
	useEffect(() => {
		fetch(currentPage, limit)
	}, [currentPage, limit])

	// Handle next page
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	// Handle previous page
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	// Handle direct page click
	const handlePageClick = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<Pagination className='flex items-center'>
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<PaginationPrevious href='#' onClick={handlePreviousPage} />
				</PaginationItem>

				{/* Render Page Numbers */}
				{Array.from({ length: totalPages }, (_, index) => (
					<PaginationItem key={index + 1}>
						<PaginationLink
							href='#'
							onClick={() => handlePageClick(index + 1)}
							isActive={index + 1 === currentPage}>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Ellipsis and Next Button */}
				{totalPages > 5 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext href='#' onClick={handleNextPage} />
				</PaginationItem>
			</PaginationContent>

			{/* Optionally, show limit selector */}
			<div className='ml-2'>
				<label htmlFor='limit-select'>Tasks per page:</label>
				<select
					id='limit-select'
					value={limit}
					onChange={(e) => setLimit(Number(e.target.value))}>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={50}>50</option>
				</select>
			</div>
		</Pagination>
	)
}

export default PaginatedComponent
