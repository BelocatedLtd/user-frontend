import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-hot-toast'
import { MdArrowDownward } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
	handleGetUserTransactions,
	selectIsError,
	selectIsLoading,
} from '../../redux/slices/transactionSlice'

const sortIcon = <MdArrowDownward />

const TransactionList = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading)
	const isError = useSelector(selectIsError)

	const router = useRouter()

	const [currentPage, setCurrentPage] = useState(1)
	const [totalRows, setTotalRows] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const [transactions, setTransactions] = useState([])

	const columns = [
		{
			name: 'S/N',
			selector: (row: { trxId: any }) => row.trxId,
		},
		{
			name: 'Transaction Type',
			selector: (row: { trxType: any }) => row.trxType,
		},
		{
			name: 'Amount',
			selector: (row: { chargedAmount: any }) => row.chargedAmount,
			sortable: true,
		},
		{
			name: 'Date',
			selector: (row: { date: any }) => row.date,
		},
		{
			name: 'Status',
			selector: (row: { status: any }) => row.status,
			sortable: true,
		},
	]

	const customStyles = {
		headCells: {
			style: {
				backgroundColor: '#18141E',
				color: '#f4f4f4',
				fontSize: '15px',
			},
		},
	}

	//   const handleButtonClick = (e, artisanId) => {
	//     e.preventDefault();
	//     router.push(`/dashboard/artisan/${artisanId}`)
	//   }

	const fetchTransactions = async (page: number, rows: number) => {
		const response = await dispatch(
			handleGetUserTransactions({ page, limit: rows }) as any,
		)
		if (response.payload) {
			setTotalRows(response.payload.totalTransactions)
			setTransactions(response.payload.transactions)
		}
	}

	useEffect(() => {
		fetchTransactions(currentPage, rowsPerPage)

		if (isError) {
			toast.error('failed to fetch transactions')
		}
	}, [isError, dispatch])

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		fetchTransactions(page, rowsPerPage)
	}

	const handleChangeRowsPerPage = (rowsPerPage: number) => {
		setRowsPerPage(rowsPerPage)
		fetchTransactions(currentPage, rowsPerPage)
	}

	return (
		// <DataTable
		// columns={columns}
		// data={transactions}
		// progressPending={isLoading}
		// pagination
		// selectableRows
		// fixedHeader
		// customStyles={customStyles}
		// //handleButtonClick={handleButtonClick}
		// />
		<DataTable
			columns={columns as any}
			data={transactions}
			progressPending={isLoading}
			pagination
			paginationServer
			paginationTotalRows={totalRows}
			onChangePage={handlePageChange}
			onChangeRowsPerPage={handleChangeRowsPerPage}
			selectableRows
			fixedHeader
			customStyles={customStyles}
			sortIcon={sortIcon}
		/>
	)
}

export default TransactionList
