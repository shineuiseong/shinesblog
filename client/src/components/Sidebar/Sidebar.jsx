import React, { useState, useEffect } from 'react'

//All the svg files
import logo from 'assets/Svgs/logo.svg'
import Home from 'assets/Svgs/home-solid.svg'
import Team from 'assets/Svgs/social.svg'
import Calender from 'assets/Svgs/sceduled.svg'
import Projects from 'assets/Svgs/starred.svg'
import Documents from 'assets/Svgs/draft.svg'
import PowerOff from 'assets/Svgs/power-off-solid.svg'
import PowerOn from 'assets/Svgs/power-on.solid.svg'
import WhiteStart from 'assets/Images/Sstar.jpeg'
import styled from 'styled-components'

import { NavLink, useHistory } from 'react-router-dom'

//controller
import ModalContainer from 'components/Modal/Modal_Container/ModalContainer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setModalVisible, clearStep } from 'store/loginStep'
import { clearUser, fetchUserByRefreshToken } from 'store/user'
import authService from 'service/auth_service'
import LoginModal from '../Modal/Login_modal/LoginModal'

const Container = styled.div`
  position: fixed;
  .active {
    border-right: 4px solid #fff;
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    }
  }
`

const Button = styled.button`
  background-color: #09090c;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: '';
    background-color: #fff;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? '1.5' : '1rem')};
    transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
  }
  &::after {
    top: ${(props) => (props.clicked ? '1.2' : '1.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
  }
`

const SidebarContainer = styled.div`
  background-color: #09090c;
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const Logo = styled.div`
  width: 2rem;
  img {
    width: 100%;
    height: auto;
  }
`

const SlickBar = styled.ul`
  color: #fff;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #09090c;
  padding: 2rem 0;
  position: absolute;
  top: 6rem;
  left: 0;
  width: ${(props) => (props.clicked ? '12rem' : '3.5rem')};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`

const Item = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-right: 4px solid #fff;
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
    }
  }
  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg) brightness(78%) contrast(85%);
  }
`

const Text = styled.span`
  width: ${(props) => (props.clicked ? '100%' : '0')};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? '1.5rem' : '0')};
  transition: all 0.3s ease;
`

const Profile = styled.div`
  width: ${(props) => (props.clicked ? '14rem' : '3rem')};
  height: 3rem;
  padding: 0.5rem 1rem;
  /* border: 2px solid #fff; */
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? '9rem' : '0')};
  background-color: #09090c;
  color: #fff;
  transition: all 0.3s ease;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid #a4b2bc;
      padding: 2px;
    }
  }
`

const Details = styled.div`
  display: ${(props) => (props.clicked ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
`

const Name = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    display: inline-block;
  }
  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: #a4b2bc;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg) brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`

const Sidebar = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const [profileClick, setprofileClick] = useState(false)
  const handleProfileClick = () => setprofileClick(!profileClick)

  const [imageUrl, setimageUrl] = useState('')

  // reducer
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const modalVisible = useSelector((state) => state.loginStep.modalVisible)

  const openModal = () => {
    document.body.style.overflow = 'hidden'
    dispatch(setModalVisible(true))
  }
  const closeModal = () => {
    document.body.style.overflow = 'auto'
    dispatch(setModalVisible(false))
  }
  const handleRegister = () => {
    if (user.id === undefined) {
      openModal()
      return
    }
    history.push('/register')
  }

  const LogoImage = (props) => {
    return <img onClick={() => handleProfileClick()} src={`${props.image}`} alt="Profile" />
  }
  const SetUserName = ({ h4, a, href }) => {
    return (
      <div>
        <h4>{h4}</h4>
        <a href={href}>{a}</a>
      </div>
    )
  }

  const SetMysetting = () => {
    return (
      <Item onClick={() => setClick(false)} activeclassname="active" to="/setting">
        <img src={Team} alt="setting" />
        <Text clicked={click}>마이페이지</Text>
      </Item>
    )
  }

  const handleLogout = async () => {
    // 로그아웃
    await authService.logout()
    //유저 초기화
    dispatch(clearUser())
    //로그인 스탭 초기화
    dispatch(clearStep())
    // 토큰 초기화
    authService.resetToken()
    //
  }

  useEffect(() => {
    if (user.nickName) {
      dispatch(fetchUserByRefreshToken()).then((res) => {
        if (res.meta.requestStatus !== 'fulfilled') {
          history.push('/')
          dispatch(clearUser())
          toast.error('로그인 만료!!', {
            position: 'top-right',
            autoClose: 3000,
          })
        }
      })
    }
  }, [dispatch, history, user.nickName])

  return (
    <Container>
      <Button clicked={click} onClick={() => handleClick()}>
        Click
      </Button>
      <SidebarContainer>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <SlickBar clicked={click}>
          <Item onClick={() => setClick(false)} activeclassname="active" to="/blog">
            <img src={Home} alt="Home" />
            <Text clicked={click}>홈</Text>
          </Item>
          <Item onClick={() => setClick(false)} activeclassname="active" to="/register">
            <img src={Documents} alt="Documents" />
            <Text clicked={click}>글쓰기</Text>
          </Item>
          {!user.nickName ? '' : <SetMysetting />}
        </SlickBar>

        <Profile clicked={profileClick}>
          {/* <img onClick={() => handleProfileClick()} src="https://picsum.photos/200" alt="Profile" /> */}
          {!user.nickName ? <LogoImage image={WhiteStart} /> : <LogoImage image="logo.png" />}
          <Details clicked={profileClick}>
            <Name>
              {/* <h4>StackShines</h4>
              <a href="/#">view profile</a> */}
              {!user.nickName ? <SetUserName h4="로그인" href="/blog/login" /> : <SetUserName h4={user.nickName} a="LogOut" />}
            </Name>
            <Logout>{!user.nickName ? <img src={PowerOn} alt="login" onClick={openModal} /> : <img src={PowerOff} alt="logout" onClick={handleLogout} />}</Logout>
          </Details>
        </Profile>
      </SidebarContainer>
      <ModalContainer visible={modalVisible} name="login" onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0} />
      </ModalContainer>
    </Container>
  )
}

export default Sidebar
