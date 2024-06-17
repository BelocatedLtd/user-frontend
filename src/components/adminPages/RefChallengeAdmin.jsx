import { useEffect, useState } from 'react'
import { MdArrowDownward, MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { getAllChallenges } from '../../services/refService'

const RefChallengeAdmin = () => {
	const navigate = useNavigate()
	const sortIcon = <MdArrowDownward />
	const [challenge, setChallenge] = useState()

	async function getChallenges() {
		const challenges = await getAllChallenges()
		setChallenge(challenges)
	}

	useEffect(() => {
		getChallenges()
	}, [])

	// const columns = [
	//   {
	//     name: 'ID',
	//     selector: row => row._id,
	//     sortable: true
	//   },
	//   {
	//     name: 'Start Date',
	//     selector: row => row.createdAt,
	//     sortable: true
	//   },
	//   // {
	//   //     name: 'No. of Contestants',
	//   //     selector: row => row.referralChallengeContestants.length,
	//   //     sortable: true
	//   //   },
	//     {
	//       name: 'No. of Ref Users',
	//       selector: row => row.totalRefUsers,
	//       sortable: true
	//     },
	//   {
	//     name: 'Status',
	//     sortable: true,
	//     cell: (row) => (
	//       <p className={`px-6 py-1 rounded-[5px]
	//           ${row.status === "Ongoing" && 'pending'}
	//           ${row.status === "Completed" && 'completed'}
	//           `}
	//        >
	//           {row.status}
	//       </p>
	//     )
	//   },
	//   {
	//     name: 'Actions',
	//     button: true,
	//     cell: (row) => (
	//       <button className={'px-6 py-2 bg-gray-800 text-primary rounded-[5px]'}
	//         onClick={(e) => handleButtonClick(e, row._id)}>
	//           View
	//       </button>
	//     )
	//   },
	// ];

	// const customStyles = {
	//   headCells: {
	//     style: {
	//       backgroundColor: '#18141E',
	//       color: '#f4f4f4',
	//       fontSize: '15px'
	//     }
	//   },
	// }

	// const handleButtonClick = (e, refChallId) => {
	//   e.preventDefault();
	//   console.log(refChallId)
	//   // navigate(`/admin/dashboard/task/${taskId}`)
	// }

	return (
		<div className='w-full mx-auto mt-[2rem]'>
			<div className='flex items-center justify-between mb-[2rem] py-5'>
				<div className='flex items-center'>
					<MdOutlineKeyboardArrowLeft
						size={30}
						onClick={() => navigate(-1)}
						className='mr-1'
					/>
					<p className='font-semibold text-xl text-gray-700'>
						Referral Challenges
					</p>
				</div>
			</div>

			<h3 className='text-center text-3xl font-extrabold'>Coming Soon</h3>
			{/* <DataTable 
      columns={columns} 
      data={challenge}
      progressPending="Loading..."
      pagination
      selectableRows
      fixedHeader
      //customStyles={customStyles}
      sortIcon={sortIcon}
      //handleButtonClick={handleButtonClick}
      /> */}
		</div>
	)
}

export default RefChallengeAdmin
