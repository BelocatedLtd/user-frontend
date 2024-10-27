
'use client'
import Button from '@/components/Button'
import PaginatedComponent from '@/components/Pagination'
import { getUserAdverts } from '@/services/advertService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import AdItem from '../../../components/dashboard/AdItem'
import Loader from '../../../components/loader/Loader'
import { selectIsLoading } from '../../../redux/slices/advertSlice'
import { selectUser } from '../../../redux/slices/authSlice'

const CampaignStats = () => {
	const user = useSelector(selectUser)
	const isLoading = useSelector(selectIsLoading)
	const router = useRouter()

	const [totalAdverts, setTotalAdverts] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [adverts, setAdverts] = useState([])

	const getAdverts = async (page: number, limit: number) => {
		try {
			const response = await getUserAdverts({ page, limit })
			setAdverts(response?.adverts)
			setTotalAdverts(response.totalAdverts)
		} catch (error) {
			toast.error('Failed to retrieve tasks, please reload page')
		}
	}

	useEffect(() => {
		getAdverts(currentPage, limit)
	}, [currentPage, limit])

	return (
		<div className='w-full p-5 md:p-10 min-h-screen pb-20'>
			<Loader open={isLoading} />

			{/* Header Section */}
		<div className='flex items-center justify-between gap-4 border-b border-gray-300 py-5 px-6 bg-white shadow-sm'>
  <div className='flex items-center'>
    <div className='flex flex-col'>
      <p className='font-semibold text-2xl text-gray-800 flex items-center'>
        My Ad Campaigns
        <Loader open={isLoading} />
      </p>
      <small className='font-medium text-gray-500 mt-1'>
        Click <span className='text-blue-500 cursor-pointer'>here</span> to see and monitor your adverts
      </small>
    </div>
  </div>

  <div className='flex items-center gap-3'>
    {/* Adverts Count */}
    <small className='hidden md:flex h-8 w-8 items-center justify-center bg-blue-500 text-white rounded-full text-sm'>
      {adverts?.length}
    </small>

    {/* Campaign Button */}
    <Button
      variant='solid'
      color='primary'
      onClick={() => router.push('/dashboard/advertise')}
      className='flex items-center gap-2 bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600'>
      <BsFillPlusCircleFill className='text-lg' />
      Create Campaign
    </Button>
  </div>
</div>


        <div className='w-full grid mt-4 gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
            {adverts?.map((item: any) => (
                <AdItem
                    key={item._id}
                    id={item._id}
                    date={item.createdAt}
                    title={`${item.service} on ${item?.platform?.toUpperCase()}`}
                    adperPostAmt={`${item.costPerTask} Per Ad`}
                    roi={item.desiredROI}
                    adBudget={item.adAmount}
                    adService={item.service}
                    status={item.status}
                    item={item}
                    url={item.socialPageLink}
                    user={user}
                    taskSubmitters={item.taskSubmitters}
                    completedTasksCount={item.completedTasksCount}
                    callback={() => getAdverts(currentPage, limit)}
                />
            ))}
        </div>

        <div className='my-10'>
            <PaginatedComponent
                total={totalAdverts}
                initialPage={currentPage}
                initialLimit={limit}
                fetch={getAdverts}
            />
        </div>
    </div >

	)
}

export default CampaignStats
