'use client'
import React from 'react'
import Jumbotron from '../components/home/Jumbotron'
import MembersTab from '../components/home/MembersTab'
import Services from '../components/home/Services'
import About from '@/components/About'
import Footer from '@/components/home/Footer'
import SubFooter from '@/components/home/SubFooter'
import CallToAction from '@/components/home/CallToAction'

export default function Home() {
	return (
		<div>
			<Jumbotron
			// handleRegister={handleRegister}
			// handleLogin={handleLogin}
			// loginBtn={loginBtn}
			// regBtn={regBtn}
			/>
			<MembersTab
			// handleRegister={handleRegister} regBtn={regBtn}
			/>
			<Services />
			{/* <About /> */}
		</div>
	)
}
