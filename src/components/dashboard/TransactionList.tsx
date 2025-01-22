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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')

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
      selector: (row: { date: any }) => row.date ? new Date(parseInt(row.date)).toLocaleString() : 'N/A',
    },
    {
      name: 'Status',
      selector: (row: { status: any }) => row.status,
      sortable: true,
    },
    {
      name: 'View Proof',
      cell: (row: { trxType: string; proofOfWorkMediaURL?: { secure_url: string }[] }) =>
        row.trxType === 'bank transfer' ? (
          <div className="mt-2">
            <label>Proof:</label>{' '}
            {Array.isArray(row.proofOfWorkMediaURL) && row.proofOfWorkMediaURL.length > 0 && row.proofOfWorkMediaURL[0]?.secure_url ? (
              <span
                onClick={() => handleProofClick(row.proofOfWorkMediaURL[0].secure_url)}
                className="text-blue-500 hover:text-red-500 cursor-pointer"
              >
                View Proof
              </span>
            ) : (
              'N/A'
            )}
          </div>
        ) : (
          'N/A'
        ),
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
      toast.error('Failed to fetch transactions')
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

  const handleProofClick = (url: string | undefined) => {
    if (url) {
      setModalContent(url)
      setIsModalOpen(true)
    } else {
      toast.error('Proof of work URL is not available.')
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalContent('')
  }

  return (
    <>
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
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-5 rounded-md shadow-lg relative"
            style={{ width: '80%', height: '80%', maxWidth: '800px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 p-3"
              onClick={closeModal}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Close
            </button>
            <img
              src={modalContent}
              alt="Proof of Work"
              className="w-full h-full object-contain rounded-md"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default TransactionList
