import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './SettingContainer.module.css'

//알림창
import { toast } from 'react-toastify'

//사용자 정보 및 제어
import userService from 'service/user_service'
import { clearUser, modifyUserInfo } from 'store/user'
import { clearStep } from 'store/loginStep'

// 셋팅 페이지
import Setting from 'page/Setting/Setting'

const SettingContainer = (props) => {
  //사용자
  const user = useSelector((state) => state.user)
  //사용자 닉네임 (기존닉네임)
  const [nickName, setNickName] = useState(user.nickName)
  const prenickName = user.nickName
  const history = useHistory()
  const dispatch = useDispatch()
  const [showPopup, setShoPopup] = useState(false)

  // 렌더링시
  useEffect(() => {
    if (user.id === undefined) {
      toast.error('로그인이 필요한 페이지입니다.', {
        position: 'top-right',
        autoClose: 3000,
      })
      //메인페이지로
      history.push('/')
    }
  }, [history, user.id, user.nickName])

  const openModal = () => {
    document.body.style.overflow = 'hidden'
    setShoPopup((state) => !state)
  }
  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setShoPopup((state) => !state)
  }

  // 변경완료 버튼
  const onCompleteClick = async () => {
    if (!nickName) {
      toast.error('닉네임을 입력해주세요.', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
    // 일단 12자이상 이후 정규식으로 수정  03.16
    else if (nickName.length > 12) {
      toast.error('닉네임은 12자이상으로 입력해주세요.', {
        position: 'top-right',
        autoClose: 3000,
      })
    } else {
      let payload = {
        id: user.id,
      }

      //닉네임 변경
      if (nickName != prenickName) {
        const response = await userService.checkNickname(user.id, nickName)
        if (response.isExists) {
          toast.error('닉네임이 중복되었어요.', {
            position: 'top-right',
            autoClose: 3000,
          })
          return
        }
        payload.nickName = nickName
      }

      // 서버로 변경 요청
      dispatch(modifyUserInfo(payload)).then((response) => {
        toast.success('변경이 완료되었어요', {
          position: 'top-right',
          autoClose: 3000,
        })
        history.push('/')
      })
    }
  }

  //회원탈퇴
  const onSignOutClick = async (e) => {
    const deleteUser = userService.deleteUser(user.id)
    if (deleteUser) {
      toast.success('회원 탈퇴가 완료되었어요.', {
        position: 'top-right',
        autoClose: 3000,
      })
      // 로컬스토리지 제거
      localStorage.removeItem('userName')
      // 유저정보 초기화
      dispatch(clearUser())
      // 로그인정보 초기화
      dispatch(clearStep())
      // 모달창 닫기
      document.body.style.overflow = 'auto'
      // 메인화면으로 이동
      history.push('/')
    } else {
      toast.success('회원 탈퇴가 실패했어요 문의부탁드려요!', {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }

  return (
    <Setting
      nickName={nickName}
      setNickName={setNickName}
      showPopup={showPopup}
      setShoPopup={setShoPopup}
      openModal={openModal}
      closeModal={closeModal}
      onCompleteClick={onCompleteClick}
      onSignOutClick={onSignOutClick}
    ></Setting>
  )
}

export default SettingContainer
