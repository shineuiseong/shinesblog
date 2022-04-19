import React from 'react'
import styles from './signupEnd.module.css'

const SignupEnd = ({ handleClose }) => {
  return (
    <>
      <h1 className={styles.title}>
        축하드려요!
        <br />
        보일러 플레이트에 가입되었습니다.
      </h1>
      <img className={styles.logo} src="/images/logo/logo.png" alt="logo" />
      <button onClick={handleClose} className={styles.buttonClose} name="complete">
        시작하기
      </button>
    </>
  )
}

export default SignupEnd
