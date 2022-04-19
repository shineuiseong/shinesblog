import React from 'react'
import styles from './nickNameconfig.module.css'
import TopBarContainer from 'components/top_bar_container/top_bar_container'

const NickNameConfig = ({ nickname, setNickname, handleLoginStep }) => {
  return (
    <>
      <TopBarContainer></TopBarContainer>
      <h1 className={styles.title}>
        환영합니다!!
        <br />
        사용하실 닉네임을 입력해주세요!..
      </h1>
      <div className={styles.inputWrapper}>
        <h3 className={styles.nicknameText}>닉네임</h3>
        <input
          className={styles.nicknameInput}
          type="text"
          name="nickNameInput"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value)
          }}
        />
      </div>
      <button onClick={handleLoginStep} className={styles.buttonNext} name="complete">
        다음
      </button>
    </>
  )
}

export default NickNameConfig
