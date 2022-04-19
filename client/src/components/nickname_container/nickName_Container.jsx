import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { nextStep, setSignUpUser } from 'store/loginStep'
import NickNameConfig from 'components/nickname_config/nickNameconfig'
import userService from 'service/user_service'
import { addUserNickName } from 'store/user'

const SetNicknameContainer = (props) => {
  const dispatch = useDispatch()
  const [nickname, setNickname] = React.useState('')

  const userId = useSelector((state) => state.loginStep.id)

  const handleLoginStep = async () => {
    if (nickname.length > 15) {
      toast.info('닉네임은 최대 15글자 입니다.', {
        position: 'top-right',
        autoClose: 3000,
      })

      return
    }

    if (nickname.length === 0) {
      toast.info('닉네임을 입력해 주세요!', {
        position: 'top-right',
        autoClose: 3000,
      })
      return
    }

    const response = await userService.checkNickname(userId, nickname)
    if (response.isExists) {
      toast.info('닉네임이 중복 되었어요!', {
        position: 'top-right',
        autoClose: 3000,
      })
      return
    }

    dispatch(setSignUpUser({ key: 'nickName', value: nickname }))
    dispatch(
      addUserNickName({
        id: userId,
        nickName: nickname,
      })
    )
    dispatch(nextStep())
  }

  return <NickNameConfig setNickname={setNickname} handleLoginStep={handleLoginStep} nickname={nickname}></NickNameConfig>
}

export default SetNicknameContainer
