import React from 'react'
import Jumbotron from '../../components/Jumbotron'
import About from '../../components/About'
import MembersTab from '../../components/MembersTab'
import HowItWorks from '../../components/HowItWorks'
import SubFooter from '../../components/SubFooter'
import Services from './Services'
import CallToAction from '../../components/CallToAction'

export const Home = () => {
  return (
    <div>
      <Jumbotron />
      <Services />
      <About />
      <MembersTab />
      <CallToAction />
      <SubFooter />
    </div>
  )
}
