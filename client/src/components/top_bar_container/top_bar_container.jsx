import React from 'react'
import { useDispatch } from 'react-redux'
import { previousStep } from 'store/loginStep'
import TopBar from 'components/top_bar/tob_Bar'

const TopBarContainer = (props) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(previousStep())
  }

  return <TopBar handleClick={handleClick}></TopBar>
}

export default TopBarContainer
