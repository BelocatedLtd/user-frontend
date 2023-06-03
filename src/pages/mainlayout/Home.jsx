import React from 'react'
import Jumbotron from '../../components/Jumbotron'
import About from '../../components/About'
import MembersTab from '../../components/MembersTab'
import HowItWorks from '../../components/HowItWorks'
import SubFooter from '../../components/SubFooter'

export const Home = () => {
  return (
    <div>
      <Jumbotron />
      <About />
      <MembersTab />
      {/* <HowItWorks /> */}
      <SubFooter />
    </div>
  )
}
