'use client'

import React from 'react'
import logo from '@/assets/belocated-logo.png'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Link from 'next/link'
import Image from 'next/image'
import Whatsapp from '@/components/kyc/whatsapp'
import CheckIcon from '@mui/icons-material/Check'
import CompleteProfile from '@/components/kyc/completeProfile'
import AddBank from '@/components/kyc/AddBank'
import Completed from '@/components/kyc/completed'

const steps = ['Community', 'Complete profile', 'Add Bank']
//import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const Kyc = () => {
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
		const newCompleted = { ...completed }
		newCompleted[activeStep] = true
		setCompleted(newCompleted)

		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in newCompleted))
				: activeStep + 1
		setActiveStep(newActiveStep)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleStep = (step) => () => {
		setActiveStep(step)
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
					href='/'
					className='logo cursor-pointer mx-auto text-4xl font-extrabold  w-[150px] md:w-[170px]'>
					<Image
						src={logo}
						alt='logo'
						className='w-36 h-10 mx-auto object-contain'
					/>
				</Link>
				<strong>Walcom Dayo,</strong>
				<p>Just a few quick steps to get started with our platform!</p>
				<div
					// style={{ minHeight: '80vh' }}
					className='flex p-1 md:p-6 w-full'>
					<Stepper nonLinear className='' activeStep={activeStep}>
						{steps.map((label, index) => (
							<Step key={label} completed={completed[index]}>
								<StepButton
									color='inherit'
									onClick={handleStep(index)}
									icon={completed[index] ? <CheckIcon /> : null}>
									{label}
								</StepButton>
							</Step>
						))}
					</Stepper>
					{/* {children} */}
				</div>
				<div className='pt-4 p-3'>
					{activeStep === 0 ? (
						<Whatsapp next={handleNext} />
					) : activeStep === 1 ? (
						<CompleteProfile next={handleNext} />
					) : activeStep === 2 ? (
						<AddBank next={handleNext} />
					) : (
						completed && <Completed />
					)}
				</div>
			</div>

			{/* <Footer /> */}
		</div>
	)
}

export default Kyc
