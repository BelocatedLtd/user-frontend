'use client'

import logo from '@/assets/belocated-logo.png'
import React from 'react'

import AddBank from '@/components/kyc/AddBank'
import CompleteProfile from '@/components/kyc/completeProfile'
import Completed from '@/components/kyc/completed'
import Whatsapp from '@/components/kyc/whatsapp'
import CheckIcon from '@mui/icons-material/Check'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Stepper from '@mui/material/Stepper'
import Image from 'next/image'
import Link from 'next/link'

const steps = ['Community', 'Complete profile', 'Add Bank']
//import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const Kyc = () => {
	//useRedirectLoggedOutUser('/')

	const [activeStep, setActiveStep] = React.useState(0)
	const [completed, setCompleted] = React.useState<{ [key: number]: boolean }>(
		{},
	)

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
		const newCompleted: { [key: number]: boolean } = { ...completed }
		newCompleted[activeStep] = true
		setCompleted(newCompleted)

		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? steps.findIndex((step, i) => !(i in newCompleted))
				: activeStep + 1
		setActiveStep(newActiveStep)
	}

	const handleStep = (step: number) => () => {
		if (completed[step] || step === activeStep - 1) {
			setActiveStep(step)
		}
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
				<strong>Welcome to Belocated!</strong>
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
