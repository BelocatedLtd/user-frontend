import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import Footer from '../components/home/Footer'
import CallToAction from '../components/home/CallToAction'
import SubFooter from '../components/home/SubFooter'

const MainLayout = ({ handleRegister, regBtn }) => {
	return (
		<div className='w-full h-full '>
			<Header />
			<Outlet />
			<CallToAction handleRegister={handleRegister} regBtn={regBtn} />
			<SubFooter />
			<Footer />
		</div>
	)
}

export default MainLayout
