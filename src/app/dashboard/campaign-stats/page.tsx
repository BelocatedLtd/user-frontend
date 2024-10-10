
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
		<div className='w-full p-5 md:p-10'>
			<Loader open={isLoading} />

			{/* Header Section */}
			<div className='flex items-center justify-between gap-3 border-b border-gray-200 py-5'>
 				<div className='flex items-center'>
 					<div className='flex flex-col'>
 						<p className='font-semibold text-xl text-gray-700'>
						My Ad Campaigns
						
 			<Loader open={isLoading} />
					
						</p>
					
					 <small className='font-medium text-gray-500'>
                        Click <span className='text-secondary'>here</span> to see and
                        monitor your adverts
                    </small>
                </div>
            </div>
            <small className='hidden md:flex h-6 w-10 items-center justify-center bg-secondary rounded-full text-primary'>
                {adverts?.length}
            </small>
            <Button
                variant='solid'
                color='danger'
                onClick={() => router.push('/dashboard/advertise')}
                className='flex items-center gap-1 bg-secondary text-primary rounded-full px-5 py-2 mr-5 text-[12px] md:text-[15px] hover:bg-tertiary'
            >
                <BsFillPlusCircleFill />
                Campaign
            </Button>
        </div>

        <div className='w-full grid mt-4 gap-6 grid-cols-1 md:grid-cols-3'>
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





