import React from 'react'
import Jumbotron from '../../components/Jumbotron'
import About from '../../components/About'
import MembersTab from '../../components/MembersTab'
import HowItWorks from '../../components/HowItWorks'
import SubFooter from '../../components/SubFooter'
import Services from './Services'
import CallToAction from '../../components/CallToAction'
import Marquee from './Marquee'
import Marqueez from './Marquee'

export const Home = ({
	handleRegister,
	handleLogin,
	handleCloseMenu,
	loginBtn,
	regBtn,
}) => {
	return (
		<div>
			<Jumbotron
				handleRegister={handleRegister}
				handleLogin={handleLogin}
				loginBtn={loginBtn}
				regBtn={regBtn}
			/>
			<Marqueez />
			<MembersTab handleRegister={handleRegister} regBtn={regBtn} />
			<Services />
			{/* <About /> */}
		</div>
	)
}
