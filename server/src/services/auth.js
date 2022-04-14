import config from '../config/index.js'
import jwt from 'jsonwebtoken'
import { CustomError } from '../CustomError.js'

export class AuthService {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  // 로그인시 사용자 정보를 조회하고 Token 생성

  async SignIn(idToken) {
    try {
      //  idToken으로 토큰 찾기
      const user = await this.userModel.findByIdToken(idToken)
      if (!user) throw new CustomError('InvaildParameterError', 401, 'user not found')

      // Access Token, Refresh Token 발급
      const _id = user._id
      const nickName = user.nickName
      const accessToken = await user.generateAccessToken()
      const refreshToken = await user.generateAccessToken()
      return { _id, nickName, accessToken, refreshToken }
    } catch (error) {
      console.log(error)
    }
  }

  async reissueAccessToken(refreshToken) {
    let decodeSuccess = true
    let decodeRefreshToken = ''
    try {
      decodeRefreshToken = await jwt.verify(refreshToken, config.jwtSecretKey)
      const user = await this.userModel.findByNickName(decodeRefreshToken.nickName)
      if (!user) throw new CustomError('InvaildParameterError', 401, 'User not found')
      const { _id, nickName, email } = user
      const accessToken = await user.generateAccessToken()
      return { decodeSuccess, _id, nickName, email, accessToken }
    } catch (err) {
      decodeSuccess = false
      return { decodeSuccess }
    }
  }
}
