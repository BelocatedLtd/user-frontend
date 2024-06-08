import React from 'react'
import Footer from '../../components/home/Footer'
import { Link, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { getUser } from '../../services/authServices'
import { useDispatch } from 'react-redux'
import { SET_LOGOUT, SET_USER } from '../../redux/slices/authSlice'
import { getUserWallet } from '../../services/walletServices'
import { Header } from '../../components/Header'
import logo from '../../assets/belocated-logo.png'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const steps = ['Whatsapp', 'Complete profile', 'Add Bank', '']
//import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const KycLayout = ({ children }) => {
	//useRedirectLoggedOutUser('/')

	const [activeStep, setActiveStep] = React.useState(0)
	const [completed, setCompleted] = React.useState({})

	const totalSteps = () => {
		return steps.length
	}

	const completedSteps = () => {
		return Object.keys(completed).length
	}

	const isLastStep = () => {
		return activeStep === totalSteps() - 1
	}

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps()
	}

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1
		setActiveStep(newActiveStep)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleStep = (step) => () => {
		setActiveStep(step)
	}

	const handleComplete = () => {
		const newCompleted = completed
		newCompleted[activeStep] = true
		setCompleted(newCompleted)
		handleNext()
	}

	const handleReset = () => {
		setActiveStep(0)
		setCompleted({})
	}

	return (
		<div className='w-full bg-blue- items-center flex justify-center'>
			{/* <Header /> */}
			<div className=' text-center mt-40'>
				<Link
					to='/'
					className='logo cursor-pointer mx-auto text-4xl font-extrabold  w-[150px] md:w-[170px]'>
					<img src={logo} alt='logo' className='w-30 h-10 mx-auto' />
				</Link>
				<strong>Walcom Dayo,</strong>
				<p>Just a few quick steps to get started with our platform!</p>
				<div
					// style={{ minHeight: '80vh' }}
					className='flex p-1 md:p-6 w-full'>
					<Stepper nonLinear className='' activeStep={activeStep}>
						{steps.map((label, index) => (
							<Step key={label} completed={completed[index]}>
								<StepButton color='inherit' onClick={handleStep(index)}>
									{label}
								</StepButton>
							</Step>
						))}
					</Stepper>
					{children}
				</div>
			</div>

			{/* <Footer /> */}
		</div>
	)
}

export default KycLayout
