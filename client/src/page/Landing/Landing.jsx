import React from 'react'
import styled from 'styled-components'
import CoverVideo from 'components/CoverVideo/CoverVideo'
import Logo from 'components/Logo/Logo'
import NavBar from 'components/NavBar/NavBar'
const Section = styled.section`
  position: relative;
  min-height: 200vh;
  overflow: hidden;
`

const Landing = () => {
  return (
    <Section>
      <CoverVideo />
      <Logo />
      <NavBar />
    </Section>
  )
}

export default Landing
