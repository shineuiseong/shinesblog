import httpClient from './http_client'
/* 
user 관련 API를 정의한 class입니다.
*/

class User {
  constructor(httpClient) {
    this.user = httpClient
  }

  //id를 이용하여 사용자 정보 조회
  getUserInfo = async (id) => {
    try {
      const user = await this.user.get(`users/${id}`)
      return user
    } catch (error) {
      console.error(error)
    }
  }

  //user nickname 중복 검사
  checkNickname = async (id, nickName) => {
    try {
      const response = await this.user.get(`users/${id}/exists?nickName=${nickName}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  //닉네임을 이용하여 사용자 정보 조회
  getUserInfoByNickName = async (nickName) => {
    try {
      const params = {
        nickName: nickName,
      }

      const user = await this.user.get(`users`, {
        params,
      })
      return user
    } catch (error) {
      console.error(error)
    }
  }

  //사용자 정보 수정
  //닉네임이 변경될 경우 accessToken을 다시 설정해야함
  modifyUserInfo = async (id, userData) => {
    try {
      const user = await this.user.patch(`users/${id}`, userData)
      return {
        user,
        modifySuccess: true,
      }
    } catch (error) {
      return {
        user: null,
        modifySuccess: false,
      }
    }
  }

  //회원탈퇴
  deleteUser = async (id) => {
    try {
      await this.user.delete(`users/${id}`)
      return true
    } catch (error) {
      console.error(error)
    }
  }
}
const userService = new User(httpClient)
export default userService
