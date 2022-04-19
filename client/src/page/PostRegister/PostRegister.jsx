import React from 'react'
import Sidebar from 'components/Sidebar/Sidebar'
import Banner from 'components/Banner/Banner'
import styled from 'styled-components'
import EditorContainer from 'components/Editor/EditorContainer'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5rem 1rem;
  width: 1024px;
  margin: 0 auto; /* 중앙 정렬 */
  background-color: #ffffff;
`

const Post = () => {
  return (
    <>
      <Sidebar />
      <Banner />
    </>
  )
}

export default Post
