import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  display: flex;
  max-width: 1000px;
  margin-left: 6rem;
  margin-right: auto;
  margin-top: 3rem;
  padding: 2rem;

  .bannerContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 45%;
  }
  .title {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 126.5%;
    letter-spacing: -0.005em;
    margin: 0;
    margin-bottom: 0.5rem;
  }
  .titleContent {
    display: block;
    word-break: break-all;
  }
  @media screen and (max-width: 1100px) {
  }
`

const Banner = React.memo(() => {
  return (
    <Section>
      <div className="bannerContent">
        <h1 className="title">
          <span className="titleContent">Stack</span>
          <span className="titleContent">Shines Blog!!!</span>
        </h1>
      </div>
    </Section>
  )
})

export default Banner
