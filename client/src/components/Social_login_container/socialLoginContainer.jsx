import React from 'react'
import { useDispatch } from 'react-redux'
import { nextStep, setSignUpUser } from 'store/loginStep'
import SocialLogin from 'components/Social_login/socialLogin'
import { fetchUserById } from 'store/user'

const SocialLoginContainer = ({ handleClose }) => {
  // 소셜 로그인 클라이언트 키

  const googleClientId = process.env.REACT_APP_GOOGLEKEY
  const kakaoClientId = process.env.REACT_APP_KAKAOKEY
  const dispatch = useDispatch()

  // 구글 로그인 성공
  const googleOnSuccess = async (response) => {
    // 토큰
    const { tokenId } = response
    // 유저데이터는 [ 토큰, 로그인타입] 설정
    const userData = { code: tokenId, social: 'google' }

    //유저데이터로 로그인 후 acecess token 설정
    dispatch(fetchUserById(userData)).then((response) => {
      const id = response.payload._id

      // 로그인이 되면? 소셜로그인 모달 닫기
      if (response.payload.loginSuccess === true) handleClose()
      else {
        // 로그인이 안되면? 회원가입으로 고
        dispatch(setSignUpUser({ key: 'id', value: id }))
        // 로그인스탭 다음단계로!
        dispatch(nextStep())
      }
    })
  }

  // 구글로그인 에러

  const googleOnFailure = (error) => {
    console.log(error)
  }

  // 카카오 로그인
  const kakaoOnSuccess = async (data) => {
    const accessToken = data.response.access_token
    const userData = { code: accessToken, social: 'kakao' }

    await dispatch(fetchUserById(userData)).then((response) => {
      //   console.log("fetchByuserID response :", response);
      const id = response.payload._id
      if (response.payload.loginSuccess === true) handleClose()
      else {
        dispatch(setSignUpUser({ key: 'id', value: id }))
        dispatch(nextStep())
      }
    })
  }

  const kakaoOnFailure = (error) => {
    console.log(error)
  }
  return (
    <SocialLogin
      googleOnSuccess={googleOnSuccess}
      googleOnFailure={googleOnFailure}
      googleClientId={googleClientId}
      kakaoOnSuccess={kakaoOnSuccess}
      kakaoOnFailure={kakaoOnFailure}
      kakaoClientId={kakaoClientId}
    ></SocialLogin>
  )
}

export default SocialLoginContainer
