import config from '../config/index.js'

export class UserService {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  // 닉네임을 사용하여 사용자 정보 조회
  async findByNickName(nickName) {
    const users = await this.userModel.findByNickName(nickName)
    return users
  }

  // id를 사용하여 사용자 정보 조회
  async findById(id) {
    const users = await this.userModel.findById(id)
    return users
  }

  // 사용자 정보 수정
  async modifyUser(id, tokenUser, user) {
    if (id != tokenUser) throw new CustomError('NotAuthenticatedError', 401, 'User does not match')

    console.log(id, tokenUser, user)
    console.log('111')
    const userRecord = await this.userModel.modifyUser(id, user)
    console.log('11')
    const accessToken = await userRecord.generateAccessToken()
    console.log('22')
    const refreshToken = await userRecord.generateRefreshToken()
    console.log('33')
    console.log(userRecord, accessToken, refreshToken)
    return { userRecord, accessToken, refreshToken }
  }

  //사용자 삭제
  async deleteUser(id, tokenUser) {
    if (id != tokenUserId) throw new CustomError('NotAuthenticatedError', 401, 'User does not match')
  }
}
