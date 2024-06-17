import React from 'react'
import close from '../../assets/close.svg'
import ReactDOM from 'react-dom'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CheckmarkIcon, toast } from 'react-hot-toast'
import Loader from '../loader/Loader'
import { selectUser } from '../../redux/slices/authSlice'
import { deleteAdvert } from '../../services/advertService'
import { deleteTask } from '../../services/taskServices'

const DeleteTaskModal = ({ handleDelete, task }) => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const adminUser = useSelector(selectUser)

	const { _id } = task

	const confirmDelete = async (e) => {
		e.preventDefault()

		setIsLoading(true)
		const response = await deleteTask(_id)

		if (!response) {
			toast.error('Failed to delete Task')
			setIsLoading(false)
		}

		if (response) {
			toast.error('Task deleted')
			setIsLoading(false)
			navigate(`/admin/dashboard/tasks/${adminUser.username}`)
		}
		setIsLoading(false)
	}

	return ReactDOM.createPortal(
		<div className='wrapper'>
			<Loader open={isLoading} />

			<div className='relative modal w-[350px] h-[300px] bg-primary md:w-[400px]'>
				<img
					src={close}
					alt='close'
					onClick={handleDelete}
					size={40}
					className='absolute top-[-1rem] right-[-1rem] text-tertiary'
				/>
				<div className='w-full h-full modal__header__text flex flex-col items-center justify-center'>
					<h3 className='text-2xl text-gray-800 font-bold px-6 mb-4 text-center'>
						Delete Task
					</h3>
					<div className='flex items-center gap-2'>
						<button
							onClick={confirmDelete}
							className='py-2 px-4 text-[15px] bg-tertiary text-primary rounded-full'>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('backdrop'),
	)
}

export default DeleteTaskModal
