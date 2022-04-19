import React from 'react'
import GoogleLogin from 'react-google-login'
import KakaoLogin from 'react-kakao-login'
import GoogleButton from 'components/Login_Button/Google_Button/google_Button'
import KakaoButton from 'components/Login_Button/Kakao_Button/kakao_Button'
import styles from './socialLogin.module.css'

const SocialLogin = ({ googleOnSuccess, googleOnFailure, googleClientId, kakaoOnSuccess, kakaoOnFailure, kakaoClientId }) => {
  return (
    <>
      <h1 className={styles.loginTitle}> 소셜 로그인 </h1>
      <div className={styles.descriptionMobile}>소셜 계정으로 로그인</div>
      <section className={styles.loginWrapper}>
        <GoogleLogin
          clientId={googleClientId}
          responseType={'id_token'}
          onSuccess={googleOnSuccess}
          onFailure={googleOnFailure}
          render={(renderProps) => <GoogleButton onClick={renderProps.onClick}></GoogleButton>}
        />
        <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFailure={kakaoOnFailure} render={({ onClick }) => <KakaoButton onClick={onClick}></KakaoButton>} />
      </section>
    </>
  )
}

export default SocialLogin
