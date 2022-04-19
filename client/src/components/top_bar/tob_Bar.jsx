import React from 'react'
import styles from './tob_Bar.module.css'

const TopBar = ({ handleClick }) => {
  return <img className={styles.backButton} onClick={handleClick} src="/images/info/arrow-left.png" alt="back-button" />
}

export default TopBar
